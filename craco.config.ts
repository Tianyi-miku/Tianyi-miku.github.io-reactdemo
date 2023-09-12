/*
 * @Description: 脚手架配置（最新）
 * @Author: zhangyuru
 * @Date: 2023-05-04 17:06:50
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-24 17:07:34
 * @FilePath: \05-simulation_training_React\craco.config.js
 */
import path from "path";
const { getLoader, loaderByName } = require("@craco/craco");
const CracoLessPlugin = require('craco-less');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const apis = [
  '192.168.1.10:5000', //云
]
const ProxyApiPath = apis[0]

module.exports = {
  devServer: {
    port: 3000,
    open: false,
    proxy: {
      "/api": {
        target: `http://${ProxyApiPath}/`,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        ws: false,
      },
      // 文件服务器
      "/document": {
        target: `http://192.168.1.36:54001`,
        changeOrigin: true,
        pathRewrite: { '^/document': '' },
        ws: false,
      },
    },
  },
  webpack: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    resolve: {
      // 引入文件忽略后缀名
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.less', '.css']
    },
    // 配置修改
    configure: (webpackConfig: any) => {
      const { isFound, match: babelLoaderMatch } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );
      // 按需加载antd
      if (isFound) {
        babelLoaderMatch.loader.options.plugins.push([
          "import",
          { libraryName: "antd", style: true },
        ]);
      }
      // 修改打包输出文件名
      // webpackConfig.output.path = path.join(__dirname, 'dist' + getDate());

      return webpackConfig;
    },
    // 打包优化 
    plugins: process.env.NODE_ENV === 'production' ? [
      // 压缩js
      new UglifyJsPlugin({
        test: /\.js($|\?)/i, // 正则匹配
        sourceMap: false, // 是否生成map文件
        parallel: true, // 开启多线程打包
        cache: true, // 开启打包缓存
        uglifyOptions: {
          warnings: false, // 删除警告
          compress: {
            drop_console: true, // 去掉 console.log
            drop_debugger: true // 去掉 debugger
          },
        },
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
      // 打包进度
      new ProgressBarPlugin()
    ] : [],
  },
  plugins: [
    {
      plugin: CracoLessPlugin, // less-loader
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};