# How To Contribute

## Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

## Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

## Running tests

```
#!/bin/bash
set -a
source scripts/tests/-local-dev.sh 
./scripts/tests/test-app-blueprint.sh
./scripts/tests/test-addon-blueprint.sh
```
