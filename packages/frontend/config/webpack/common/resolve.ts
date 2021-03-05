import { root } from '../helpers';

export const createModuleResolver = () => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            common: root('src/common/'),
            components: root('src/components/'),
            pages: root('src/pages/'),
            wrappers: root('src/wrappers/'),
        },
    };
};
