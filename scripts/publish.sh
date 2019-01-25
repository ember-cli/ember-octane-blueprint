#!/bin/bash

app_path="packages/@ember/octane-app-blueprint"
addon_path="packages/@ember/octane-app-blueprint"

# https://github.com/npm/npm/issues/7042#issuecomment-186300168

echo "//registry.npmjs.org/:_password=${NPM_PASSWORD}" > ~/.npmrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
echo "//registry.npmjs.org/:_authToken=${NPM_USERNAME}" >> ~/.npmrc
echo "//registry.npmjs.org/:_authToken=${NPM_EMAIL}" >> ~/.npmrc

# Publish App Blueprint
cp README.md $app_path/README.md
( cd $app_path && yarn build && npm publish )


# Publish Addon Blueprint
