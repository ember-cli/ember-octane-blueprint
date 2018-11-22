'use strict';
const addonBlueprint = require('ember-cli/blueprints/addon');

module.exports = Object.assign({}, addonBlueprint, {
  description: 'Generates an Ember Octane addon.',
  appBlueprintName: 'module-unification-app',
  fileMap: Object.assign({}, addonBlueprint.fileMap, {
    '^src.*': 'tests/dummy/:path',
    '^addon-src/.gitkeep': 'src/.gitkeep',
  }),
});
