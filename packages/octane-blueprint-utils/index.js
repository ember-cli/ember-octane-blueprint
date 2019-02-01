'use strict';

const got = require('got');

function getRepoCommitVersion(owner, repo, branch = 'master') {
  return got(
    `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
    {
      headers: {Accept: 'application/vnd.github.VERSION.sha'},
    },
  ).then(result => `github:${owner}/${repo}#${result.body}`);
}

module.exports = {
  getRepoCommitVersion: getRepoCommitVersion,
};
