#!/bin/bash
#
# bumps the version of the blueprint packages
#
# $1 - major | minor | patch 
#      (really just whatever you can pass to `npm version`)

versionIncrement=$1
packages=( "packages/@ember/octane-app-blueprint" "packages/@ember/octane-addon-blueprint" )

for var in "${packages[@]}"
do
  echo "Updating version of ${var}..."
  (
      cd $var && \
      npm version  ${versionIncrement}
  )
done