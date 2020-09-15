import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import "./public-path";

Vue.config.productionTip = false;

let instance = null,
  router = null;

/**
  渲染函数
  两种情况：主应用生命周期钩子中运行/子应用单独启动时运行
 */
function render() {
  // 在render中创建router，可以保证在卸载子应用时，移除Location事件监听，防止事件污染
  router = new Router({
    // 运行在主应用中时，添加路由命名空间/vue
    base: window.__POWERED_BY_QIANKUN__ ? "/vue" : "/",
    mode: "history",
    routes: [],
  });

  // 挂载应用
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
}

// 子应用独立运行时，直接挂载
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
  bootstrap只会在子应用初始化的时候调用一次，下次子应用重新进入时会直接调用mount钩子函，
  不会再重复触发bootstrap。
  通常我们会在这里做一些全局变量的初始化，比如不会在unmount阶段被销毁的应用级别缓存等
 */
export async function bootstrap() {
  console.log("VueMicroApp bootstraped");
}

/**
  应用每次进入都会调用mount方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("VueMicroApp mount", props);
  render(props);
}

/**
  应用每次切出/卸载会调用的方法，通常我们在这里会卸载子应用的应用实例
 */
export async function unmount() {
  console.log("VueMicroApp unmount");
  instance.$destroy();
  instance = null;
  router = null;
}
