import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */


 moduleConfig.types = Object.assign(moduleConfig.types, {
   // TODO: why did emberclear add this to main collection?
   //       the existing config
   //       https://github.com/ember-cli/ember-resolver/blob/master/mu-trees/addon/ember-config.js#L17
   //       specifies the config 'definitiveCollection'
  'config': { definitiveCollection: 'main' },
  // TODO: add these to the default ember-config in ember-resolver
  'util': { definitiveCollection: 'utils' },
  // TODO: remove when addons can add collections and types themselves
  //       and when sparkles-component specifies this.
  //       OR, remove when glimmer components land
  'component-manager': { definitiveCollection: 'main' },
 });

export default Resolver.extend({
  config: moduleConfig
});
