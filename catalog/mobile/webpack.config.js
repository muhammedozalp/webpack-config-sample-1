/* eslint-disable prefer-destructuring */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const purgecss = require('@fullhuman/postcss-purgecss');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { alias, assets, outputPaths } = require('./config/settings.paths.js');
const { configureBabelLoader, browserslist, devtool, hasBundlestats, hasReport, isLive, mode, isWatching, isEslintActive } = require('./config/settings.webpack.js');
const { configureBundleAnalyzeReport, configureBundleStatsReport } = require('./config/settings.analyzers.js');

const manifestOptions = {
    fileName: 'webpack-manifest.json'
};

const beforeCompilationRemoveAssetsMobileFolder = [
    {
        source: assets.outputDirRelativePath,
        options: { force: true }
    }
];

const setOptimization = (keepFuncNames = false) => ({
    usedExports: true,

    splitChunks: {
        cacheGroups: {
            commonutils: {
                name: 'common-utils',
                test: /[\\/]src[\\/]util[\\/]/,
                chunks: 'all',
                priority: 1,
                minSize: 0,
                enforce: true
            },
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2,
                minSize: mode === 'production' ? (50 * 1024) : (300 * 1024)
            },
            sentry: {
                name: 'sentry',
                test: /[\\/]node_modules[\\/](@sentry)[\\/]/,
                chunks: 'initial',
                priority: 1
            },
            vendors: {
                name: 'vendors',
                test: /[\\/]node_modules[\\/](bootstrap|axios|swiper|dom7)[\\/]/,
                chunks: 'initial',
                priority: 1
            }
        },
    },
    minimize: mode !== 'development',
    minimizer: [
        new TerserPlugin({
            extractComments: {
                condition: true,
                filename: 'ALL.LICENSE.txt',
                banner: (licenseFile) => `License information can be found in ${licenseFile}`
            },
            terserOptions: {
                sourceMap: mode !== 'production',
                compress: mode !== 'development',
                mangle: mode !== 'development',
                keep_fnames: keepFuncNames
            }
        }),
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    { discardComments: { removeAll: true } }
                ]
            }
        })
    ]
});

const performance = {
    hints: 'warning',
    maxEntrypointSize: 100 * 1024, // 100 KiB
    maxAssetSize: 100 * 1024 // 100 KiB
};

const rulesFont = {
    test: /\.(eot|ttf|woff|woff2)$/i,
    type: 'asset/resource',
    generator: {
        filename: () => 'css/fonts/[name].[contenthash][ext]',
        publicPath: outputPaths.publicPath
    }
};

const rulesImage = {
    test: /\.(png|jpg|jpeg|gif|svg)$/i,
    type: 'asset/resource',
    generator: {
        filename: () => 'img/[name].[contenthash][ext]',
        publicPath: outputPaths.publicPath
    }
};

const setPostcssPlugins = () => {
    const plugins = [
        [
            'postcss-preset-env',
            {
                browsers: browserslist.legacyBrowsers
            }
        ]
    ];

    if (mode === 'production' && !isWatching) {
        plugins.push(
            purgecss({
                content: ['./src/**/*.twig', './src/template/**/*.scss', './src/**/*.js'],
                css: ['./src/library/**/*.scss', './src/library/**/*.js', './src/template/**/*.scss'],
                safelist: [/swiper/]
            })
        );
    }

    return plugins;
};

const rulesScss = {
    test: /\.scss$/i,
    exclude: /node_modules/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: { emit: true }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 2
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                postcssOptions: {
                    plugins: setPostcssPlugins()
                }
            }
        },
        {
            loader: 'sass-loader',
            options: {
                // NOTE: Prefering `dart-sass`
                implementation: require.resolve('sass'),
                sourceMap: true,
                sassOptions: {
                    outputStyle: mode === 'development' ? 'expanded' : 'compressed'
                }
            }
        }
    ]
};

const baseConfig = (configType) => ({
    mode,
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        main: path.resolve(__dirname, './src/template/sample.js'),
        landing: path.resolve(__dirname, './src/template/sample.js'),
        checkout: path.resolve(__dirname, './src/template/sample.js'),

        'account-account': path.resolve(__dirname, './src/sample.js'),
        'account-language-currency': path.resolve(__dirname, './src/template/sample.js'),

        'checkout-delivery': path.resolve(__dirname, './src/template/sample.js'),
        'checkout-guest-address': path.resolve(__dirname, './src/template/checkout/sample.js'),

        'common-home': path.resolve(__dirname, './src/sample.js'),
        'message-form': path.resolve(__dirname, './src/sample.js'),

        'product-campaigns': path.resolve(__dirname, './src/sample.js'),
        'product-category-main': path.resolve(__dirname, './src/sample.js'),
        'product-detail': path.resolve(__dirname, './src/template/sample.js'),

        'module-approved-review': path.resolve(__dirname, './src/template/sample.js'),

        'product-bestseller-ten-year': path.resolve(__dirname, './src/sample.js'),
    },
    cache: isWatching === true ? {
        type: 'filesystem',
        allowCollectingMemory: true,
    } : false,
    devtool,
    module: {
        rules: [
            configureBabelLoader(configType)
        ]
    },
    plugins: [
        new WebpackManifestPlugin(manifestOptions),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(outputPaths.runtimePublicPath),
            DEVELOPMENT: JSON.stringify(mode !== 'production'),
            ISLIVE: JSON.stringify(isLive)
        })
    ],
    output: {
        iife: configType !== 'legacy',
        environment: {
            arrowFunction: configType !== 'legacy'
        },
        chunkFilename: outputPaths.chunkFilename,
        filename: outputPaths.filename,
        path: outputPaths.path,
        publicPath: outputPaths.publicPath
    },
    performance,
    resolve: {
        alias
    }
});

const appLegacyConfig = merge(baseConfig('legacy'), {
    name: 'appLegacyConfig',
    optimization: setOptimization(mode !== 'production'),
    plugins: [
        new Dotenv({
            path: '../../../../.env'
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: beforeCompilationRemoveAssetsMobileFolder
                }
            },
            runOnceInWatchMode: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css'
        })
    ],
    module: {
        rules: [
            rulesFont,
            rulesImage,
            rulesScss
        ]
    }
});

if (mode === 'development' && isEslintActive) {
    appLegacyConfig.plugins.push(new ESLintPlugin());
}

if (hasReport) {
    configureBundleAnalyzeReport(appLegacyConfig);
} else if (hasBundlestats) {
    configureBundleStatsReport(appLegacyConfig);
}

module.exports = appLegacyConfig;
