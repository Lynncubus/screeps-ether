const roles = {
	harvester: require('role.harvester'),
	carrier: require('role.carrier')
}

Creep.prototype.runRole = function() {
	if (this.spawning) return

	if (!this.state) {
		this.state = roles[this.memory.role].state(this) // create state machine for role
	}

	this.state.run()

	let visual = this.room.visual
		
	let x = this.pos.x
	let y = this.pos.y - .3
	
	visual.text(this.memory.role.toUpperCase(), x, y, {
		align: 'center',
		font: .3
	})
}

Creep.prototype._moveTo = Creep.prototype.moveTo

Creep.prototype.moveTo = function(target, opts = {}) {
	return this._moveTo(target, _.assign({
		reusePath: 30,
		visualizePathStyle: {
			fill: 'transparent',
			stroke: '#fff',
			lineStyle: 'dashed',
			strokeWidth: .15,
			opacity: .1
		}
	}, opts))
}