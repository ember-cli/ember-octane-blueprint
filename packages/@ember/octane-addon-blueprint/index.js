'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getRepoCommitVersion = require('octane-blueprint-utils').getRepoCommitVersion;

module.exports = {
  description: 'Generates an Ember Octane addon.',
  name: 'ember-octane-addon-blueprint',

  filesToRemove: [],

  locals(options) {
    let emberCLI;

    return getRepoCommitVersion('ember-cli', 'ember-cli').then((url) => {
      emberCLI = url
      return getURLFor('canary');
    }).then( (url) => {

      let emberCanaryVersion = url;

      let addonEntity = options.entity;
      let addonRawName = addonEntity.name;
      let addonName = stringUtil.dasherize(addonRawName);
      let addonNamespace = stringUtil.classify(addonRawName);

      return {
        addonName,
        addonNamespace,
        emberCanaryVersion,
        emberCLI,
        year: new Date().getFullYear(),
        yarn: options.yarn,
        welcome: options.welcome,
        blueprint: 'addon',
      };
    });

  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-auto-import'},
      ]
    });
  }
};
