/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

/**
 * NOTE
 * This file is controlling preload and domready load actions and files
 */
import UAParser from 'ua-parser-js';
import { isCookieAvailable, isLocalStorageAvailable } from './util/browserFeatureTest.js';

if (isCookieAvailable) {
    preG.COOKIE_IS_AVAILABLE = true;
}

if (isLocalStorageAvailable) {
    preG.LS_IS_AVAILABLE = true;
}

const domReadyAssets = JSON.parse('domReadyAssets placeholder string');

function domReadyStyleSheets() {
    // eslint-disable-next-line no-shadow
    function createExtCssFiles(addLinks) {
        var extCSSFiles = [
            preG.ASSETS_PATH + domReadyAssets.PATH_SWIPERCSS,
            preG.ASSETS_PATH + domReadyAssets.PATH_FONTAWESOMECSS,
            preG.ASSETS_PATH + domReadyAssets.PATH_JBOXCSS
        ];

        if (!preU.isHomePg) {
            extCSSFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_UICSS);
            extCSSFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_RATINGCSS);
        }

        addLinks(extCSSFiles);
    }

    function addLinks(extCSSFiles) {
        var i = 0;
        var link = '';
        var extCSSFilesLength = extCSSFiles.length;
        var bodyTag = document.body;

        for (i = 0; i < extCSSFilesLength; i++) {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = extCSSFiles[i];
            bodyTag.appendChild(link);
        }
    }

    createExtCssFiles(addLinks);
}

// REVIEW: Dynamic scripts behave as "async" by default.
// https://javascript.info/script-async-defer

function domReadyScripts() {
    // eslint-disable-next-line no-shadow
    function createExtJsFiles(addScripts) {
        // NOTE Sentry hata takibine göre eklenebilir veya daha sonra silinebilir. => https://developer.chrome.com/docs/multidevice/user-agent/#chrome-for-ios
        var parser = new UAParser();
        var browser = parser.getBrowser();
        // var os = parser.getOS();
        var extJsFiles = [];

        var browserVersion = browser.version.split('.');

        if (
            // NOTE Sentry hata takibine göre eklenebilir veya daha sonra silinebilir.
            // (os.name === 'iOS' && browser.name === 'Chrome' && browser.version >= '85') ||
            (browser.name === 'Chrome' && browserVersion[0] >= 85)
            || (browser.name === 'Edge' && browserVersion[0] >= 89)
            || (browser.name === 'Firefox' && browserVersion[0] >= 87)
            || (browser.name === 'Opera' && browserVersion[0] >= 71)
            || (browser.name === 'Safari' && browserVersion[0] >= 14)
            || (browser.name === 'Mobile Safari' && browserVersion[0] >= 12)
        ) {
            extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_MODERNDOMREADY);

            if (preU.isPrPg) {
                extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_PRODUCTMODERNDOMREADY);
            }
        } else {
            extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_LEGACYDOMREADY);

            if (preU.isPrPg) {
                extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_PRODUCTLEGACYDOMREADY);
            }
        }

        extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_JQUERYTURN);

        if (preU.isHomePg) {
            extJsFiles.push(preG.ASSETS_PATH + domReadyAssets.PATH_JQUERYJBOX);
        }

        addScripts(extJsFiles);
    }

    function addScripts(extJsFiles) {
        var i = 0;
        var script = '';
        var extJsFilesLength = extJsFiles.length;
        var fragment = document.createDocumentFragment();
        var bodyTag = document.body;

        for (i = 0; i < extJsFilesLength; i++) {
            script = document.createElement('script');
            script.src = extJsFiles[i];
            fragment.appendChild(script);
        }
        bodyTag.appendChild(fragment);
    }

    createExtJsFiles(addScripts);
}

function domReady(callback) {
    // eslint-disable-next-line no-unused-expressions
    document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback);
}

domReady(function () {
    domReadyStyleSheets();
    domReadyScripts();
});
