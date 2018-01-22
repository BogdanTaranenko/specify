const webpackNodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }],
          ],
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
};
