import express = require("express")
let app = express()
let port = process.argv[2] || 8000

app.get("/", (req, res) => {
	res.write("Hello World!")
	
	res.end()
})

















app.listen(port, () => {
	console.log("Server running on port: " + port)
})