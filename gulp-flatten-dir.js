const through = require('through2')
const path = require('path')

module.exports = function() {
	return through.obj(function(file, enc, cb) {
		file.path = path.join(
			file.base,
			path.relative(file.base, file.path).replace(/(\/|\\)/g, '.')
		)
		
		cb(null, file)
	})
}