module.exports = function(grunt) {
	"use strict";

	var config = {
		shell: {
			start: { command: "jekyll serve --watch" }
		}
	};

	grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');

  // ----------------------------------------------------------------------------------------------

  // starts the Jekyll server
  grunt.registerTask("start", ["shell:start"]);
};
