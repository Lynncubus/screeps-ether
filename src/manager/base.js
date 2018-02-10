class ManagerModule {
	constructor(name) {
		this.name = name
		this.core = Game.manager

		Memory.manager.modules[this.name] = Memory.manager.modules[this.name] || {}
	}

	// Fired every tick
	tick() {}

	get memory() { return Memory.manager.modules[this.name] || {} } 
	set memory(m) { Memory.manager.modules[this.name] = m }
}

module.exports = ManagerModule