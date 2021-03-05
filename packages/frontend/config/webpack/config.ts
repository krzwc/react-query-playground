import { root } from './helpers';

export const APP_TITLE = 'Desktop apps';
export const OUTPUT_URL = '/';
export const ROOT_PATH = root();
export const DIST_PATH = root('dist');
export const PUBLIC_PATH = root('public');
export const SRC_PATH = root('src');

export const DEV_SERVER_PORT = Number(process.env.PORT) || 3000;
export const DEV_SERVER_HOST = process.env.HOST || 'localhost';
