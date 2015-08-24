module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {separator: '\n'},
			libs: {
				src: [
					'scripts/signature-pad.js',
					'scripts/signature.js'
				],
				dest: 'src/jquery-signature.js'
			}
		},
		watch: {
			scripts: {
				files: [
					'scripts/*.js'
				],
				tasks: ['c','u'],
				options: {
					interrupt: true
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'src/jquery-signature.min.js': 'src/jquery-signature.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('c', 'concat:libs');
	grunt.registerTask('u', 'uglify');

};