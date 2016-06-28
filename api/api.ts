import express = require("express")

var api = express()

api.get("/", function (req, res) {
    res.send("API")
    res.end()
})

module.exports = api