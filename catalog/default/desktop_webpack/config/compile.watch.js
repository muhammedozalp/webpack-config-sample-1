/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const chokidar = require('chokidar');
const connect = require('connect');
const serveStatic = require('serve-static');

const { watch } = require('./settings.paths.js');

const { info, success } = require('./settings.logs.js');
const { assets } = require('./settings.paths.js');

(async () => {
    const {
        app,
        common,
        indexDomreadyLegacy,
        indexDomreadyModern,
        intlTelInput,
        library,
        partial,
        pagesDomreadyLegacy,
        pagesDomreadyModern,
        indexPreloadLegacy
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

    const successMessage = (configName, path) => {
        info(`File ${path} has been updated`);

        success(`\n\n
        \rFinished ${configName} compilation!
        \r=> Watching source files
        \r=> under desktop_webpack/src directory\n\n`);

        info('Serving files from http://localhost:9000\n\n');
    };

    successMessage('desktop_webpack');

    const watchOption = { ignoreInitial: true };

    // Initialize watchers.
    const watchApp = chokidar.watch(watch.app, watchOption);
    const watchCommon = chokidar.watch(watch.common, watchOption);
    const watchIndexDomready = chokidar.watch(watch.indexDomready, watchOption);
    const watchIntlTelInput = chokidar.watch(watch.intlTelInput, watchOption);
    const watchLibrary = chokidar.watch(watch.library, watchOption);
    const watchPartial = chokidar.watch(watch.partial, watchOption);
    const watchPages = chokidar.watch(watch.pages, watchOption);
    const watchIndexPreload = chokidar.watch(watch.indexPreload, watchOption);

    watchApp
        .on('all', async (path) => { await app(); successMessage('app', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchCommon
        .on('all', async (path) => { await common(); successMessage('common', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchIndexDomready
        .on('all', async (path) => {
            await indexDomreadyLegacy(); successMessage('indexDomreadyLegacy', path);
            await indexDomreadyModern(); successMessage('indexDomreadyModern', path);
            await indexPreloadLegacy(); successMessage('indexPreloadLegacy', path);
            info(`File ${path} has been added`);
        })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchIntlTelInput
        .on('all', async (path) => { await intlTelInput(); successMessage('intlTelInput', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchLibrary
        .on('all', async (path) => { await library(); successMessage('library', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchPartial
        .on('all', async (path) => { await partial(); successMessage('partial', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchPages
        .on('all', async (path) => {
            await pagesDomreadyLegacy(); successMessage('pagesDomreadyLegacy', path);
            await pagesDomreadyModern(); successMessage('pagesDomreadyModern', path);
            await indexPreloadLegacy(); successMessage('indexPreloadLegacy', path);
            info(`File ${path} has been added`);
        })
        .on('error', (error) => info(`Watcher error: ${error}`));
    watchIndexPreload
        .on('all', async (path) => { await indexPreloadLegacy(); successMessage('indexPreloadLegacy', path); })
        .on('error', (error) => info(`Watcher error: ${error}`));

    connect().use(serveStatic(assets.default)).listen(9000);
})();
