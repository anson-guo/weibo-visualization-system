<template>
  <div class="main">
    <el-header class="header">
      <main-header></main-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="base" router>
          <el-menu-item index="base">
            <i class="el-icon-document"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="fans">
            <i class="el-icon-message"></i>
            <span slot="title">粉丝数据</span>
          </el-menu-item>

          <el-menu-item index="weibos">
            <i class="el-icon-document"></i>
            <span slot="title">微博数据</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainHeader from '../components/common-components/MainHeader';
import BaseInfo from './BaseInfo';
import FansData from './FansData';


export default {
  name: "UserInfo",
  components: {
    MainHeader,
    BaseInfo,
    FansData
  },
  data() {
    return {};
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
