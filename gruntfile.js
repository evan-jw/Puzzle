module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
			dist: {
				src: [
					'js/lib/Jquery/*.js',
					'js/lib/Bootstrap/*.js',
					'js/lib/Angular/*.js', 
					'js/lib/JqueryUI/*.js',
					'js/Controller/*.js',
					'js/AngularApp.js',
					'js/Init.js'
				],
				dest: 'js/build/production.js',
			}
        },
		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},
		sass:{
			dist: {
				options: {
					style: 'compressed',
					lineNumbers: true, // 1
					sourcemap: 'none'
				},
				files: [{
					expand: true, // 2
					cwd: 'scss',
					src: [ '**/*.scss' ],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		cssmin:{
			target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: [ '*.css', '!*.min.css' ], // 1
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'web/img/',
					src: ['*.{png,jpg,gif}'],
					dest: 'web/img/build'
				}]
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js','scss/*.scss'],
				tasks: ['concat', 'uglify','sass','cssmin'],
				options: {
					spawn: false,
					livereload: true
				},
			} 
		}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify','imagemin','sass','cssmin','watch']);
};