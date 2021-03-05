/* eslint-disable */
import type { IProduct, ICategory } from 'components/interfaces';

const predicate = (arg: Record<string, any>) =>
    typeof arg.name === 'string' &&
    typeof arg.number === 'string' &&
    typeof arg.description === 'string' &&
    typeof arg.category === 'string' &&
    typeof arg.slug === 'string' &&
    Array.isArray(arg.images);

export function isProductsArr(arg: any): arg is IProduct[] {
    return predicate(arg);
}

export function isProductObj(arg: any): arg is IProduct {
    return predicate(arg);
}

export function isCategoryObj(arg: any): arg is ICategory {
    return typeof arg.name === 'string' && typeof arg.slug === 'string';
}

export function assertExpectedArrayShape<T>(arg: any, check: (val: any) => val is T): asserts arg is T[] {
    if (!Array.isArray(arg)) throw new Error(`Not an array: ${JSON.stringify(arg)}`);
    if (arg.some((item) => !check(item))) throw new Error(`Violators found: ${JSON.stringify(arg)}`);
}

export function assertExpectedObjectShape<T>(arg: any, check: (val: any) => val is T): asserts arg is T {
    if (arg === null || typeof arg !== 'object') throw new Error(`Not an object: ${JSON.stringify(arg)}`);
    if (!check(arg)) throw new Error(`Violators found: ${JSON.stringify(arg)}`);
}
