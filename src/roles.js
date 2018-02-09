module.exports.roles = {
	harvester: require('role.harvester'),
	carrier: require('role.carrier')
}

module.exports.roleList = [ // put them in order of most importance
	'carrier',
	'harvester'
]