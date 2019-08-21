const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

const baseDevConfig = () => ({
  devtool: 'eval-cheap-module-source-map',
  entry: {
    todoapp: [customPath, hotScript, path.join(__dirname, '../chrome/extension/todoapp')],
    background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')],
    spy: [customPath, hotScript, path.join(__dirname, '../chrome/extension/spy')],
    popup: [customPath, hotScript, path.join(__dirname, '../chrome/extension/popup')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true
    },
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr'
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    extensions: ['*', '.js', 'jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['react-hmre']
      }
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer]
          }
        }
      ]
    }, {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader', // creates style nodes from JS strings
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              'ant-prefix': 'people'
            },
            javascriptEnabled: true,
          }
        },
      ],
    }]
  }
});

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = [
  customPath,
  path.join(__dirname, '../chrome/extension/inject')
];
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.rules[0].options;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
  path: path.join(__dirname, '../dev/js'),
  filename: 'inject.bundle.js',
};
const appConfig = baseDevConfig();

module.exports = [
  injectPageConfig,
  appConfig
];
