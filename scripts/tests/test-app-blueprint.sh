#!/bin/bash
#
# -e - fails the script if any command errors
#
set -e

source ./scripts/tests/-helpers.sh

name="my-app"

requireVar "APP_PATH"

rm -rf $name

npx ember-cli new $name -b $APP_PATH

assertPath "$name/src"