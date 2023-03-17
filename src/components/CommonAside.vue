<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{isCollapse?"后台":"通用后台管理系统"}}</h3>
      <el-menu-item
        @click="clickMenu(item)"
        :index="item.name"
        v-for="item in noChildren"
        :key="item.name"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        :index="item.label"
        v-for="item in hasChildren"
        :key="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="i in item.children" :key="i.name">
          <el-menu-item @click="clickMenu(i)" :index="i.name">{{
            i.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border-right: none;
  h3 {
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
  }
}
</style>

<script>
import { getMenu } from "../api/index";
export default {
  data() {
    return {
      noChildren: [],
      hasChildren: [],
    };
  },
  computed:{
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
  created() {
    getMenu().then((res) => {
      this.noChildren = res.data.filter((item) => !item.children);
      this.hasChildren = res.data.filter((item) => item.children);
      console.log(this.noChildren);
      console.log(this.hasChildren);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      if (this.$route.path != item.path && !(this.$route.path==='/home' && item.path==='/')) {
        this.$router.push(item.path);
      }
    },
  },
};
</script>
