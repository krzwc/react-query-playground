import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import common from '../../webpack.common';
import { createHtmlWebpackPluginConfig } from './common/html-webpack-plugin';
import { APP_TITLE, SRC_PATH } from './config';

const htmlWebpackPluginConfig = createHtmlWebpackPluginConfig(APP_TITLE, SRC_PATH);

const config: Configuration = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: 'tsconfig.json',
                mode: 'write-references',
            },
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            overlay: false,
        }),
        new HtmlWebpackPlugin({
            ...htmlWebpackPluginConfig,
        }),
    ],
});

export default config;
