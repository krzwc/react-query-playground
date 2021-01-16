import { Configuration } from 'webpack';
import { configInitializer } from './config/webpack/common';
import { createDevServer } from './config/webpack/common/dev-server';
import { DEV_SERVER_HOST, DEV_SERVER_PORT } from './config/webpack/config';

const { DIST_PATH, OUTPUT_URL, entry, loaderRules, moduleResolver } = configInitializer();
const config: Configuration = {
    entry,
    devServer: createDevServer(DEV_SERVER_HOST, DEV_SERVER_PORT),
    output: {
        path: DIST_PATH,
        publicPath: OUTPUT_URL,
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: loaderRules,
    },
    resolve: moduleResolver,
};

export default config;
