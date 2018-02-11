const roles = require('roles').roles

Creep.prototype.runRole = function() {
	if (this.spawning) return

	const startCpu = Game.cpu.getUsed();

	if (!this.state) {
		this.state = roles[this.memory.role].state(this) // create state machine for role
	}

	this.state.run()

	let visual = this.room.visual
		
	let x = this.pos.x
	let y = this.pos.y
	
	visual.text(this.memory.role.toUpperCase(), x, y - .3, {
		align: 'center',
		font: .3
	})

	const elapsed = Math.floor((Game.cpu.getUsed() - startCpu)*1000)/1000
	//console.log('Creep '+this.name+' has used '+elapsed+' CPU time');

	visual.text(elapsed + ' cpu', x+.5, y+.2, {
		align: 'left',
		font: .3
	})
}

Creep.prototype._moveTo = Creep.prototype.moveTo

Creep.prototype.moveTo = function(target, opts = {}) {
	return this._moveTo(target, _.assign({
		reusePath: 60,
		visualizePathStyle: {
			fill: 'transparent',
			stroke: '#fff',
			lineStyle: 'dashed',
			strokeWidth: .1,
			opacity: .1
		}
	}, opts))
}