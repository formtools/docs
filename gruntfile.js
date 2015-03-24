module.exports = function(grunt) {
	"use strict";

	var fs = require("fs");
	var vm = require("vm");

  var _includeInThisScope = function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
  }.bind(this);
  _includeInThisScope("grunt/plugin_list.js");
  _includeInThisScope("grunt/helpers.js");

  var generateListFile = function(source) {
    var sourceObj = (source === "module") ? modules : themes;

    var found = [];
    for (var i=0; i<sourceObj.length; i++) {
      var folder = source + "-" + sourceObj[i];
      var packageFile = "repos/" + folder + "/package.json";
      if (!fs.existsSync(packageFile)) {
        continue;
      }

      var json = grunt.file.readJSON(packageFile);

      // copy the icons out of the module/theme
      if (source === "module") {
        copyIcons(folder, json.icons);
      } else {
        // copy theme screenshots
      }

      // append the folder name. This is used to construct links to the icons
      json.folder = folder;

      found.push(json);
    }

    grunt.file.write("_data/" + source + "_list.json", JSON.stringify(found));
  };


  var iconFile, targetFolder;
  var copyIcons = function (folder, icons) {

    // remove the old folder
    config.clean.folder = ["./assets/generated/" + folder];
    grunt.task.run("clean:folder")

    // now copy over the icons
    for (var icon in icons) {
      iconFile = "./repos/" + folder + "/" + icons[icon];
      targetFolder = "assets/generated/" + folder + "/";

      // create the folder
      grunt.task.run("shell:copyIcon");
    }
  };

  var getCopyIconCommand = function () {
    var commands = [];
    commands.push("sudo mkdir " + targetFolder);
    commands.push("sudo chmod 777 " + targetFolder);
    commands.push("sudo cp " + iconFile + " " + targetFolder);

    console.log("_______________________________");
    console.log(commands);
    console.log("_______________________________");

    return commands.join('&&');
  };


	var config = {
		pkg: grunt.file.readJSON("package.json"),
		clean: {},
		template: {},
    copy: {},

		shell: {
			start: { command: "jekyll serve --watch" },
      update:          { command: getUpdateCommands() },
			downloadModules: { command: getModuleRepoCommands() },
			downloadThemes:  { command: getThemeRepoCommands() },
      copyIcon: { command: function() { getCopyIconCommand(); } }
		}
	};

	grunt.initConfig(config);

	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask("createModuleListFiles", function () {
    generateListFile("module");
    generateListFile("theme");
  });

  // ----------------------------------------------------------------------------------------------

  // run only once after a fresh install to download all repos locally. This can also be run after a new
  // module/theme has been added
  grunt.registerTask("init", ["shell:downloadModules", "shell:downloadThemes", "createModuleListFiles"]);

  // updates the content of the external repos and rebuilds
  grunt.registerTask("update", ["shell:update", "createModuleListFiles"]);

  // starts the server
  grunt.registerTask("start", ["shell:start"]);
};
