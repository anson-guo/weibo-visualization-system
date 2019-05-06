<template>
  <el-container class="wrap">
    <float-button class="float-button" @onFloatBtnClicked="switchMenu"></float-button>

    <el-header>
      <main-header :headerData="headerData"></main-header>
    </el-header>

    <el-container class="body-wrap">
      <side-nav @click.native="switchMenu" :class="{'open': open}"/>

      <el-main>
        <div class="main">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>

    <div class="footer">
      <span>2019 &copy; Weble by 郭敬安 | 四川师范大学</span>
    </div>
  </el-container>
</template>

<script>
import MainHeader from './PageComponents/MainHeader';
import SideNav from './PageComponents/SideNav';
import FloatButton from '../components/common-components/FloatButton';

export default {
  name: 'UserInfoPage',
  components: {
    MainHeader,
    SideNav,
    FloatButton
  },
  data() {
    return {
      headerData: {}, // 用户主页面头部所使用的数据
      open: false
    };
  },
  methods: {
    /**
     * 控制菜单开合
     */
    switchMenu() {
      const width = document.documentElement.clientWidth;
      if (width <= 768) {
        // 移动端
        this.open = !this.open;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";
.wrap {
  min-height: 96vh;

  .float-button {
    // 悬浮按钮样式，注意：悬浮按钮只出现在移动端设备（width<768px）
    z-index: 5201314;

    @media screen and (min-width: $smallSize) {
      display: none;
    }
  }
  .el-header {
    position: relative;
    background-color: #ffffff;
    color: #797979;
  }
  .body-wrap {
    position: relative;
    overflow: hidden;
    .el-aside {
      z-index: 999;
      min-width: 130px;
      max-width: 130px;
      height: calc(100vh - 60px);
      background: #fff;
      border-top: 2px solid rgba(155, 155, 155, 0.1);
      border-right: 3px solid darkgray;

      @include tran-horizontal(0, 0.4s);
      @media screen and (max-width: $smallSize) {
        position: absolute;
        left: -130px;
      }
      &.open {
        @include tran-horizontal(100%, 0.4s);
      }
      .el-menu {
        border: none !important;
      }
    }
    .el-main {
      z-index: 1;
      background-color: rgba(155, 155, 155, 0.1);
      color: #333;
      text-align: center;
      padding: 0;
      height: calc(100vh - 60px);
      .main {
        background-color: transparent;
        padding: 10px;
        border-radius: 10px;
        min-height: calc(100vh - 200px);
        position: relative;
        margin-bottom: 40px;
      }
    }
  }
  .footer {
    color: #ffffff;
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    text-align: center;
    background-color: #5b6e84;

    @media screen and (max-width: $smallSize) {
      width: 100%;
    }
  }
}
</style>
