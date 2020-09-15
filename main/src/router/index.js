import Vue from "vue";
import Router from "vue-router";
import Index from '@/views/home/index';

Vue.use(Router);

// 解决vue-router导航重复
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: Index, 
      meta: {
        title: "首页"
      }
    },
  ],
});

export default router;
