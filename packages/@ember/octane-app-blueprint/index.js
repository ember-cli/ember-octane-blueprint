'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getRepoCommitVersion = require('octane-blueprint-utils').getRepoCommitVersion;

module.exports = {
  description: 'Generates an Ember Octane application.',
  // name: '@ember/octane-app-blueprint',
  name: 'ember-octane-app-blueprint',

  filesToRemove: [],

  locals(options) {
    let emberCLI;

    return getRepoCommitVersion('ember-cli', 'ember-cli').then((url) => {
      emberCLI = url
      return getURLFor('canary');
    }).then( (url) => {

      let emberCanaryVersion = url;
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
        emberCanaryVersion,
        emberCLI
      };
    });

  },

  fileMapTokens(options) {
    return {
      __component__() { return options.locals.component; },
    };
  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        {
          // To be replaced by built-in decorators
          name: 'ember-decorators',
          target: '5.1.2',
        },
        {name: 'ember-data'},
        {
          // TODO: To be replaced by built-in glimmer components
          //       https://github.com/emberjs/rfcs/pull/338
          name: 'sparkles-component'
        },
        {
          // TODO: To be replaced by built-in render-modifiers
          name: '@ember/render-modifiers'
        },
        {
          // TODO: remove when native importing is supported
          name: 'ember-auto-import'
        },
      ]
    });
  }
};
