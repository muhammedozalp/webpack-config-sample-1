/* eslint-disable import/no-extraneous-dependencies */

const chalk = require('chalk');

const { log: logging } = console;
const clrInfo = chalk.yellow;
const clrError = chalk.red;
const clrSuccess = chalk.bold.green;
const clrSuccessBg = chalk.bgGreenBright.rgb(0, 0, 0);
const clrText = chalk.white;
const clrWarning = chalk.keyword('orange');

const log = {
    error(message) {
        logging(clrError(message));
    },
    info(message) {
        logging(clrInfo(message));
    },
    success(message) {
        logging(clrSuccess(message));
    },
    successBg(message) {
        logging(clrSuccessBg(message));
    },
    text(message) {
        logging(clrText(message));
    },
    warning(message) {
        logging(clrWarning(message));
    }
};

module.exports = log;
