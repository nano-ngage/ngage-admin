const path = require('path');
const webpackValidator = require('webpack-validator');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const getIfUtils = require('webpack-config-utils').getIfUtils;

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return webpackValidator({
    entry: {
      app: path.join(__dirname, 'src', 'client', 'index.jsx')
    },
    output: {
      filename: 'bundle.[name].js',
      path: path.join(__dirname, 'src', 'dist'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loaders: [ 'babel' ],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin()
    ]
  });
}
