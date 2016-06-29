import fs = require("fs")
import path = require("path")

export class file {

	static getFiles (folder: string) {
		return fs.readdirSync(folder)
	}

	static getFilesRecursive (folder: string) {
		var content = fs.readdirSync(folder)
		var filetree = []
		content.forEach((fileName) => {
			let filePath = path.join(folder, fileName)
			let stats = fs.lstatSync(filePath)

			if (stats.isDirectory()) {
				let files = this.getFilesRecursive(filePath)
				filetree.push.apply(files)
			} else {
				filetree.push(filePath)
			}
		})

		return filetree
	}

	static moveFile (from: string, to: string) {
		let source = fs.createReadStream(from)
		let dest   = fs.createWriteStream(to)

		source.pipe(dest)
		source.on("end", () => {
			fs.unlinkSync(from)
			console.log("Moved " + from + " to " + to)
		})
		source.on("error", (err) => {
			console.log(err)
		})
	}

	static makedirSync (path: string) {
		try {
			fs.mkdirSync(path)
		} catch(e) {
			if ( e.code != "EEXIST" ) throw e			
		}
	}
}