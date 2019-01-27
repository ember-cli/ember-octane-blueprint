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
      yarn: options.yarn,
      welcome: options.welcome,
      blueprintVersion,
      versions: {
        emberCLI: 'github:ember-cli/ember-cli#31ed51040c51e6d47c9fc3bb860f46108feefea2',
        ember: this.emberCanaryUrlForVersion('c24bc23e4139c90c8d8d96c4234d9c0c19e5c594'),
        emberData: '~3.7.0',
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
          name: 'ember-decorators',
          target: '5.1.2',
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
