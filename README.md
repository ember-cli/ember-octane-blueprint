Octane Blueprints
==============================================================================
[![Build Status](https://travis-ci.org/ember-cli/ember-octane-blueprint.svg?branch=master)](https://travis-ci.org/ember-cli/ember-octane-blueprint)

[![App](https://img.shields.io/npm/v/@ember/octane-app-blueprint.svg?label=App)](https://www.npmjs.com/package/@ember/octane-app-blueprint)
[![Addon](https://img.shields.io/npm/v/@ember/octane-addon-blueprint.svg?label=Addon)](https://www.npmjs.com/package/@ember/octane-addon-blueprint)


New Projects

```bash
# Apps
ember new my-app -b @ember/octane-app-blueprint

# Addons
ember addon my-addon -b @ember/octane-addon-blueprint
```

Existing Projects

```bash
# Apps
ember init -b @ember/octane-app-blueprint

# Addons
???
```


Included:

 - Glimmer Components
 - Native Decorators
 - Tracked Properties
 - ember-auto-import
 - no jquery

### Glimmer Component Example

```app/components/counter/component.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HolaComponent extends Component {
  @tracked count = 0;

  @action increment() {
    this.count++;
  }

  @action decrement() {
    this.count--;
  }
}

```

```app/components/counter/template.hbs

Count: {{this.count}}
<br/>
<button {{on 'click' this.increment}}>Click to increase</button>
<button {{on 'click' this.decrement}}>Click to decrease</button>

```


## Building/Contributing:
```bash
# Clone repo
git clone git@github.com:ember-cli/ember-octane-blueprint.git

# Install dependecies
cd ember-octane-blueprint/packages/\@ember/octane-app-blueprint
yarn install

cd ../octane-addon-blueprint
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
