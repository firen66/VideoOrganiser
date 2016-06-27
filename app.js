"use strict";
var express = require("express");
var app = express();
var port = process.argv[2] || 8000;
app.get("/", function (req, res) {
    res.write("Hello World!");
    res.end();
});
app.listen(port, function () {
    console.log("Server running on port: " + port);
});
