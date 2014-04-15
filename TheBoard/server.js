var http = require('http');
var express = require("express");
var app = express();

//app.set("view engine", "jade");
app.set("view engine", "vash");

app.get("/", function(req, res) {
    //  res.send("<h1>Hello World</h1>");
    res.render("index", {title : "Express + vash"});
});

var server = http.createServer(app);

var port = process.env.port || 1300;
server.listen(port);