<template>
  <div id="main-app">
    <!-- 侧边栏导航 -->
    <side-bar :isCollapse="isCollapse" @onmouseover="onMouseover" @onmouseout="onMouseout" />
    <!-- 主体切换显示内容 -->
    <div class="main-container">
      <!--展开图标-->
      <div
        v-show="collapseShow"
        @click="handleCollapse"
        @mouseover="onMouseover"
        @mouseout="onMouseout"
        :class="[isCollapse ? 'icon-collapse-open' : null, 'icon-collapse']"
      />
      <!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
      <router-view v-show="$route.name" />
      <!-- 子应用渲染区，用于挂载子应用节点 -->
      <div id="appContainer" v-show="!$route.name" />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
  name: "App",
  components: {
    SideBar,
  },
  data() {
    return {
      isCollapse: false,
      collapseShow: false,
    };
  },
  methods: {
    onMouseover() {
      this.collapseShow = true;
    },
    onMouseout() {
      this.collapseShow = false;
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="scss">
$collapse_open: "~assets/img/icon_open.png";
$collapse_close: "~assets/img/icon_close.png";
html,body,#main-app {
  height: 100%;
}
#main-app {
  display: flex;
  .main-container {
    flex: 1;
    padding: 20px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    .icon-collapse {
      position: absolute;
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      width: 20px;
      height: 40px;
      background: url($collapse_close) no-repeat;
      background-size: cover;
      cursor: pointer;
      &.icon-collapse-open {
        background: url($collapse_open) no-repeat;
        background-size: cover;
      }
    }
    &.main-container-full {
      padding: 0;
    }
  }
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
