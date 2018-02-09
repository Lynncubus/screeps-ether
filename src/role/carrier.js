const State = require('state')

const logic = [ 
	{
		name: 'moving',
		start: true,
		action(creep, memory) {
			let source = Game.getObjectById(memory.source) || creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
				filter: (source) => {
					var creeps = creep.room.find(FIND_MY_CREEPS).filter(creep => creep.memory.role === 'carrier')
					return !creeps.some(creep => creep.memory.state.source === source.id)
				}
			});

			if (!source) return
			memory.source = source.id

			if ( !source.pos.inRangeTo(creep, 1) ) {
				creep.moveTo(source)
			} else {
				memory.state = 'pickup'
				memory.source = source.id
			}
		}
	},
	{
		name: 'pickup',
		action(creep, memory) {
			let source = Game.getObjectById(memory.source)

			if ( !source ) {
				memory.source = null
				memory.state = 'moving'
			}

			let result = creep.pickup(source)
			if ( result === ERR_FULL ) {
				memory.source = null
				memory.state = 'transfer'
			}
		}
	},
	{
		name: 'transfer',
		action(creep, memory) {
			let source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: s => s.energy < s.energyCapacity
			})

			if (!source) return // There is no storage container that needs energy

			if ( !source.pos.inRangeTo(creep, 1) ) {
				creep.moveTo(source)
			} else {
				let result = creep.transfer(source, RESOURCE_ENERGY)
				switch(result) {
					case ERR_NOT_ENOUGH_RESOURCES:
						memory.state = 'moving'
						break
				}
			}
		}
	}
]

// Simple, one carrier for each harvester + 1. Seems fairly balanced
module.exports.spawn = function(spawn) {
	let room = spawn.room
	var creeps = room.find(FIND_MY_CREEPS)

	var harvesters = creeps.filter((creep) => creep.memory.role === 'harvester')
	var carriers = creeps.filter((creep) => creep.memory.role === 'carrier')

	if (harvesters.length > carriers.length) {
		return spawn.spawnCreep('carrier')
	}
}

module.exports.loadout = (energy, maxEnergy) => { // can later be used based on amount of energy there is available
	return {
		carry: 1,
		move: 1
	}
}

module.exports.state = (creep) => new State(creep, logic)