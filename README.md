Octane Blueprints
==============================================================================
[![Build Status](https://travis-ci.org/ember-cli/ember-octane-blueprint.svg?branch=master)](https://travis-ci.org/ember-cli/ember-octane-blueprint)

[![App](https://img.shields.io/npm/v/ember-octane-app-blueprint.svg?label=App)](https://www.npmjs.com/package/ember-octane-app-blueprint)
[![Addon](https://img.shields.io/npm/v/ember-octane-addon-blueprint.svg?label=Addon)](https://www.npmjs.com/package/ember-octane-addon-blueprint)


Pre-Official ember packages:

```bash
# Apps
ember new my-app -b ember-octane-app-blueprint

# Addons
ember addon my-addon -b ember-octane-addon-blueprint
```

Official ember packages (these do not exist yet)
```bash
# Apps
ember new my-app -b @ember/octane-app-blueprint

# Addons
ember addon my-addon -b @ember/octane-addon-blueprint
```


Included:

 - Module Unification
 - Glimmer Components
 - Native Decorators
 - Tracked Properties
 - ember-auto-import
 - no jquery

### Glimmer Component Example

```src/ui/components/counter/component.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class HolaComponent extends Component {
  @tracked count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

```

```src/ui/components/counter/template.hbs

Count: {{this.count}}
<br/>
<button {{action this.increment}}>Click to increase</button>
<button {{action this.decrement}}>Click to decrease</button>

```


## Building/Contributing:
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
ember new my-app -b $pathToBlueprintRepo/ember-octane-blueprint/packages/\@ember/octane-app-blueprint

# Create octane addon using the local blueprint
ember addon my-addon -b $pathToBlueprintRepo/ember-octane-blueprint/packages/\@ember/octane-addon-blueprint

```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
