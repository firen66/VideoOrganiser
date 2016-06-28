import express = require("express")
var api = require("./api/api")
let app = express()
let port = process.argv[2] || 8000

app.use(express.static("static"))
app.use("/api", api)















app.listen(port, () => {
	console.log("Server running on port: " + port)
})