#!/bin/bash
#
# bumps the version of the blueprint packages
#
# $1 - major | minor | patch
#      (really just whatever you can pass to `npm version`)

# exit if any command fails
set -e

if [ -z "$1" ]
  then
    echo "No argument supplied. Specify either 'major', 'minor', or 'patch'"
    exit 1
fi

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

firstPackage=${packages[0]}
nextVersion=$(cat $firstPackage/package.json | jq -r ".version")

# TODO: also update changelog?

echo "Comitting bump to $nextVersion"

git commit -am"Bump version to $nextVersion"

echo "Tagging v$nextVersion"

git tag "v$nextVersion"

git push origin master --tags
