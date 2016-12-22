import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9797',
    'webpack/hot/only-dev-server',
    './demo/app.jsx',
  ],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.sass', '.ejs', '.png', '.jpg', 'svg'],
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?presets[]=es2015'],
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
    }, {
      test: /\.svg/,
      loader: 'svg-url-loader',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=25000',
    }, {
      test: /\.sass$/,
      loaders: ['style-loader', 'css-loader?modules', 'postcss-loader', 'sass-loader'],
    }],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new HtmlWebpackPlugin({
      title: 'react-module-calendar',
      template: './demo/template.html',
      inject: 'body',
    }),
  ],
  performance: {
    hints: false,
  },
};
