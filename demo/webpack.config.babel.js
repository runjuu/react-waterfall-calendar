import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './demo/app.jsx',
  ],
  output: {
    path: path.join(__dirname, '/'),
    publicPath: '/',
    filename: 'demo.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=es2015'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules', 'postcss-loader'],
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader?modules', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: 'body',
    }),
  ],
  performance: {
    hints: false,
  },
};
