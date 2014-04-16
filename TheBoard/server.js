var http = require('http');
var express = require("express");
var app = express();
var controllers = require("./controllers");
controllers.init(app);
app.set("view engine", "vash");

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

var port = process.env.port || 1300;
server.listen(port);