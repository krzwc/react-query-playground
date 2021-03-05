import { resolve } from 'path';
import { Options } from 'html-webpack-plugin';

export const createHtmlWebpackPluginConfig = (title: string, appPath: string): Options => ({
    title,
    template: resolve(appPath, 'index.ejs'),
    inject: true,
    chunks: 'all',
});
