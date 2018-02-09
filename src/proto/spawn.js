
const body = require('body')

const roleList = [ // put them in order of most importance
	'carrier',
	'harvester'
]

const roleBalance = [ // WIP
	// the balance of creep roles
	// This is based around the amount of available creeps and their roles. 
	// A higher number (max: 1) means a higher importance of that creep.

	{ role: 'harvester', value: 1 },
	{ role: 'carrier', value: 1 }
]

const roles = {
	harvester: require('role.harvester'),
	carrier: require('role.carrier')
}

function genName(prefix) {
	let id = 1
	while (true) {
		if (Game.creeps[prefix + '_' + id]) {
			id++
		} else {
			return prefix + '_' + id
		}
	}
}

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

