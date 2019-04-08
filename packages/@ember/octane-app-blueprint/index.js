'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getRepoVersion = require('octane-blueprint-utils').getRepoVersion;

module.exports = {
  description: 'Generates an Ember Octane application.',
  // name: '@ember/octane-app-blueprint',
  name: '@ember/octane-app-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      getRepoVersion('ember-cli', 'ember-cli'),
      getRepoVersion('emberjs', 'data'),
      getURLFor('canary')
    ]).then(([emberCLIURL, emberDataURL, emberURL]) => {
      let name = stringUtil.dasherize(options.entity.name);
      let entity = options.entity;
      let rawName = entity.name;
      let namespace = stringUtil.classify(rawName);

      // temporarily pinning ember-data see tracking issue for details:
      // https://github.com/ember-cli/ember-octane-blueprint/issues/95 to
      emberDataURL = 'github:emberjs/data#1df833396855d956b817540923dd89338463fec2';

      return {
        name,
        modulePrefix: name,
        namespace,
        yarn: options.yarn,
        welcome: options.welcome,
        emberCanaryVersion: emberURL,
        emberData: emberDataURL,
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
