module.exports = function(grunt) {
	"use strict";

	var fs = require("fs");
	var vm = require("vm");
  var ffi = require("node-ffi");

  var _includeInThisScope = function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
  }.bind(this);
  _includeInThisScope("grunt/plugin_list.js");
  _includeInThisScope("grunt/helpers.js");

  // this parses the list of downloaded modules and generates the _includes/generated-module-index.html page.
  var generateModuleListPage = function() {
    var foundModules = [];
    for (var i=0; i<modules.length; i++) {
      var packageFile = "repos/module-" + modules[i] + "/package.json";
      if (!fs.existsSync(packageFile)) {
        continue;
      }
      foundModules.push(fs.readFileSync(packageFile));
    }

    console.log(foundModules);
  };

  // This parses the list of downloaded modules and generates the _includes/generated-module-index.html page.
  var generateThemeListPage = function() {

  };


	var config = {
		pkg: grunt.file.readJSON("package.json"),
		clean: {},
		template: {},

		shell: {
			start: { command: "jekyll serve --watch" },
      update:          { command: getUpdateCommands() },
			downloadModules: { command: getModuleRepoCommands() },
			downloadThemes:  { command: getThemeRepoCommands() }
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');

  // run only once after a fresh install to download all repos locally. This can also be run after a new
  // module/theme has been added
  grunt.registerTask("init", ["shell:downloadModules", "shell:downloadThemes"]);

  grunt.registerTask("m", function () {
    generateModuleListPage();
  });

  // updates the content of the external repos and rebuilds
  grunt.registerTask("update", ["shell:update"]);
};
