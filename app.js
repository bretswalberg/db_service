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
    res.send('API call successful');

    /*
	var sql = "SELECT * " + 
			" FROM someTable " + 
			" WHERE ID = ? "
    params = [req.query.id]

	db.run(sql, params, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        res.send(rows)
    });
    */
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
