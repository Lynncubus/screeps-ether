class Manager {
	constructor() {
		if (!Memory.manager) Memory.manager = {} 
		if (!Memory.manager.core) Memory.manager.core = {}
		if (!Memory.manager.modules) Memory.manager.modules = {}

		this.modules = {
			construct: require('manager.construct')
		}
	}

	get memory() { return Memory.manager.core }
	set memory(m) { Memory.manager.core = m }
}

Game.manager = new Manager()

module.exports = Game.manager