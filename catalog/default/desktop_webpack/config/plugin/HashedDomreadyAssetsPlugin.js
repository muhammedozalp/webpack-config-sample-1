/* eslint-disable no-restricted-syntax */
/* eslint-disable object-curly-newline */

class HashedDomreadyAssetsPlugin {
    constructor(_domReadyAssets, _runtimeEnv) {
        this.runtimeEnv = _runtimeEnv;
        this.domreadyAssetPaths = _domReadyAssets;
    }

    apply(compiler) {
        compiler.hooks.done.tap(
            'HashedDomreadyAssetsPlugin',
            (stats) => {
                this.matchRuntimeEnvAndFileWithContentHash(stats.toJson().assetsByChunkName);
            }
        );
    }

    matchRuntimeEnvAndFileWithContentHash(fileWithContentHash) {
        const domreadyPaths = {};

        for (const [key, value] of Object.entries(fileWithContentHash)) {
            // eslint-disable-next-line no-unused-vars
            for (const [keyEnv, valueEnv] of Object.entries(this.runtimeEnv)) {
                if (key === keyEnv) {
                    domreadyPaths[key] = `default/${value[0]}`;
                    if (value[0].includes('auto_generated_files')) {
                        domreadyPaths[key] = `default/${value[1]}`;
                    }
                }
            }
        }

        this.updateDomreadyPathsKeyNames(domreadyPaths);
    }

    updateDomreadyPathsKeyNames(filteredDomreadyPaths) {
        Object.entries(filteredDomreadyPaths)
            .forEach(([key, value]) => {
                let filename = key;

                if (filename === 'font-awesome') filename = 'PATH_FONTAWESOMECSS';
                else if (filename === 'index-domready-legacy') filename = 'PATH_LEGACYDOMREADY';
                else if (filename === 'index-domready-modern') filename = 'PATH_MODERNDOMREADY';
                else if (filename === 'product-domready-legacy') filename = 'PATH_PRODUCTLEGACYDOMREADY';
                else if (filename === 'product-domready-modern') filename = 'PATH_PRODUCTMODERNDOMREADY';
                else if (filename === 'jquery-jbox-style') filename = 'PATH_JBOXCSS';
                else if (filename === 'jquery-jbox-script') filename = 'PATH_JQUERYJBOX';
                else if (filename === 'jquery-rating-style') filename = 'PATH_RATINGCSS';
                else if (filename === 'jquery-turn') filename = 'PATH_JQUERYTURN';
                else if (filename === 'jquery-turn-zoom') filename = 'PATH_JQUERYTURNZOOM';
                else if (filename === 'jquery-ui-style') filename = 'PATH_UICSS';
                else if (filename === 'swiper-style') filename = 'PATH_SWIPERCSS';
                this.domreadyAssetPaths[filename] = value;
            });
    }
}

module.exports = HashedDomreadyAssetsPlugin;
