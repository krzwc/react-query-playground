import type { SingleItemData } from 'common/interfaces';

export enum ENTITY_TYPES {
    DESKTOP_APPS = 'desktop-apps',
    DESKTOP_APPS_PRODUCT = 'desktop-apps-product',
}

export const URL_SEPARATOR = '/';

export enum REQUEST_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const BASE_URL = 'http://0.0.0.0:4000/api';

export const URLS = {
    DESKTOP_APPS: BASE_URL + '/desktop-apps',
    SINGLE_ITEM: (data: SingleItemData): string => String(data.id),
};

export enum REQUEST_STATUSES {
    SUCCESS = 'success',
    ERROR = 'error',
    LOADING = 'loading',
}

export enum ACTION_TYPES {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    LAZY_LOAD = 'LAZY_LOAD',
}
