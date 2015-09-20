"use strict";
var path = require("path");

var express = require("express");
var app = express();

app.use("/", express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(
        path.join(__dirname, "views/index.html")
    );
});

app.get("/about-site", function(req, res) {
    res.sendFile(
        path.join(__dirname, "views/about-site.html")
    );
});

app.get("*", function(req, res) {
    res.sendFile(
        path.join(__dirname, "views/404.html")
    );
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Server running on port " + port);
});