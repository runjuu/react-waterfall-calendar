import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
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
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.ejs', '.png', '.jpg', 'svg'],
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=es2015'],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
    }, {
      test: /\.svg/,
      loader: 'svg-url-loader',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000',
    }, {
      test: /\.sass$/,
      loaders: ['style', 'css?modules', 'postcss', 'sass'],
    }],
  },
  postcss: function postcss() {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'bundle.js'),
    new HtmlWebpackPlugin({
      title: 'react-module-calendar',
      template: './demo/template.html',
      inject: 'body',
    }),
  ],
};
