<template>
  <div class="header-container">
    <div class="l-content">
      <div class="btn">
        <el-button icon="el-icon-menu" plain size="mini" @click="changeCollapse"></el-button>
      </div>
      <span>首页</span>
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
export default {
  data() {
    return {};
  },
  methods:{
    changeCollapse(){
        this.$store.commit('changeCollapse')
    }
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
