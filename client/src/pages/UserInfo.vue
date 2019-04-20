<template>
  <div class="main">
    <el-header class="header">
      <main-header ></main-header>
    </el-header>
    <el-container>
      <el-aside width="200px">  
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>

          <el-menu-item index="2">
            <i class="el-icon-message"></i>
            <span slot="title">粉丝数据</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">微博数据</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainHeader from "../components/common-components/MainHeader";

export default {
  name: "UserInfo",
  components: {
    MainHeader
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
}
.el-header {
  padding: 0;
}
.header {
  height: 200px !important;
}

.el-aside {
  color: #333;
}
</style>

