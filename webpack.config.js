const path = require('path');
const webpackValidator = require('webpack-validator');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const getIfUtils = require('webpack-config-utils').getIfUtils;

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return webpackValidator({
    entry: {
      app: path.join(__dirname, 'src', 'index.js')
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
        'DBIP': '104.131.147.199',
        'DBPORT': 5000
      })
    ]
  });
}
