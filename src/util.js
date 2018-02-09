
// Adds `value` `amount` times in `arr`
module.exports.arrayAdd = function(arr, value, amount) {
	for (var i = 0; i < amount; i++) arr.push(value)
}

module.exports.genName = function(prefix) {
	let id = 1
	while (true) {
		if (Game.creeps[prefix + '_' + id]) {
			id++
		} else {
			return prefix + '_' + id
		}
	}
}