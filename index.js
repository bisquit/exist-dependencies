'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var detectInstalled = require('detect-installed');
var getModuleNames = require('./helper/getModuleNames');

var ConfigTypes = {
  'npm': 'package.json'
};

module.exports = function(opts) {
  var cwd = process.cwd();
  var results = {};
  var opts = _.assign({
    root: './',
    ignore: []
  }, opts);
  var configTypes = _.omit(ConfigTypes, opts.ignore);

  _.forEach(configTypes, function(filename, type) {
    var filepath = path.resolve(cwd, opts.root, filename);
    if (!fs.statSync(filepath).isFile()) return;

    var contents = fs.readFileSync(filepath, 'utf-8');
    var modules = getModuleNames(contents, type);
    if (!modules) return;
    var allModuleInstalled = true;
    modules.forEach(function(module) {
      allModuleInstalled = allModuleInstalled && detectInstalled(module, true);
    });

    results[type] = allModuleInstalled;
  });

  return _.assign(results, {
    all: _.every(results)
  });
}
