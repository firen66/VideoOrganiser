import fs = require("fs")
import path = require("path")
import cp = require("child_process")
import { file } from "./file"

export class ffmpeg {
	movie:string
	thumb:string
	time:string
	
	ffmpeg  = path.resolve("./bin/ffmpeg.exe")
	ffprobe = path.resolve("./bin/ffprobe.exe")

	constructor(_movie: string, _thumb?: string, _time?: string) {
		console.log("m:" + _movie + " t:" + _thumb + " i:" + _time)
		this.movie = "\"" + path.resolve(_movie) + "\""
		if (_thumb != undefined) {
			this.thumb = "\"" + path.resolve(_thumb) + "\""
		} else {
			let thumbPath = path.resolve(path.dirname(_movie), "thumbs/")
			file.makedirSync(thumbPath)
			this.thumb = "\"" + path.resolve(thumbPath, path.basename(_movie, path.extname(_movie))) + ".jpg\""
		}
		
		console.log(this.thumb)
		this.time = _time || "half"
	}

	getDuration(callback) {
		cp.exec(this.ffprobe + " -i " + this.movie, (err, stdout, stderr) => {
			console.log(stderr)
			let info = stderr.split("Duration")[1]
			let times = info.split(/[\.:]/).map((value) => {
				return Number(value.trim())
			})
			callback((times[1]*60*60)+(times[2]*60)+times[3])
		})
	}

	delThumb () {
		fs.unlinkSync(this.thumb)
	}

	makeThumb () {
		if (fs.existsSync(this.thumb)) {
			this.delThumb()
		}
		if (this.time == "half") {
			this.getDuration((time) => {
				console.log(time)
				cp.exec(this.ffmpeg + " -i " + this.movie + " -ss " + (time/2) + " -r 1 -an -vframes 1 -f mjpeg " + this.thumb)
			})
		} else {
			cp.exec(this.ffmpeg + " -i " + this.movie + " -ss " + this.time + " -r 1 -an -vframes 1 -f mjpeg " + this.thumb)
		}
	}
}