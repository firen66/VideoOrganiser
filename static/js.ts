this.allowDrop = (event: DragEvent) => {
	event.preventDefault()
}

this.drag = (event) => {
	console.log(event)
	event.dataTransfer.setData("text", event.target.innerText)
}

this.drop = (event: DragEvent) => {
	event.preventDefault()
	let data = event.dataTransfer.getData("text")
	alert(data)
}