Instructions to run:
- Install node.js locally
- Install sqlite3 locally
  - This comes standard on Macs
  - Test by running 'sqlite3 --version' in terminal
- Clone this repo to a local folder
- Navigate to local folder
- Run 'npm install' to get dependent libraries installed
- Run 'node app.js' to start service
- You can now access the API from another terminal or broswer via: localhost:8123/test

Example calls:

$ curl -x GET localhost:8123

$ curl -X POST 'localhost:8123' --header 'Content-Type: application/json' --data-raw '{"subject":"Miracles", "saved_date":"2022-02-14", "history":"[{\"user\":true,\"text\":\"Hello\"},{\"user\":false,\"text\":\"So you don'\''t really believe in miracles -- or me.\"},{\"user\":true,\"text\": \"That'\''s not true... I do believe in miracles!\"},{\"user\":false,\"text\": \"What do you want?\"}]"}'

$ curl -x DELETE localhost:8123?id=1


* Because of the tedious nature of constructing POST request JSON strings via the command-line, I recommend using Postman, or another API platform to simplify testing. 
