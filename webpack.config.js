const path = require('path');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const getIfUtils = require('webpack-config-utils').getIfUtils;
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return webpackValidator({
    entry: {
      app: path.join(__dirname, 'src', 'client', 'index.js')
    },
    output: {
      filename: 'bundle.[name].js',
      path: path.join(__dirname, 'public', 'js'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [ 'babel' ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [ 'style', 'css' ]
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        'DBIP': JSON.stringify(process.env.DBIP || '104.131.147.199'),
        'DBPORT': JSON.stringify(process.env.DBPORT || 5000),
        'STATSIP': JSON.stringify(process.env.STATSIP || '104.131.147.199'),
        'STATSPORT': JSON.stringify(process.env.STATSPORT || 4555),
        'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID || 'Wnw35lcs32PF5TnkuSu7Aqb3j0sMP0Z4'),
        'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN || 'joraffe.auth0.com'),
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  });
}
