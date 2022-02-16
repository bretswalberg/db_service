var express = require('express');
var app = express();
var db = require('./dbcon.js');
var portnum = 8123		
app.set('port', portnum);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*-------------------------
  API ENDPOINTS
-------------------------*/
app.get('/test', function(req, res, next) {
    console.log('/test request received');
    res.send('API test call successful');
});


app.get('/', function(req, res, next) {
    console.log('GET request received');
    var sql = "SELECT id, subject, saved_date, history " +
            "  FROM chats " + 
            "  ORDER BY saved_date DESC ";
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        res.json(rows)
    });
});


app.post('/', function(req, res) {
    console.log('POST request received');
    var jsondata = req.body
    var sql = "INSERT INTO chats (subject, saved_date, history) " + 
            " VALUES(?, ?, ?) ";
    var params = [
        jsondata['subject'],
        jsondata['saved_date'],
        jsondata['history']
    ];

    if (!jsondata['subject'] | !jsondata['saved_date'] | !jsondata['history']) {
        res.status(400)
        res.send('Invalid API request, missing required field value');
        return;
    }

    db.run(sql, params, function(err, result) {
        if (err) {
            console.error(err.stack);
            return;
        }
        res.status(200);
        res.send('Chat record inserted');
    });
});


app.delete('/', function(req, res) {
    console.log('DELETE request received');
    var id = req.query.id
    if (!id) {
        res.status(400);
        res.send('Delete request did not specify id');
        return;
    }
    
    var sql = "DELETE FROM chats WHERE id = ?"
    db.run(sql, id, function(err, result) {
        if(err) {
            console.error(err.stack);
            return;
        }
        res.status(200);
        res.send('Record ' + id + ' deleted');
    });
});


app.use(function(req,res){
  res.status(404);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
});

app.listen(app.get('port'), function(){
  console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
