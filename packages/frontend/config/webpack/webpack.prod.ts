import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from '../../webpack.common';
import { createHtmlWebpackPluginConfig } from './common/html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { APP_TITLE, SRC_PATH } from './config';
import { root } from './helpers';

const htmlWebpackPluginConfig = createHtmlWebpackPluginConfig(APP_TITLE, SRC_PATH);

const config: Configuration = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: true,
            }),
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: 7454,
            reportFilename: root('prodBundleReport.html'),
            openAnalyzer: false,
        }),
        new HtmlWebpackPlugin({
            ...htmlWebpackPluginConfig,
            hash: true,
            minify: true,
        }),
    ],
});

export default config;
