import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";
import apps from "./apps";

/**
  注册子应用
  第一个参数：子应用的注册信息
  第二个参数：全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子-子应用加载前
  beforeLoad(app) {
    NProgress.start();
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子-子应用挂载后
  afterMount(app) {
    NProgress.done();
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

// 添加全局的捕获异常处理器
addGlobalUncaughtErrorHandler((event) => {
  console.log(event);
  const { message: msg } = event;
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    Message.error("子应用加载失败，请检查应用是否可运行");
  }
});

// 导出 qiankun 的启动函数
export default start;
