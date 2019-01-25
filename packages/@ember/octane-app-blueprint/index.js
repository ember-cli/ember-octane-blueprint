'use strict';

const dasherize = require('ember-cli-string-utils').dasherize;
const classify = require('ember-cli-string-utils').classify;

module.exports = {
  description: 'Generates an Ember Octane application.',
  // name: '@ember/octane-app-blueprint',
  name: 'ember-octane-app-blueprint',

  filesToRemove: [],

  locals(options) {
    let name = dasherize(options.entity.name);
    let blueprintVersion = require('./package').version;

    let entity = options.entity;
    let rawName = entity.name;
    let namespace = classify(rawName);

    return {
      name,
      modulePrefix: name,
      namespace,
      yarn: true,
      welcome: false,
      blueprintVersion,
      versions: {
        emberCLI: 'github:ember-cli/ember-cli#d577278e0174ca091c1e8fc0a3995cf92f6943d4',
        ember: this.emberCanaryUrlForVersion('7666b706522bc486499761d5ef37679be2f45052'),
        emberData: '~3.5.0',
      }
    };
  },

  emberCanaryUrlForVersion(version) {
    return `https://s3.amazonaws.com/builds.emberjs.com/canary/shas/${version}.tgz`
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
          // Yet to be submitted
          name: 'ember-decorators',
          target: '3.0.0',
        },
        {
          // TODO: To be replaced by built-in glimmer components
          //       https://github.com/emberjs/rfcs/pull/338
          name: 'sparkles-component'
        },
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
