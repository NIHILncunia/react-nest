const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  name: 'sleact',
  mode: 'development',
  devtool: 'eval',
  entry: {
    app: path.resolve(__dirname, 'client'),
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json', ],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ [
              '@babel/preset-env', {
                targets: { browsers: [ 'last 2 chrome versions', ], },
              }, ],
              '@babel/preset-react',
              '@emotion/babel-preset-css-prop',
            ],
            plugins: [
              [ '@emotion/babel-plugin', { sourceMap: true, }, ], require.resolve('react-refresh/babel'),
            ],
          },
        },
      },
      {
        test: [ /\.s[ac]ss$/i, /\.css$/i, ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/'),
    publicPath: '/dist/',
    overlay: true,
    port: 3090,
    hot: true,
    open: true,
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3095',
    //     changeOrigin: true,
    //   },
    // },
  },
};