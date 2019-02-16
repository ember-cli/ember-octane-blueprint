#!/bin/bash
#
# -e - fails the script if any command errors
#
set -e

npm install -g ember

ember addon my-addon -b $ADDON_PATH

