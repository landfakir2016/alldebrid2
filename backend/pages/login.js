'use strict';
const bundles = require('../config').bundles;
const createState = require('../util/create-state');

module.exports = template;

function template (req, res) {
  const initialState = createState(req.session);

  const page = `
  <!doctype html>
  <html ng-app="login" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AllDebrid Better Frontend</title>
    <meta name="description" content="">
    <link rel="shortcut icon" type="image/x-icon" href="//cdn.alldebrid.com/lib/images/default/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${bundles.style}">
  </head>
  <body>
    <div id="container" ui-view></div>
    <script>window.STATE_FROM_SERVER = ${JSON.stringify(initialState)}</script>
    <script src="${bundles.vendor}"></script>
    <script src="${bundles.login}"></script>
  </body>
  </html>`;

  res.send(page);
}