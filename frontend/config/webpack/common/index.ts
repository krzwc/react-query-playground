import { getLoadersRules } from './loaders';
import { createModuleResolver } from './resolve';

import { OUTPUT_URL, ROOT_PATH, DIST_PATH, SRC_PATH } from '../config';

export const configInitializer = () => {
    const loaderRules = getLoadersRules();
    const moduleResolver = createModuleResolver();
    return {
        OUTPUT_URL,
        ROOT_PATH,
        DIST_PATH,
        loaderRules,
        moduleResolver,
        entry: SRC_PATH,
    };
};
