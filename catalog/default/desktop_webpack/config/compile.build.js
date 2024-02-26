/* eslint-disable global-require */

const { successBg } = require('./settings.logs.js');

(async () => {
    const {
        app,
        common,
        indexDomreadyLegacy,
        indexDomreadyModern,
        indexPreloadLegacy,
        intlTelInput,
        library,
        partial,
        pagesDomreadyLegacy,
        pagesDomreadyModern,
    } = await require('./webpack.config.async.js');

    await app();
    await common();
    await partial();
    await intlTelInput();
    await library();
    await pagesDomreadyLegacy();
    await pagesDomreadyModern();
    await indexDomreadyLegacy();
    await indexDomreadyModern();
    await indexPreloadLegacy();

    successBg(`\n\n
    \rCompleted All Tasks. => Finished desktop_webpack compilation!                                                                                                          \n\n\n`);
})();
