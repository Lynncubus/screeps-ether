function arrayAdd(arr, value, amount) {
	for (var i = 0; i < amount; i++) arr.push(value)
}

function defaultLoadout(loadout) {
	return Object.assign({
		work: 0,
		carry: 0,
		move: 0,
		attack: 0,
		ranged_attack: 0,
		heal: 0,
		claim: 0,
		tough: 0
	}, loadout)
}

const partCosts = {
	move: 50,
	work: 100,
	carry: 50,
	attack: 80,
	ranged_attack: 150,
	heal: 250,
	claim: 600,
	tough: 10
}

const partTypes = [
	MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, CLAIM, TOUGH
]

module.exports = {

	cost(loadout = {}) {
		loadout = defaultLoadout(loadout)

		let amount = 0

		partTypes.forEach((type) => {
			amount += partCosts[type] * loadout[type]
		})

		return amount
	},

	/**
	 * creates a build from loadout option
	 */
	build(loadout = {}) {
		loadout = defaultLoadout(loadout)
	
		let build = []

		partTypes.forEach((type) => {
			arrayAdd(build, type, loadout[type])
		})
	
		return build
	}

}