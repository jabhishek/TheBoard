var http = require('http');
var express = require("express");
var app = express();

app.set("view engine", "jade");

app.get("/", function(req, res) {
    //  res.send("<h1>Hello World</h1>");
    res.render("jade/index", {title : "Express + jade"});
});

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({name: "Abhi", age: 35});
});

var server = http.createServer(app);

var port = process.env.port || 1300;
server.listen(port);