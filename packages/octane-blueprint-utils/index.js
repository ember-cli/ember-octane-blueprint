'use strict';

const got = require('got');

function getEmberCLIVersionFromTarball() {
  // lazy to avoid extra work when not rate-limited
  const tar = require('tar-stream');
  const zlib = require('zlib');

  return new Promise((resolve, reject) => {
    let version;
    let extract = tar.extract();
    extract.on('entry', function(header, stream, next) {
      let isRoot = header.name.indexOf('/') === header.name.length - 1;
      if (isRoot) {
        version = header.name.split('-')[4].slice(0, -1);
      }

      stream.resume();
      stream.on('end', next);
    });

    got
      .stream('http://github.com/ember-cli/ember-cli/tarball/master')
      .pipe(zlib.createGunzip())
      .pipe(extract)
      .on('error', (reason) => {
        reject(reason);
      })
      .on('finish', () => {
        if (version === undefined) {
          reject(new Error('tarball was malformed'));
        } else {
          resolve(version);
        }
      });
  });
}

function getEmberCLIVersion() {
  return got(
    `https://api.github.com/repos/ember-cli/ember-cli/git/refs/heads/master`,
    { json: true },
  )
    .then(result => {
      return result.body.object.sha;
    })
    .catch(result => {
      if (result.statusCode === 403 && result.headers['x-ratelimit-remaining'] === '0') {
        return getEmberCLIVersionFromTarball();
      }

      throw error;
    })
  .then(version => `github:ember-cli/ember-cli#${version}`);
}

module.exports = {
  getEmberCLIVersion
};
