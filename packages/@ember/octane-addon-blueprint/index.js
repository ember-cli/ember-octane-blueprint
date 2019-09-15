'use strict';

const latestVersion = require('latest-version');
const stringUtil = require('ember-cli-string-utils');
const getRepoVersion = require('octane-blueprint-utils').getRepoVersion;
const getChannelURL = require('ember-source-channel-url');

module.exports = {
  description: 'Generates an Ember Octane addon.',
  name: '@ember/octane-addon-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      latestVersion('ember-cli', {version: 'beta'}),
      getRepoVersion('ember-cli', 'ember-cli-htmlbars', 'colocation'),
      getChannelURL('beta')
    ]).then(([emberCLI, emberCLIHTMLBars, emberSource]) => {
      let entity = { name: 'dummy' };
      let rawName = entity.name;
      let name = stringUtil.dasherize(rawName);
      let namespace = stringUtil.classify(rawName);

      let addonEntity = options.entity;
      let addonRawName = addonEntity.name;
      let addonName = stringUtil.dasherize(addonRawName);
      let addonNamespace = stringUtil.classify(addonRawName);

      return {
        name,
        modulePrefix: name,
        namespace,
        addonName,
        addonNamespace,
        emberSourceVersion: emberSource,
        emberCLI,
        emberCLIHTMLBars,
        year: new Date().getFullYear(),
        yarn: options.yarn,
        welcome: options.welcome,
        blueprint: 'addon',
      };
    });

  },

  mapFile() {
    let result = this._super.mapFile.apply(this, arguments);
    if (result === 'npmignore') {
      return '.npmignore';
    }
    return result;
  },

};
