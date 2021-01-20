/* eslint-disable */
module.exports = {
    clearMocks: true,
    moduleDirectories: ['<rootDir>../node_modules'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    rootDir: '../../src',
    transform: { '\\.[jt]sx?$': 'babel-jest' },
    setupFilesAfterEnv: ['<rootDir>../config/jest/jest.setup.tsx'],
    globals: {
        render: require('@testing-library/react').render,
    },
    moduleNameMapper: {
        '^lodash-es$': 'lodash', // will replace lodash-es with the commonjs version during testing runtime
        '^lodash-es/(.*)$': 'lodash/$1',
        '^common$': '<rootDir>common',
        '^common/(.*)$': '<rootDir>common/$1',
        '^components$': '<rootDir>components',
        '^components/(.*)$': '<rootDir>components/$1',
        '^pages$': '<rootDir>pages',
        '^pages/(.*)$': '<rootDir>pages/$1',
    },
};
