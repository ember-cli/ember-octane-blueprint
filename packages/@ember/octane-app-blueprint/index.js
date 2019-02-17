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
        {name: '@ember-decorators/babel-transforms'},
        {name: 'ember-data'},
        // {
        //   // TODO: To be (partially) replaced by
        //   //       https://github.com/emberjs/rfcs/pull/388
        //   // TODO: not added, because there isn't a way to specify an unpublished version
        //   name: 'ember-composable-helpers#13aa3b5c026f062c9a5ac234c5354e0100a9ba61',
        //   // https://github.com/DockYard/ember-composable-helpers/commit/13aa3b5c026f062c9a5ac234c5354e0100a9ba61
        // },
        {
          // TODO: remove when native importing is supported
          name: 'ember-auto-import'
        },
        // {
        //   // TODO: unsure if officially should be a part of the bundle,
        //   //       visit /_analyze after startember-cli-bundle-analyzering the app
        //   name: 'ember-cli-bundle-analyzer'
        // }
      ]
    });
  }
};
