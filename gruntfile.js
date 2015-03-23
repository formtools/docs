module.exports = function(grunt) {
	"use strict";

	var fs = require('fs');
	var vm = require('vm');

	var getModuleRepoCommands = function() {
		var commands = [];
		for (var i=0; i<modules.length; i++) {
			commands.push('sudo git clone https://github.com/formtools/module-' + modules[i]  + ' repos/module-' + modules[i]);
		}
		return commands.join('&&');
	};

	var getThemeRepoCommands = function() {
		var commands = [];
		for (var i=0; i<themes.length; i++) {
			commands.push('sudo git clone https://github.com/formtools/theme-' + themes[i]  + ' repos/theme-' + themes[i]);
		}
		return commands.join('&&');
	};

  var getUpdateCommands = function() {
    var commands = [];
    for (var i=0; i<themes.length; i++) {
      if (i === 0) {
        commands.push("cd repos/theme-" + themes[i])
      } else {
        commands.push("cd ../../repos/theme-" + themes[i]);
      }
      commands.push("sudo git pull");
      commands.push("sudo git checkout ft-doc");
    }
    for (var i=0; i<modules.length; i++) {
      commands.push("cd ../../repos/module-" + modules[i]);
      commands.push("sudo git pull");
      commands.push("sudo git checkout ft-doc");
    }
    return commands.join('&&');
  };

	var modules = [
		"arbitrary_settings",
		"calendar",
		"client_audit",
		"core_field_types",
		"custom_fields",
		"database_integrity",
		"data_visualization",
		"export_manager",
		"extended_client_fields",
		"facebook_forms",
		"field_type_file",
		"field_type_google_maps",
		"field_type_tinymce",
		"form_backup",
		"form_builder",
		"hello_database",
		"hello_tabs",
		"hello_world",
		"hooks_manager",
		"ip_security_check",
		"js_error_logs",
		"mass_edit",
		"media_gallery",
		"pages",
		"report_builder",
		"submission_pre_parser",
		"submission_id_manager",
		"submission_history",
		"submission_accounts",
		"swift_mailer",
		"system_check",
		"text_override"
	];

	var themes = [
		"classicgrey",
		"deepblue",
		"ohcanada"
	];


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

  // updates the content of the external repos and rebuilds
  grunt.registerTask("update", ["shell:update"]);
};
