import { Configuration } from 'webpack-dev-server';
import { PUBLIC_PATH, OUTPUT_URL } from '../config';

export const createDevServer = (devServerHost: string, devServerPort: number): Configuration => ({
    host: devServerHost,
    port: devServerPort,
    contentBase: PUBLIC_PATH,
    publicPath: OUTPUT_URL,
    historyApiFallback: true,
});
