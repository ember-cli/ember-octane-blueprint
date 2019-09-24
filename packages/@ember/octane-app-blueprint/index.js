'use strict';

const latestVersion = require('latest-version');
const stringUtil = require('ember-cli-string-utils');
const getChannelURL = require('ember-source-channel-url');

module.exports = {
  description: 'Generates an Ember Octane application.',
  name: '@ember/octane-app-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      latestVersion('ember-cli', {version: 'beta'}),
      latestVersion('ember-data', {version: 'beta'}),
      getChannelURL('beta')
    ]).then(([emberCLI, emberData, emberSource]) => {
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
        emberSourceVersion: emberSource,
        emberCLI,
        emberData,
      };
    });

  },

  fileMapTokens(options) {
    return {
      __component__() { return options.locals.component; },
    };
  }
};
