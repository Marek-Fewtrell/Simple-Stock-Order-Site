/*
* app.js
* Main file for the development server for the stock site.
* Creates database connection and starts server.
*
*/

var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

var port = 23128;
var connectionDetails = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "stocksite"
}

var dbconnection = mysql.createConnection(connectionDetails);
dbconnection.connect(function(err){
  if (err) {
    console.log("Error connecting with DB");
    console.log(err);
    return;
  }
  console.log('Database Connection Established');
});

//Server can parse json and encoded urls.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//This identifies the files you want to expose in your web server.
//Exposes the app folder one folder up.
app.use("/", express.static('../app/'));

//Creates and includes the routes available on the server.
var routes = require("./routes.js")(app, dbconnection);

//Starts the server listening on this port
var server = app.listen(port, function() {
  console.log("Listening on port %s...", server.address().port);
});
