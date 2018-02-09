require('dotenv').config()

const gulp = require('gulp')

const babel = require('gulp-babel')
const screeps = require('gulp-screeps')
const del = require('del')
const flattenDir = require('./gulp-flatten-dir')
const debug = require('gulp-debug')

gulp.task('clean', () => {
	return del(['dist'])
})

gulp.task('compile', () => {
	return gulp.src('src/**/*.js')
		//.pipe(debug())
		//.pipe(babel({ presets: ['env'] }))
		.pipe(flattenDir())
		.pipe(gulp.dest('dist'))
})

gulp.task('upload', () => {
	return gulp.src('dist/*.js')
		.pipe(screeps({
			token: process.env.TOKEN,
			branch: 'ether'
		}))
})

gulp.task('default', gulp.series('clean', 'compile', 'upload'));