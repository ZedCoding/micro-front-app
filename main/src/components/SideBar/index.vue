<template>
  <div
    class="side-bar"
    :class="{'side-bar-unfold':isCollapse}"
    @mouseover="overHandle"
    @mouseout="outHandle"
  >
    <el-menu
      @select="handleSelect"
      background-color="#001b2d"
      text-color="#abb1bb"
      active-text-color="#fff"
      :collapse="isCollapse"
      :unique-opened="true"
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
    >
      <template v-for="item in menu">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon" class="icon-title" />
            <span class="name">{{item.meta.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.path"
            >
              <template slot="title">
                <span slot="title" class="name">{{itemChild.meta.title}}</span>
              </template>
              <!-- 三级菜单 -->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.path"
              >
                <span class="name">{{itemChild_Child.meta.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
              <span slot="title" class="name">{{itemChild.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
          <i :class="item.meta.icon" class="icon-title" />
          <span slot="title" class="name">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menu from "./menu.json";
export default {
  name: "SideBar",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu,
      defaultOpeneds: [],
      defaultActive: "",
    };
  },
  methods: {
    handleSelect(path) {
      this.$router.push({ path });
    },
    overHandle() {
      this.$emit("onmouseover");
    },
    outHandle() {
      this.$emit("onmouseout");
    },
  },
  watch: {
    "$route.path": {
      handler(path) {
        this.defaultActive = path;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
$homeIcon: "~assets/img/home.png";
$vueIcon: "~assets/img/vue.png";
$reactIcon: "~assets/img/react.png";
.side-bar {
  width: 230PX;
  background: #001b2d;
  overflow-y: auto;
  position: relative;
  .el-menu {
    width: 100%;
    border: 0;
    /deep/.icon-title {
      width: 18PX;
      height: 18PX;
      display: inline-block;
      margin-right: 8px;
      &.icon-home {
        background: url($homeIcon) no-repeat;
        background-size: cover;
      }
      &.icon-vue {
        background: url($vueIcon) no-repeat;
        background-size: cover;
      }
      &.icon-react {
        background: url($reactIcon) no-repeat;
        background-size: cover;
      }
    }
    .el-menu-item {
      & > span.name {
        font-size: 14PX;
      }
      &.is-active {
        background-color: #237ae4 !important;
        & > span.name {
          color: #fff;
        }
      }
    }
    .el-submenu {
      .el-submenu__title {
        & > span.name {
          font-size: 14PX;
        }
      }
      .el-menu {
        .el-menu-item {
          &.is-active {
            color: #fff !important;
            background-color: #237ae4 !important;
          }
        }
      }
    }
  }
  &.side-bar-unfold {
    width: 64PX;
    transition: all 0.5s;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
@media screen and (max-width: 1400px) {
  .side-bar {
    width: 180PX;
  }
}
</style>


