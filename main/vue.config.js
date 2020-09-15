const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: false, // 忽略es-lint
  productionSourceMap: false, // 过滤map文件
  assetsDir: "static",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },
  devServer: {
    open: true,
    port: 9999,
    disableHostCheck: true
  },
};
