'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getRepoVersion = require('octane-blueprint-utils').getRepoVersion;

module.exports = {
  description: 'Generates an Ember Octane addon.',
  name: '@ember/octane-addon-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      getRepoVersion('ember-cli', 'ember-cli'),
      getURLFor('canary')
    ]).then(([emberCLIURL, emberURL]) => {
      let addonEntity = options.entity;
      let addonRawName = addonEntity.name;
      let addonName = stringUtil.dasherize(addonRawName);
      let addonNamespace = stringUtil.classify(addonRawName);

      return {
        addonName,
        addonNamespace,
        emberCanaryVersion: emberURL,
        emberCLI: emberCLIURL,
        year: new Date().getFullYear(),
        yarn: options.yarn,
        welcome: options.welcome,
        blueprint: 'addon',
      };
    });

  }

  // TODO: Rename gitignore and npmignore to dot-files

};
