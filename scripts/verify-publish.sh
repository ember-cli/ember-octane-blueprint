#!/bin/bash
#
# -e aborts script if any command fails
set -e

project=$1
project_path="packages/$project"

cd $project_path

package_name=$(cat package.json | jq -r '.name')
package_version=$(cat package.json | jq -r '.version')

published_version=$(npm info $package_name version)

if [ $package_version == $published_version ]; then
  echo "Current package version matches published version: $package_version"
  exit 0
else
  echo "Current package version is:   $package_version"
  echo "Current published version is: $published_version"
  echo ""
  echo "These do not match. Deploy / Publish Failed!"
  exit 1
fi