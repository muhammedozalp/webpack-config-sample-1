// eslint-disable-next-line import/no-extraneous-dependencies
const Raven = require('raven-js');

const dsn = process.env.SENTRY_DSN;

if (dsn) {
    window.Raven = Raven;
    const ravenOptions = {
        // Will cause a deprecation warning, but the demise of
        // `ignoreErrors` is still under discussion.
        // See: https://github.com/getsentry/raven-js/issues/73
        ignoreErrors: [
            // Random plugins/extensions
            'top.GLOBALS',
            // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
            'originalCreateNotification',
            'canvas.contentDocument',
            'MyApp_RemoveAllHighlights',
            'http://tt.epicplay.com',
            'Can\'t find variable: ZiteReader',
            'jigsaw is not defined',
            'ComboSearch is not defined',
            'http://loading.retry.widdit.com/',
            'atomicFindClose',
            // Facebook borked
            'fb_xd_fragment',
            // ISP "optimizing" proxy -
            // `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
            // See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
            'bmi_SafeAddOnload',
            'EBCallBackMessageReceived',
            // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
            'conduitPage',

            'QuotaExceededError',
            'ServiceWorker',
            'FirebaseError',
        ],
        ignoreUrls: [
            /analytics\.tiktok\.com/i,
            // Facebook flakiness
            /graph\.facebook\.com/i,
            // Facebook blocked
            /connect\.facebook\.net\/en_US\/all\.js/i,
            // Woopra flakiness
            /eatdifferent\.com\.woopra-ns\.com/i,
            /static\.woopra\.com\/js\/woopra\.js/i,
            // Chrome extensions
            /extensions\//i,
            /^chrome:\/\//i,
            // Other plugins
            /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
            /webappstoolbarba\.texthelp\.com\//i,
            /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
        ]
    };

    window.Raven.config(dsn, ravenOptions).install();
}
