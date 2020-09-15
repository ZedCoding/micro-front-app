import Vue from "vue";
import App from "./App.vue";
import startQiankun from "./micro";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "reset-css";
import { Menu, MenuItem, Message } from "element-ui";

Vue.use(Menu).use(MenuItem);

Vue.prototype.$message = (msg) => {
  Message({ ...msg, duration: 1500 });
};

startQiankun();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
