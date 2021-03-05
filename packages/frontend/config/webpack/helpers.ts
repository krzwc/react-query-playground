import { join, resolve } from 'path';

const ROOT = resolve(__dirname, '../..');

export const root = (...args: string[]) => join(...[ROOT].concat(args || []));

export const isDev = (mode: string) => mode === 'development';

export const isProd = (mode: string) => mode === 'production';
