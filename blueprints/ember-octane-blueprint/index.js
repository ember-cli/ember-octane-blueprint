'use strict';

const stringUtil = require('ember-cli-string-utils');
const dasherize = require('ember-cli-string-utils').dasherize;
const classify = require('ember-cli-string-utils').classify;

module.exports = {
  description: 'Generates an Ember Octane application.',

  filesToRemove: [],

  locals(options) {
    let entity = options.entity;
    let rawName = entity.name;
    let name = stringUtil.dasherize(rawName);
    let namespace = stringUtil.classify(rawName);

    // let name = '@ember/octane';
    let blueprintVersion = require('./package').version;

    return {
      name,
      modulePrefix: name,
      namespace,
      yarn: true,
      welcome: false,
      blueprintVersion,
    };
  },

  filesPath: function() {
    let filesDirectory = 'files';

    return path.join('', filesDirectory);
  },

  fileMapTokens(options) {
    return {
      __component__() { return options.locals.component; },
    };
  },

  afterInstall() {
    return this.addAddonsToProject([{
      // To be replaced by built-in decorators
      // Yet to be submitted
      name: 'ember-decorators',
    }, {
      // To be replaced by built-in glimmer components
      // https://github.com/emberjs/rfcs/pull/338
      name: 'sparkles-component'
    }, {
      // To be (partially) replaced by https://github.com/emberjs/rfcs/pull/388
      name: 'ember-composable-helpers'
    }]);
  }
};
