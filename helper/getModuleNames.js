var Result = require('rust-result');
var safeParse = require('safe-json-parse/result');

module.exports = function getModuleNames(contentsStr, type, cb) {
  var modules = [];

  if (!type) return;

  var result = safeParse(contentsStr);
  if (Result.isErr(result)) {
    var err = Result.Err(result);
    throw new Error('There are errors in config file ' + err);
  } else if (Result.isOk(result)) {
    var json = Result.Ok(result);

    if (type === 'npm') {
      modules = json['dependencies'] ? modules.concat(Object.keys(json['dependencies'])) : modules;

      modules = json['devDependencies'] ? modules.concat(Object.keys(json['devDependencies'])) : modules;
    }

    return cb ? cb(modules) : modules;
  }
}
