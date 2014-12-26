module.exports = {
	dist: {
		files: './src/**',
		tasks: 'nodewebkit',
		options: {
			livereload: 1337,
			spawn: false
		}
	}
};