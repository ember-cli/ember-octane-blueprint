#!/bin/bash
#
# -e - fails the script if any command errors
#
set -e

npm install -g ember

ember new my-app -b $APP_PATH

