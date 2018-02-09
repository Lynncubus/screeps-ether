const State = require('state')

const logic = [ 
	{
		name: 'moving',
		start: true,
		action(creep, memory) {
			let source = Game.getObjectById(memory.target)

			if ( !source.pos.inRangeTo(creep, 1) ) {
				creep.moveTo(source)
			} else {
				memory.state = 'harvesting'
			}
		}
	},
	{
		name: 'harvesting',
		action(creep, memory) {
			let source = Game.getObjectById(memory.target)

			if ( source.energy > 0 ) {
				creep.harvest(source)
			}/* else { 
				memory.source = null
				memory.state = 'moving'	
			}
			*/
		}
	}
]

// I think in an optimal situation, 1 harvester should be assigned to 1 resource.
// So if there are 2 resources in a room, there should be 2 harvesters each assigned to their resource.
module.exports.spawn = function(spawn) {
	let room = spawn.room

	var sources = room.find(FIND_SOURCES)
	var creeps = room.find(FIND_MY_CREEPS)

	var harvesters = creeps.filter((creep) => creep.memory.role === 'harvester')

	for (let source of sources) {
		if ( !harvesters.some(creep => creep.memory.state.target === source.id) ) {
			return spawn.spawnCreep('harvester', {
				target: source.id
			})
		}
	}
}

module.exports.loadout = (energy, maxEnergy) => { // can later be used based on amount of energy there is available
	return {
		work: 1,
		move: 1
	}
}

module.exports.state = (creep) => new State(creep, logic)