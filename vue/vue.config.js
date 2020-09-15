const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: false, // 忽略es-lint
  productionSourceMap: false, // 过滤map文件
  assetsDir: "static",
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks"); // 删除拆分
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },
  configureWebpack: {
    output: {
      library: "VueMicroApp", // 子应用的包名，这里与主应用中注册的子应用名称一致
      libraryTarget: "umd", // 将你的library暴露为所有的模块定义下可运行的方式
      jsonpFunction: `webpackJsonp_VueMicroApp`, // 按需加载相关
    },
  },
  devServer: {
    port: 10100,
    headers: {
      "Access-Control-Allow-Origin": "*", // 配置跨域请求头，解决开发环境的跨域问题
    },
    disableHostCheck: true,
  },
};
