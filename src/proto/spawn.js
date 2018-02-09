
const body = require('body')
const roles = require('roles').roles
const roleList = require('roles').roleList

const genName = require('util').genName

Spawn.prototype.spawnCreeps = function () {
	for (let role of roleList) {
		if (this.spawning) return

		let result = roles[role].spawn(this)
		if (result === OK) return
	}
}

Spawn.prototype._spawnCreep = Spawn.prototype.spawnCreep

Spawn.prototype.spawnCreep = function (role, state = {}) {
	if (this.spawning) return

	let room = this.room
	let energy = room.energyAvailable
	let maxEnergy = room.energyCapacityAvailable

	let loadout = body.build(roles[role].loadout(energy, maxEnergy))
	let name = genName(role)

	let result = this._spawnCreep(loadout, name, {
		memory: {
			role: role,
			state: state
		}
	})

	if (result !== OK) {
		//console.log(`Error while spawning creep ${name}: ${result}`)
	} else {
		console.log('Spawning creep: ' + name)
	}

	return result
}

