'use strict';
const APP_NAME = 'main';

const bundles = rootRequire('./config').bundles;
const createState = rootRequire('./util/create-state');

function template (req) {
  return createState(req.session).then(page);
}

function page (initialState) {
  return `
  <!doctype html>
  <html ng-app="${APP_NAME}" ng-strict-di lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AllDebrid Better Frontend</title>
    <meta name="description" content="">
    <link rel="shortcut icon" type="image/x-icon" href="//cdn.alldebrid.com/lib/images/default/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${bundles.css.common}">
    <link rel="stylesheet" href="${bundles.css[APP_NAME]}">
    <base href="/">
  </head>
  <body>
    <div id="container" ui-view></div>
    <script>window.STATE_FROM_SERVER = ${JSON.stringify(initialState)}</script>
    <script src="${bundles.js.common}"></script>
    <script src="${bundles.js[APP_NAME]}"></script>
  </body>
  </html>`;
}

module.exports = template;
