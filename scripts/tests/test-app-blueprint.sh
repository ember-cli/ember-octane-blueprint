#!/bin/bash
#
# -e - fails the script if any command errors
#
set -e

source ./scripts/tests/-helpers.sh

name="my-app"

requireVar "APP_PATH"
rm -rf $name

setup $APP_PATH

npx ember-cli new $name -b "./$APP_PATH" --verbose

assertPath "$name/app"

( cd $name && npm run lint:js && npm run lint:hbs && npm run test )
