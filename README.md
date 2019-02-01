Octane Blueprints
==============================================================================

Pre-Official ember packages:

```bash
# Apps
ember new my-app -b ember-octane-app-blueprint
```

Official ember packages (these do not exist yet)
```bash
# Apps
ember new my-app -b @ember/octane-app

# Addons
ember new my-app -b @ember/octane-blueprint
```


Building/Contributing:
```bash
# Clone repo
git clone git@github.com:ember-cli/ember-octane-blueprint.git

# Install dependecies
cd ember-octane-blueprint/packages/\@ember/octane-app-blueprint
yarn install

cd ../octane-app-blueprint
yarn install

# Move to the desired folder to create your octane app or addon

cd ~

# Create octane app using the local blueprint
ember new my-app -b PATH/ember-octane-blueprint/packages/\@ember/octane-app-blueprint

# Create octane addon using the local blueprint
ember addon my-addon -b PATH/ember-octane-blueprint/packages/\@ember/octane-addon-blueprint

```

Included:

 - Module Unification
 - Sparkles Components (eventually Glimmer, but built in)
 - ember-decorators (eventually will be built in)
 - ember-auto-import
 - sample component and route
 - no jquery


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
