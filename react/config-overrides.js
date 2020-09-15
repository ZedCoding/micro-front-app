const path = require('path');

module.exports = {
  webpack: (config) => {
    // 子应用的包名，这里与主应用中注册的名称一样
    config.output.library = "ReactMicroApp";
    // 将你的library暴露为所有的模块定义下都可运行的方式
    config.output.libraryTarget = "umd";
    // 按需加载相关
    config.output.jsonpFunction = "webpackJsonp_ReactMicroApp";

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src")
    }
    return config;
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 关闭主机检查，使子应用可以被fetch
      config.disableHostCheck = true;
      // 配置跨域请求头
      config.headers = {
        "Access-Control-Allow-Origin": "*"
      };
      // 配置history模式
      config.historyApiFallback = true;
      return config;
    }
  }
}