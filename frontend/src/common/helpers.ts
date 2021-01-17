export const isEmpty = (value: unknown): boolean => {
    if (typeof value === 'undefined') {
        return true;
    }
    if (typeof value === 'object') {
        // null
        if (value === null) {
            return true;
        }
        // Array
        if (value !== null && Array.isArray(value) && value.length === 0) {
            return true;
        }
        // Object
        if (Object.keys(value).length === 0 && value.constructor === Object) {
            return true;
        }
    }
    return false;
};

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);

export const noop = (): undefined => undefined;

export const isFunction = (functionToCheck: unknown): boolean => functionToCheck instanceof Function;

/* export const get = (object: ObjectType | Model, path: string | string[], value: unknown): unknown => {
    const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);
    const pathArrayFlat = pathArray.flatMap((part: any) => (typeof part === 'string' ? part.split('.') : part));

    return pathArrayFlat.reduce((obj: any, key: any) => obj && obj[key], object) || value;
}; */

export const stripProtocolFromFDQN = (url: string) => url.replace(/(^\w+:|^)\/\//, '');
