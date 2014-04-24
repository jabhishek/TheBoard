var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
    // Opt into services
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession( { secret: "TheBoardSession" } ));
app.use(flash());


var controllers = require("./controllers");
controllers.init(app);
app.set("view engine", "vash");

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

var server = http.createServer(app);

var port = process.env.port || 1313;
server.listen(port); 