const ManagerBase = require('manager.base')
const util = require('util')

/**
 * Construction manager
 * 
 * The construction manager takes care of constructions tasks.
 * Instead of every screep asking for constructions that need to be build they ask this
 * manager and it will give them a taks based on assignee and priority.
 */

class ManagerModule extends ManagerBase {
	constructor() {
		super('construct')
	}

	get tasks() { return this.memory.tasks || [] }
	set tasks(t) { this.memory.tasks = t }

	// Update assignees if one dies or if the construction site is destroyed
	// Fired every tick
	tick() {

	}

	/**
	 * 
	 * @param {*} type - Type of structure (STRUCTURE_*) 
	 * @param {*} pos - RoomPosition
	 * @param {*} priority - Priority, default: 1
	 */
	newTask(type, pos, priority = 1) {
		const id = util.uniqueId()
		
		let task = { 
			type,
			pos: pos.serialize(),
			id 
		}

		let tasks = this.tasks
		tasks.push(task)
		this.tasks = tasks

		return task
	}

	delTask(id) {
		const index = this.tasks.findIndex((task) => task.id === id)
		if (!index) return
		let tasks = this.tasks
		const deleted = tasks.slice(index, 1)[0]
		this.tasks = tasks
	}
}

module.exports = new ManagerModule()