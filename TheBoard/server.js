var http = require('http');
var express = require("express");

var app = express();

app.get("/", function(req, res) {
    res.send("<h1>Hello World</h1>");
});

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({name: "Abhi", age: 35});
});

var server = http.createServer(app);

var port = process.env.port || 1337;
server.listen(port);