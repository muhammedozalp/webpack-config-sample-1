/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
require('dotenv').config({
    path: path.resolve('../../../../../.env')
});

const defaultOutputFolder = '../../../../../../assets/default';
const mode = process.argv.includes('production') ? 'production' : 'development';

let assetsBaseUrl = '';
if (process.env.CDN_ENABLED === 'true') {
    assetsBaseUrl = `${process.env.CDN_SERVER}default/`;
} else if (process.env.APP_ENV === 'production') {
    assetsBaseUrl = `${process.env.PRODUCTION_BASE_URL}assets/default/`;
} else {
    assetsBaseUrl = `${process.env.HTTP_CATALOG}assets/default/`;
}

const paths = {
    assets: {
        baseUrl: assetsBaseUrl,
        default: path.resolve(__dirname, `${defaultOutputFolder}`),
        css: path.resolve(__dirname, `${defaultOutputFolder}/css`),
        js: path.resolve(__dirname, `${defaultOutputFolder}/js`),
        img: path.resolve(__dirname, `${defaultOutputFolder}/img`)
    },

    src: {
        js: path.resolve(__dirname, '../src/js'),
        img: path.resolve(__dirname, '../src/img'),
        scss: path.resolve(__dirname, '../src/scss'),
        reportPath: path.resolve(__dirname, `../bundle_analysis/${mode}`)
    },

    watch: {
        app: path.resolve(__dirname, '../src/js/app/**/*'),
        common: path.resolve(__dirname, '../src/js/common/**/*'),
        indexDomready: path.resolve(__dirname, '../src/js/index-domready.js'),
        indexPreload: path.resolve(__dirname, '../src/js/index-preload.js'),
        intlTelInput: path.resolve(__dirname, '../src/js/library/intl_tel_input/**/*'),
        library: [
            path.resolve(__dirname, '../src/scss/**/*'),
            path.resolve(__dirname, '../src/js/library/jquery/**/*'),
            path.resolve(__dirname, '../src/js/library/magiczoom/**/*'),
            path.resolve(__dirname, '../src/js/library/swiper/**/*')
        ],
        pages: path.resolve(__dirname, '../src/js/pages/**/*'),
        partial: path.resolve(__dirname, '../src/js/partial/**/*'),
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
