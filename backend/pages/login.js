'use strict';
require('./_init'); // babel & css
const bundles = require('../config').bundles;

// server deps
const freshReq = require('../util/fresh-require').createFreshRequire;
const renderView = require('../util/render-view');
const reqApp = freshReq('../../shared/apps/login/');

// client deps
const React = require('react');
const Provider = require('react-redux').Provider;
const renderToString = require('react-dom/server').renderToString;

module.exports = renderView(template);

function template (store) {
  const Login = reqApp().default;
  const initialState = store.getState();
  console.log('initialState', initialState);

  const html = renderToString(
    React.createElement(Provider, { store },
      React.createElement(Login)
    )
  );

  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AllDebrid Better Frontend</title>
    <meta name="description" content="">
    <link rel="shortcut icon" type="image/x-icon" href="//cdn.alldebrid.com/lib/images/default/favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="stylesheet" href="/<< rev['style.css'] >>"> -->
  </head>
  <body>
    <div id="container">${html}</div>
    <script>window.STATE_FROM_SERVER = ${JSON.stringify(initialState)}</script>
    <script src="${bundles.vendor}"></script>
    <script src="${bundles.login}"></script>
  </body>
  </html>`;
}
