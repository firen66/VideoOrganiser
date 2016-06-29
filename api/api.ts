import express = require("express")
import { ffmpeg } from "./ffmpeg"
import { file }   from "./file"

var api = express()

api.get("/thumb", (req, res) => {
    let filename = req.query.filename || "E:/temp/temp/movie 2.mp4"
    let ff = new ffmpeg(filename)
    ff.makeThumb()
    
    res.send("Finished")
})

api.get("/files", (req, res) => {
    let filepath = req.query.filepath || "E:/temp/"
    let files = file.getFiles(filepath)

    res.send(files)
})

api.get("/allfiles", (req, res) => {
    let filepath = req.query.filepath || "E:/temp/"
    let files = file.getFilesRecursive(filepath)

    res.send(files)
})

api.get("/move", (req, res) => {
    let from = req.query.from
    let to = req.query.to
    if (from && to) {
        console.log(from)
        console.log(to)

        file.moveFile(from, to)

        res.send("Moved")
    } else {
        res.send("Need from and to...")
    }
})

module.exports = api