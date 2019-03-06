'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getEmberCLIVersion = require('octane-blueprint-utils').getEmberCLIVersion;

module.exports = {
  description: 'Generates an Ember Octane application.',
  // name: '@ember/octane-app-blueprint',
  name: 'ember-octane-app-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      getEmberCLIVersion(),
      getURLFor('canary')
    ]).then(([emberCLIURL, emberURL]) => {
      let name = stringUtil.dasherize(options.entity.name);
      let entity = options.entity;
      let rawName = entity.name;
      let namespace = stringUtil.classify(rawName);

      return {
        name,
        modulePrefix: name,
        namespace,
        yarn: options.yarn,
        welcome: options.welcome,
        emberCanaryVersion: emberURL,
        emberCLI: emberCLIURL
      };
    });

  },

  fileMapTokens(options) {
    return {
      __component__() { return options.locals.component; },
    };
  }
};
