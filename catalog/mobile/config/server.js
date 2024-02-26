/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack.config.js');

const app = express();
const compiler = webpack(config);
const instance = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(instance);

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Mobile theme listening on port 3000!\n');
});
