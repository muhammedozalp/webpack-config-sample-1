/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */

const path = require('path');
require('dotenv').config({
    path: path.resolve('../../../../../.env')
});
const desktopWebpackPkg = require('../package.json');
require('dotenv').config({
    path: path.resolve('../../../../../.env')
});

const isBabelDebugging = process.argv.includes('has_debug');
const hasReport = process.argv.includes('has_report');
const mode = process.argv.includes('production') ? 'production' : 'development';
const minExt = process.argv.includes('production') ? '.min' : '';
const isWatching = process.argv.includes('isWatching');

const configureBabelLoader = () => {
    const babelConfigs = {
        exclude: [
            /node_modules/
        ],
        include: [
            /**
             * DOCUMENTATION https://webpack.js.org/configuration/module/#condition
             * NOTE
             * babel-loader will transpile only included directory or file
             * // will include any paths
             * relative to the current directory starting with `app/styles`
             * // e.g. `app/styles.css`, `app/styles/styles.css`, `app/stylesheet.css`
             * path.resolve(__dirname, 'app/styles'),
             * // add an extra slash to only include the content of the directory `vendor/styles/`
             * path.join(__dirname, 'vendor/styles/'),
             */
            path.resolve(__dirname, '../src/js/index-preload.js'),
            path.resolve(__dirname, '../src/js/index-domready.js'),
            path.resolve(__dirname, '../src/js/app/'),
            path.resolve(__dirname, '../src/js/component/mainnav/'),
            path.resolve(__dirname, '../src/js/home/'),
            path.resolve(__dirname, '../src/js/library/intl_tel_input/intl-tel-input-17.0.13-custom.js'),
            path.resolve(__dirname, '../src/js/pages/'),
            path.resolve(__dirname, '../src/js/util/')
        ],
        debug: isBabelDebugging
    };

    return babelConfigs;
};

/**
 * NOTE
 * https://webpack.js.org/migrate/5/#using-named-exports-from-json-modules
 * DOCUMENTATION
 * analytics datasına bakılarak
 * sipariş gelen versiyonlar dikkate alındı - Mart 2021
 * versiyonlar her sene güncellenebilir
 */
// eslint-disable-next-line prefer-destructuring
const browserslist = desktopWebpackPkg.browserslist;

const entryPaths = {
    app: {
        app: {
            import: path.resolve(__dirname, '../src/js/app/app.js'),
            filename: `js/app-[contenthash]${minExt}.js`
        }
    },
    common: {
        common: {
            import: path.resolve(__dirname, '../src/js/common/common.js'),
            filename: `js/common-[contenthash]${minExt}.js`
        }
    },
    indexDomreadyLegacy: {
        'index-domready-legacy': {
            import: ['whatwg-fetch', 'element-closest-polyfill', path.resolve(__dirname, '../src/js/index-domready.js')],
            filename: `js/index-domready-legacy-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        }
    },
    indexDomreadyModern: {
        'index-domready-modern': {
            import: path.resolve(__dirname, '../src/js/index-domready.js'),
            filename: `js/index-domready-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        }
    },
    indexPreloadLegacy: {
        'index-preload': {
            import: path.resolve(__dirname, '../src/js/index-preload.js'),
            filename: `js/index-preload-[contenthash]${minExt}.js`
        }
    },
    intlTelInput: {
        'intl-tel-input-style': {
            import: path.resolve(__dirname, '../src/js/library/intl_tel_input/intl-tel-input-17.0.13-custom.scss'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/intl_tel_input/intl-tel-input-[contenthash]${minExt}.css`
        },
        'intl-tel-input-script': {
            import: path.resolve(__dirname, '../src/js/library/intl_tel_input/intl-tel-input-17.0.13-custom.js'),
            filename: `js/library/intl_tel_input/intl-tel-input-[contenthash]${minExt}.js`
        },
        'intl-tel-input-utils': {
            import: path.resolve(__dirname, '../../../../../../node_modules/intl-tel-input/build/js/utils.js'),
            /**
             * FRONTEND TODO
             * [contenthash] eklenecek.
             * intl-tel-input-17.0.13-custom.js de hard code yazılarak kullanıldığı için
             * şimdilik [contenthash] olmadan kullanılmak zorunda
             */
            filename: 'js/library/intl_tel_input/utils-17.0.13.min.js'
        }
    },
    library: {
        'font-awesome': {
            import: path.resolve(__dirname, '../src/scss/library/font_awesome/css/font-awesome-4.7.0.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `css/font_awesome/css/font-awesome-[contenthash]${minExt}.css`,
            isDomreadyAsset: true
        },
        jquery: {
            import: path.resolve(__dirname, '../src/js/library/jquery/jquery-3.5.1.min.js'),
            filename: `js/library/jquery/jquery-[contenthash]${minExt}.js`
        },
        'jquery-autotab': {
            import: path.resolve(__dirname, '../src/js/library/jquery/autotab-1.1b.js'),
            filename: `js/library/jquery/autotab-[contenthash]${minExt}.js`
        },
        'jquery-cookie': {
            import: path.resolve(__dirname, '../src/js/library/jquery/cookie-1.4.1.min.js'),
            filename: `js/library/jquery/cookie-[contenthash]${minExt}.js`
        },
        'jquery-cycle': {
            import: path.resolve(__dirname, '../src/js/library/jquery/cycle-1.0-migrated.js'),
            filename: `js/library/jquery/cycle-[contenthash]${minExt}.js`
        },
        'jquery-dataTables': {
            import: path.resolve(__dirname, '../src/js/library/jquery/dataTables-1.10.7.min.js'),
            filename: `js/library/jquery/dataTables-[contenthash]${minExt}.js`
        },
        'jquery-jbox-style': {
            import: path.resolve(__dirname, '../src/js/library/jquery/jbox/jBox-0.3.2-custom.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/jquery/jbox/jBox-[contenthash]${minExt}.css`,
            isDomreadyAsset: true
        },
        'jquery-jbox-script': {
            import: path.resolve(__dirname, '../src/js/library/jquery/jbox/jBox-0.3.2-migrated.js'),
            filename: `js/library/jquery/jbox/jBox-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        },
        'jquery-jcarousel-style': {
            import: path.resolve(__dirname, '../src/js/library/jquery/jcarousel/jcarousel-0.3.9-custom.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/jquery/jcarousel/jcarousel-[contenthash]${minExt}.css`
        },
        'jquery-jcarousel-script': {
            import: path.resolve(__dirname, '../src/js/library/jquery/jcarousel/jcarousel-0.3.9-migrated.js'),
            filename: `js/library/jquery/jcarousel/jcarousel-[contenthash]${minExt}.js`
        },
        'jquery-rating-style': {
            import: path.resolve(__dirname, '../src/js/library/jquery/rating/rating-4.11-custom.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/jquery/rating/rating-[contenthash]${minExt}.css`,
            isDomreadyAsset: true
        },
        'jquery-rating-script': {
            import: path.resolve(__dirname, '../src/js/library/jquery/rating/rating-4.11.js'),
            filename: `js/library/jquery/rating/rating-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        },
        'jquery-readmore': {
            import: path.resolve(__dirname, '../src/js/library/jquery/readmore-2020.01.23.min.js'),
            filename: `js/library/jquery/readmore-[contenthash]${minExt}.js`
        },
        'jquery-treeview-style': {
            import: path.resolve(__dirname, '../src/js/library/jquery/treeview/treeview-1.5pre-custom.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/jquery/treeview/treeview-[contenthash]${minExt}.css`
        },
        'jquery-treeview-script': {
            import: path.resolve(__dirname, '../src/js/library/jquery/treeview/treeview-1.5pre.js'),
            filename: `js/library/jquery/treeview/treeview-[contenthash]${minExt}.js`
        },
        'jquery-turn': {
            import: path.resolve(__dirname, '../src/js/library/jquery/turn/turn-4.1.0.js'),
            filename: `js/library/jquery/turn/turn-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        },
        'jquery-turn-zoom': {
            import: path.resolve(__dirname, '../src/js/library/jquery/turn/zoom-4.1.0.js'),
            filename: `js/library/jquery/turn/zoom-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        },
        'jquery-ui-style': {
            import: path.resolve(__dirname, '../src/js/library/jquery/ui/jquery-ui-1.12.1.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/jquery/ui/jquery-ui-[contenthash]${minExt}.css`,
            isDomreadyAsset: true
        },
        'jquery-ui-script': {
            import: path.resolve(__dirname, '../src/js/library/jquery/ui/jquery-ui-1.12.1.js'),
            filename: `js/library/jquery/ui/jquery-ui-[contenthash]${minExt}.js`
        },
        'magiczoom-style': {
            import: path.resolve(__dirname, '../src/js/library/magiczoom/magiczoom-5.1.10.css'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/magiczoom/magiczoom-[contenthash]${minExt}.css`
        },
        'magiczoom-script': {
            import: path.resolve(__dirname, '../src/js/library/magiczoom/magiczoom-5.1.10.min.js'),
            filename: `js/library/magiczoom/magiczoom-[contenthash]${minExt}.js`
        },
        stylesheet: {
            import: path.resolve(__dirname, '../src/scss/stylesheet/stylesheet.scss'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `css/stylesheet-[contenthash]${minExt}.css`
        },
        'swiper-style': {
            import: path.resolve(__dirname, '../src/js/library/swiper/swiper-4.5.3-custom.scss'),
            filename: 'css/auto_generated_files/[name].js',
            miniCssExtractOutputPaths: `js/library/swiper/swiper-[contenthash]${minExt}.css`,
            isDomreadyAsset: true
        },
        'swiper-script': {
            import: path.resolve(__dirname, '../src/js/library/swiper/swiper-4.5.3.min.js'),
            filename: `js/library/swiper/swiper-[contenthash]${minExt}.js`
        }
    },
    pagesDomreadyLegacy: {
        'product-domready-legacy': {
            import: path.resolve(__dirname, '../src/js/pages/product/product-domready.js'),
            filename: `js/pages/product/product-domready-legacy-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        }
    },
    pagesDomreadyModern: {
        'product-domready-modern': {
            import: path.resolve(__dirname, '../src/js/pages/product/product-domready.js'),
            filename: `js/pages/product/product-domready-[contenthash]${minExt}.js`,
            isDomreadyAsset: true
        }
    },
    partial: {
        address: {
            import: path.resolve(__dirname, '../src/js/partial/address.js'),
            filename: `js/address-[contenthash]${minExt}.js`
        },
        'filter-product': {
            import: path.resolve(__dirname, '../src/js/partial/filter-product.js'),
            filename: `js/filter-product-[contenthash]${minExt}.js`
        },
        counter: {
            import: path.resolve(__dirname, '../../../mobile/src/util/counter.js'),
            filename: `js/counter-[contenthash]${minExt}.js`
        },
        tabs: {
            import: path.resolve(__dirname, '../src/js/partial/tabs.js'),
            filename: `js/tabs-[contenthash]${minExt}.js`
        }
    }
};

function deepCloneObject(objectpassed) {
    if (objectpassed === null || typeof objectpassed !== 'object') {
        return objectpassed;
    }
    // give temporary-storage the original object's constructor
    const temporaryStorage = objectpassed.constructor();

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in objectpassed) {
        temporaryStorage[key] = deepCloneObject(objectpassed[key]);
    }
    return temporaryStorage;
}

function filteroutEntriesIdleProps(entriesObj, ignoredProps) {
    if (entriesObj !== null && typeof entriesObj === 'object') {
        Object.entries(entriesObj).forEach(([key, value]) => {
            // key is either an array index or object key
            for (let i = 0; i < ignoredProps.length; i++) {
                const element = ignoredProps[i];
                if (key === element) {
                    // eslint-disable-next-line no-param-reassign
                    delete entriesObj[element];
                }
            }

            filteroutEntriesIdleProps(value, ignoredProps);
        });
    }
}

const runtimeKeys = [];
const runtimeValues = [];
const filterRuntimeEnvProps = (runtimeEnvObj) => {
    if (runtimeEnvObj !== null && typeof runtimeEnvObj === 'object') {
        Object.entries(runtimeEnvObj).forEach(([key, value]) => {
            Object.entries(value).forEach(([key2, value2]) => {
                if (key2 === 'isDomreadyAsset') {
                    runtimeKeys.push(key);
                    runtimeValues.push(value2);
                }
            });

            filterRuntimeEnvProps(value);
        });
    }
};

const entries = (deepCloneObject(entryPaths));
const entriesIgnoredProps = ['miniCssExtractOutputPaths', 'isDomreadyAsset'];
filteroutEntriesIdleProps(entries, entriesIgnoredProps);

const preRuntimeEnv = (deepCloneObject(entryPaths));
filterRuntimeEnvProps(preRuntimeEnv);
const runtimeEnv = {};
const createRuntimeEnv = (keys, values) => {
    for (let i = 0; i < keys.length; i++) {
        runtimeEnv[keys[i]] = values[i];
    }
};

createRuntimeEnv(runtimeKeys, runtimeValues);

let statsDev = 'none';
let statsProd = 'none';

if (isBabelDebugging) {
    // statsDev = 'detailed';
    // statsProd = 'detailed';
    statsDev = {
        colors: true,
        // preset: 'summary'
        // preset: 'minimal'
        // preset: 'normal'
        preset: 'detailed',
        reasons: true
    };
    statsProd = {
        colors: true,
        // preset: 'summary'
        // preset: 'minimal'
        // preset: 'normal'
        preset: 'detailed',
        reasons: true
    };
} else {
    // statsDev = 'normal';
    statsDev = {
        colors: true,
        // preset: 'summary'
        // preset: 'minimal'
        preset: 'normal'
        // preset: 'detailed',
        // reasons: true
    };
    // statsProd = 'minimal';
    statsProd = 'summary';
}

const stats = mode === 'development' ? statsDev : statsProd;

const configs = {
    name: 'sample',
    copyright: 'sample, Inc.',
    babelLoaderConfig: configureBabelLoader(),
    browserslist,
    entries,
    entryPaths,
    hasReport,
    mode,
    runtimeEnv,
    statistics: stats,
    isWatching
};

if (mode === 'development' || isWatching) {
    // eslint-disable-next-line global-require
    const { info, successBg } = require('./settings.logs.js');

    successBg('CHECKING PACKAGE.JSON SCRIPTS ARGVS');

    process.argv.forEach((val, index) => {
        info(`\t process.argv ${index}\t : ${val}`);
    });
}

module.exports = configs;
