var getModuleRepoCommands = function() {
  var commands = [];
  for (var i=0; i<modules.length; i++) {
    if (i > 0) {
      commands.push("cd ../../");
    }
    commands.push("sudo git clone https://github.com/formtools/module-" + modules[i] + " repos/module-" + modules[i]);
    commands.push("cd repos/module-" + modules[i]);
    commands.push("sudo git checkout ft-doc");
  }
  return commands.join('&&');
};


var getThemeRepoCommands = function() {
  var commands = [];
  for (var i=0; i<themes.length; i++) {
    if (i > 0) {
      commands.push("cd ../../");
    }
    commands.push("sudo git clone https://github.com/formtools/theme-" + themes[i]  + " repos/theme-" + themes[i]);
    commands.push("cd repos/theme-" + themes[i]);
    commands.push("sudo git checkout ft-doc");
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
  }
  for (var i=0; i<modules.length; i++) {
    commands.push("cd ../../repos/module-" + modules[i]);
    commands.push("sudo git pull");
  }
  return commands.join('&&');
};


