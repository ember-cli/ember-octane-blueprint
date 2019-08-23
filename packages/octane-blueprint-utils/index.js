'use strict';

const got = require('got');

function getRepoVersionFromTarball(org, repo, branch = 'master') {
  // lazy to avoid extra work when not rate-limited
  const tar = require('tar-stream');
  const zlib = require('zlib');

  return new Promise((resolve, reject) => {
    let version;
    let extract = tar.extract();
    extract.on('entry', function(header, stream, next) {
      let isRoot = header.name.indexOf('/') === header.name.length - 1;
      if (isRoot) {
        let parts = header.name.split('-');

        // examples:
        //   emberjs-data-sha123456abcd/
        //   ember-cli-ember-cli-sha123456abcd/
        version = parts[parts.length - 1].slice(0, -1);
      }

      stream.resume();
      stream.on('end', next);
    });

    got
      .stream(`http://github.com/${org}/${repo}/tarball/${branch}`)
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

function getRepoVersion(org, repo, branch = 'master') {
  return got(
    `https://api.github.com/repos/${org}/${repo}/git/refs/heads/${branch}`,
    { json: true },
  )
    .then(result => {
      return result.body.object.sha;
    })
    .catch(result => {
      if (result.statusCode === 403 && result.headers['x-ratelimit-remaining'] === '0') {
        return getRepoVersionFromTarball(org, repo, branch);
      }

      throw result;
    })
  .then(version => `github:${org}/${repo}#${version}`);
}

module.exports = {
  getRepoVersion
};
