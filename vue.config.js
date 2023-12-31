const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3306',   //node.js服务器运行的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'http://192.168.0.102:8083'  //路径重写
        }
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
      },
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./src/assets/css/common.less"),
      ],
    },
  },
})