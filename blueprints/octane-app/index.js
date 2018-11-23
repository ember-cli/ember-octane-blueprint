'use strict';

const stringUtil = require('ember-cli-string-utils');

module.exports = {
  description: 'Generates an Ember Octane application.',

  filesToRemove: [],

  locals(options) {
    let entity = options.entity;
    let rawName = entity.name;
    let name = stringUtil.dasherize(rawName);
    let namespace = stringUtil.classify(rawName);

    return {
      name,
      modulePrefix: name,
      namespace,
      emberCLIVersion: require('../../package').version,
      yarn: options.yarn,
      welcome: options.welcome,
    };
  },

  fileMapTokens(options) {
    return {
      __component__() { return options.locals.component; },
    };
  },

  beforeInstall() {
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
