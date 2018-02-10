
Memory.util = Memory.util || {}
var util = {}

// Adds `value` `amount` times in `arr`
util.arrayAdd = function(arr, value, amount) {
	for (var i = 0; i < amount; i++) arr.push(value)
}

util.genName = function(prefix) {
	let id = 1
	while (true) {
		if (Game.creeps[prefix + '_' + id]) {
			id++
		} else {
			return prefix + '_' + id
		}
	}
}

Memory.util.counter = Memory.util.counter || 0
util.uniqueId = () => (Memory.util.counter++).toString(16)

Game.util = util
module.exports = util