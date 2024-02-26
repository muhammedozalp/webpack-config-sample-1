const path = require('path');
require('dotenv').config({
    path: path.resolve('../../../../.env')
});

const mobileOutputFolder = '../../../../../assets/mobile';
const mode = process.argv.includes('production') ? 'production' : 'development';

let assetsBaseUrl = '';
let publicPath = '';
let runtimePublicPath = '';
if (process.env.CDN_ENABLED === 'true') {
    assetsBaseUrl = `${process.env.CDN_SERVER}mobile/`;

    if (process.env.APP_ENV === 'local') {
        runtimePublicPath = 'https://asset.sample.com/mobile/';
    } else {
        runtimePublicPath = assetsBaseUrl;
    }
    publicPath = '';
} else if (process.env.APP_ENV === 'local') {
    assetsBaseUrl = `http://${process.env.CATALOG_BASE_URL}assets/mobile/`;
    publicPath = '';
    runtimePublicPath = assetsBaseUrl;
} else if (process.env.APP_ENV === 'prod') {
    assetsBaseUrl = `${process.env.PRODUCTION_BASE_URL}assets/mobile/`;
    publicPath = assetsBaseUrl;
    runtimePublicPath = assetsBaseUrl;
}

const paths = {
    alias: {
        Root: path.resolve(__dirname, '../src/'),
        Components: path.resolve(__dirname, '../src/template/components/'),
        Library: path.resolve(__dirname, '../src/library/'),
        Template: path.resolve(__dirname, '../src/template/'),
        Layout: path.resolve(__dirname, '../src/template/layout/'),
        ProductDetailPartials: path.resolve(__dirname, '../src/template/product/product_detail/partials'),
        Util: path.resolve(__dirname, '../src/util/')
    },
    assets: {
        outputDirAbsoluteUrl: assetsBaseUrl,
        outputDirRelativePath: path.resolve(__dirname, `${mobileOutputFolder}`),
        css: path.resolve(__dirname, `${mobileOutputFolder}/css`),
        js: path.resolve(__dirname, `${mobileOutputFolder}/js`),
        img: path.resolve(__dirname, `${mobileOutputFolder}/img`)
    },
    outputPaths: {
        chunkFilename: 'js/[name]-[chunkhash].js',
        filename: 'js/[name]-[contenthash].js',
        path: path.resolve(__dirname, `${mobileOutputFolder}`),
        publicPath,
        runtimePublicPath
    },
    src: {
        root: path.resolve(__dirname, '../src'),
        img: path.resolve(__dirname, '../src/img'),
        reportPath: path.resolve(__dirname, `../bundle_analysis/${mode}`)
    },
    watch: {
        mobileRoot: path.resolve(__dirname, './src/**/*')
    }
};

const isWatching = process.argv.includes('isWatching');

if (mode === 'development' || isWatching) {
    // eslint-disable-next-line global-require
    const { info, successBg } = require('./settings.logs.js');

    successBg('CHECKING .ENV VALUES AND BASE URL');
    info(`\t appEnv\t\t : ${process.env.APP_ENV}
    \t isCdnEnabled\t : ${process.env.CDN_ENABLED}
    \t urlCdn\t\t : ${process.env.CDN_SERVER}
    \t urlProduction\t : ${process.env.PRODUCTION_BASE_URL}
    \t urlLocal\t : ${process.env.CATALOG_BASE_URL}
    \t assetsBaseUrl\t : ${assetsBaseUrl}
    `);
}

module.exports = paths;
