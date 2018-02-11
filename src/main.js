require('init')
const manager = require('manager')

module.exports.loop = function() {
	// clean creep memory
	for (let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
				delete Memory.creeps[name];
		}
	}

	manager.tick()

	for (let name in Game.creeps) {
		// run creep logic
		Game.creeps[name].runRole();
	}

	for (let spawnName in Game.spawns) {
		// run spawn logic
		Game.spawns[spawnName].spawnCreeps();
	}
}