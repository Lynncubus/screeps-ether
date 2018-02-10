
// Serialize a pos to a string thats easy deserialize
RoomPosition.prototype.serialize = function() {
	let x = this.x
	let y = this.y
	let room = this.roomName

	return `${room}:${x}:${y}`
}

// Creates a RoomPosition from a serialized one	
RoomPosition.deserialize = function(pos) {
	let split = pos.split(/\:/g)
	let room = split[0]
	let x = split[1]
	let y = split[2]

	return new RoomPosition(x, y, room)
}