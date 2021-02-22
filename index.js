const core = require('@actions/core');
const request = require('request');
const sslRootCAs = require('ssl-root-cas/latest')
const rootCas = require('ssl-root-cas/latest').create();

// default for all https requests
// (whether using https directly, request, or another module)

try {
  require('https').globalAgent.options.ca = rootCas;
  sslRootCAs.inject()
  const jenkinsUrl = core.getInput('jenkinsUrl');
  const username = core.getInput('username');
  const token = core.getInput('token');
  const jobName = core.getInput('job');
  const params = JSON.parse( core.getInput('params'));

  request.post({baseUrl: jenkinsUrl
    , uri: 'job/' + jobName + '/buildWithParameters'
    , qs: params})
    .auth(username,token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}

