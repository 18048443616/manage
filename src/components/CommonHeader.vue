<template>
  <div class="header-container">
    <div class="l-content">
      <div class="btn">
        <el-button icon="el-icon-menu" plain size="mini" @click="changeCollapse"></el-button>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tabs" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" class="el-icon-arrow-down el-icon--right">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  methods:{
    changeCollapse(){
        this.$store.commit('changeCollapse')
    }
  },
  computed:{
    ...mapState({
      tabs:state=>state.tab.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  height: 60px;
  .l-content {
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    .btn {
      margin-right: 10px;
    }
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color: #666;
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
  .r-content {
    padding: 0 20px 0 0;
  }
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  }
</style>
