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

export const stripProtocolFromFDQN = (url: string) => url.replace(/(^\w+:|^)\/\//, '');

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
