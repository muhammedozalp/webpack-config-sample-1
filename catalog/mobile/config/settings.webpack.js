/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */

const mobileWebpackPkg = require('../package.json');

const isBabelDebugging = process.argv.includes('has_debug');
const hasReport = process.argv.includes('has_report');
const hasSourcemap = process.argv.includes('has_sourcemap');
const hasBundlestats = process.argv.includes('has_bundlestats');
const isLive = process.argv.includes('has_live');
const mode = process.argv.includes('production') ? 'production' : 'development';
const isWatching = process.argv.includes('isWatching');
const isEslintActive = process.argv.includes('eslint');
const browserslist = mobileWebpackPkg.browserslist;

const configureBabelLoader = (configType) => {
    let browserList = '';
    let babelPlugins = '';

    if (configType === 'legacy') {
        browserList = browserslist.legacyBrowsers;
        /**
         * NOTE
         * This plugin is included in @babel/preset-env, in ES2020
         * https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
         */
        babelPlugins = '@babel/plugin-syntax-dynamic-import';
    } else {
        browserList = browserslist.modernBrowsers;
    }

    const babelConfigs = {
        test: /\.js$/,
        exclude: [
            /node_modules/
        ],
        use: {
            loader: 'babel-loader',
            options: {
                /**
                 * NOTE:
                 * sourceType: 'unambiguous',
                 * option is preventing debug: true to work properly
                 */
                // sourceType: 'unambiguous',
                plugins: [],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            corejs: {
                                version: '3.26.1',
                                proposals: true
                            },
                            useBuiltIns: 'usage',
                            targets: {
                                browsers: browserList
                            },
                            debug: isBabelDebugging
                        }
                    ]
                ]
            }
        }
    };

    if (configType === 'legacy') {
        babelConfigs.use.options.plugins.push(babelPlugins);
    }

    return babelConfigs;
};

let devtool = '';
if (isBabelDebugging && mode === 'development') {
    devtool = false;
} else if (hasSourcemap || mode === 'development') {
    devtool = 'source-map';
} else {
    devtool = false;
}

let statsDev = 'none';
let statsProd = 'none';

if (isBabelDebugging) {
    statsDev = {
        colors: true,
        preset: 'detailed',
        reasons: true
    };
    statsProd = {
        colors: true,
        preset: 'detailed',
        reasons: true
    };
} else {
    statsDev = {
        colors: true,
        preset: 'normal',
        reasons: true
    };
    statsProd = 'summary';
}

const stats = mode === 'development' ? statsDev : statsProd;

const configs = {
    name: 'sample Mobil',
    copyright: 'sample, Inc.',
    configureBabelLoader,
    browserslist,
    devtool,
    hasBundlestats,
    hasReport,
    isLive,
    mode,
    statistics: stats,
    isWatching,
    isEslintActive
};

if (mode === 'development' || isWatching) {
    const { info, successBg } = require('./settings.logs.js');

    successBg('CHECKING PACKAGE.JSON SCRIPTS ARGVS');

    process.argv.forEach((val, index) => {
        info(`\t process.argv ${index}\t : ${val}`);
    });
}

module.exports = configs;
