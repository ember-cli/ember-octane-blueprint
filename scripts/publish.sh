#!/bin/bash

app_path="packages/@ember/octane-app-blueprint"
addon_path="packages/@ember/octane-app-blueprint"

# Publish App Blueprint
( cd $app_path && yarn build && npm publish )

# Publish Addon Blueprint