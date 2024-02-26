// eslint-disable-next-line prefer-destructuring
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

const { info } = require('./settings.logs.js');
const { src } = require('./settings.paths.js');

const configureBundleAnalyzeReport = (configType) => {
    const d = new Date();
    const id = `${(d.getMonth() + 1).toString()}_${d.getDate().toString()}_${d.getHours().toString()}.${d.getMinutes().toString()}.${d.getSeconds().toString()}`;

    info(`Creating Bundle Report: ${src.reportPath}/reports/${id}__${configType.name}.html`);
    configType.plugins.push(new BundleAnalyzerPlugin({
        excludeAssets: ['auto_generated_files'],
        openAnalyzer: false,
        generateStatsFile: true,
        analyzerMode: 'static',
        /**
         * DOCUMENTATION
         * json stats files would be analyze at the following urls:
         * https://webpack.github.io/analyse/
         * https://chrisbateman.github.io/webpack-visualizer/
         * https://statoscope.tech/#diff&hash=1b14cc8ab703938b60a2&diffWith=6764c613c08d2ff5e1bb
         */
        statsFilename: `${src.reportPath}/reports/${id}__${configType.name}.json`,
        reportFilename: `${src.reportPath}/reports/${id}__${configType.name}.html`,
        reportTitle: `${configType.name} bundle analyzer`
    }));
};

const configureBundleStatsReport = (configType) => {
    const d = new Date();
    const id = `${(d.getMonth() + 1).toString()}_${d.getDate().toString()}_${d.getHours().toString()}.${d.getMinutes().toString()}.${d.getSeconds().toString()}`;

    info(`Creating Bundle Stats Report: ${src.reportPath}/reports/${id}__${configType.name}.html`);
    configType.plugins.push(new BundleStatsWebpackPlugin({
        compare: true,
        baseline: false,
        html: true,
        json: true,
        outDir: '../../catalog/view/theme/mobile/bundle_analysis/bundle_stats',
        slient: false,
        stats: {
            assets: true,
            entrypoints: true,
            chunks: true,
            modules: true,
            builtAt: true,
            hash: true
        }
    }));
};

module.exports = { configureBundleAnalyzeReport, configureBundleStatsReport };
