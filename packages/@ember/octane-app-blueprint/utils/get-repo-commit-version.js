'use strict';

const got = require('got');

module.exports = function(owner, repo, branch = 'master') {
  return got(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`, {
    headers: {Accept: 'application/vnd.github.VERSION.sha'},
  }).then(result => `github:${owner}/${repo}#${result.body}`);
};
