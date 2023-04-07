// config-overrides.js
/* eslint-disable no-useless-computed-key */
const {
  override,
  addWebpackAlias,
  addWebpackResolve,
  addLessLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require('customize-cra');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 代码压缩
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 大文件定位
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度
const CompressionPlugin = require('compression-webpack-plugin'); // gzip压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css压缩
const path = require('path');

module.exports = {
  devServer: overrideDevServer((config) => {
    return {
      ...config,
      proxy: {
        "/api": {
          target: `http://${ProxyApiPath}/`,
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
          ws: false,
        },
        "/document": {
          target: `http://192.168.110.36:54001/`,
          changeOrigin: true,
          pathRewrite: { '^/document': '' },
          ws: false,
        },
        '/farend': {
          target: `ws://${ProxyApiPath}/`,
          changeOrigin: true,
          pathRewrite: { '^/farend': 'ws' },
          ws: true,
        },
        //本地终端socket
        '/local': {
          target: `ws://127.0.0.1:56789/`,
          changeOrigin: true,
          pathRewrite: { '^/local': '/ws' },
          ws: true,
        },
      },
    };
  }, watchAll()),
  webpack: override(
    // 导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.tsx'],
    }),
    // 路径别名
    addWebpackAlias({
      ['@']: path.join(__dirname, '/src'),
      '@util': path.join(__dirname, '/src/utils'),
      '@static': path.join(__dirname, '/src/static'),
      '@store': path.join(__dirname, '/src/store'),
      '@common': path.join(__dirname, '/src/common'),
    }),
    // less预加载器配置
    addLessLoader({
      strictMath: true,
      noIeCompat: true,
      modifyVars: {
        '@primary-color': '#1DA57A', // for example, you use Ant Design to change theme color.
      },
      cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
      cssModules: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]', // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      },
    }),
    // 注意是production环境启动该plugin
    process.env.NODE_ENV === 'production' &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        // 开启打包缓存
        cache: true,
        // 开启多线程打包
        parallel: true,
        uglifyOptions: {
          // 删除警告
          warnings: false,
          // 压缩
          compress: {
            // 移除console
            drop_console: true,
            // 移除debugger
            drop_debugger: true,
          },
        },
      })
    ),
    addWebpackPlugin(new MiniCssExtractPlugin()),
    // 判断环境变量ANALYZER参数的值
    process.env.ANALYZER && addWebpackPlugin(new BundleAnalyzerPlugin()),
    // 打包进度条
    addWebpackPlugin(new ProgressBarPlugin()),
    // 需要nginx配合
    // addWebpackPlugin(
    //   new CompressionPlugin({
    //     filename: '[path][base].gz',
    //     algorithm: 'gzip',
    //     test: /\.js$|\.html$|\.css/,
    //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240字节
    //     minRatio: 1, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: false, // 删除原文件
    //   })
    // )
    addWebpackModuleRule({
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 64,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    }),
    addWebpackModuleRule({
      test: [/\.css$/, /\.less$/], // 可以打包后缀为sass/scss/css的文件
      use: ['style-loader', 'css-loader', 'less-loader'],
    })
  )
}

