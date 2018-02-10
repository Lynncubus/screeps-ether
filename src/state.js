class State {
	constructor(source, logic) {
		this._logic = logic
		this.source = source

		let startState = this._logic.find((state) => state.start ) || this._logic[0].name

		// Initialize memory
		this.memory = _.assign({
			state: startState.name
		}, this.memory)
	}

	// This.memory is simply a link to source.memory.state
	// This makes writing memory a lot easier
	get memory() { return this.source.memory.state }
	set memory(m) { this.source.memory.state = m }

	run() {
		// update memory
		var oldState = this.memory.state

		let memory = Object.assign({}, this.memory)
		// run logic
		this._logic.find((state) => state.name === this.memory.state).action(this.source, memory)

		this.memory = memory

		this.draw()
	}

	/**
	 * Instead of logging to the console which can be tedious since it quickly moves errors out of the way
	 * we draw some stuff instead
	 */
	draw() {
		if (!Memory.debug.state) return

		let visual = this.source.room.visual
		
		let x = this.source.pos.x
		let y = this.source.pos.y + .7
		
		visual.text(this.memory.state, x, y, {
			align: 'center',
			font: .3
		})
	}
}

module.exports = State

