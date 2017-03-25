import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './app.jsx',
    ],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.ejs'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'react', 'stage-1'],
            plugins: ['syntax-dynamic-import', 'transform-decorators-legacy'],
          },
        }],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'react', 'stage-1'],
            plugins: ['syntax-dynamic-import', 'transform-decorators-legacy'],
          },
        }],
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader?modules', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.ejs$/,
        use: 'ejs-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'DEMO',
      template: './template.ejs',
      inject: 'body',
    }),
  ],
};
