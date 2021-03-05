module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'comma-dangle': ['warn', 'always-multiline'],
        'no-use-before-define': 'off',
        'react/prop-types': 'off',
        semi: ['error', 'always'],
        'space-before-function-paren': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-console': 'error',
        'no-duplicate-imports': 'error',
        /**
         * Disabled due to using the new JSX transform
         */
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
};
