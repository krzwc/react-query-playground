import { RuleSetRule } from 'webpack';

export const getLoadersRules = (): RuleSetRule[] => [
    {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
    },
    {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    },
    {
        test: /\.(png|svg|jpg|gif)$/i,
        use: ['file-loader'],
    },
];
