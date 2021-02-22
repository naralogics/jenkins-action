const core = require('@actions/core');
const request = require('request');
const sslRootCAs = require('ssl-root-cas')
sslRootCAs.inject()
const rootCas = require('ssl-root-cas').create();
const fs = require('fs');
const https = require('https');
https.globalAgent.options.ca = fs.readFileSync('./node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem');
// default for all https requests
// (whether using https directly, request, or another module)

try {
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

