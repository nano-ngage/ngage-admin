const path = require('path');
const webpack = require('webpack');
const webpackValidator = require('webpack-validator');
const getIfUtils = require('webpack-config-utils').getIfUtils;

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImaginMinPlugin = require('imagemin-webpack-plugin').default;

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return ({
    entry: {
      app: path.join(__dirname, 'src', 'client', 'index.js')
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public', 'dist'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: [ 'babel-loader' ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
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
      new ExtractTextPlugin({
        filename: 'styles.css'
      }),
      new OptimizeCssAssetsPlugin(),
    ]
  });
}
