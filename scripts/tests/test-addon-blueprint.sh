#!/bin/bash
#
# -e - fails the script if any command errors
#
set -e

source ./scripts/tests/-helpers.sh

name="my-addon"

requireVar "ADDON_PATH"
rm -rf $name

setup $ADDON_PATH

npx ember-cli addon $name -b "./$ADDON_PATH" --verbose

assertPath "$name/src"