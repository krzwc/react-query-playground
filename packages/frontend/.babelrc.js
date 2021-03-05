const environment = process.env.BABEL_ENV || process.env.NODE_ENV;
const developmentMode = environment === 'development';

module.exports = {
    presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, loose: true }],
        ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
        ['@babel/preset-react', { runtime: 'automatic', development: developmentMode }],
    ],
    plugins: ['@babel/plugin-proposal-class-properties', developmentMode && 'react-refresh/babel'].filter(Boolean),
};
