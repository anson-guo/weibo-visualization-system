<template>
  <el-container class="wrap">
    <float-button class="float-button" @onFloatBtnClicked="switchMenu"></float-button>

    <el-header>
      <main-header :headerData="headerData"></main-header>
    </el-header>

    <el-container class="body-wrap">
      <side-nav @click.native="switchMenu" :class="{'open': open}"></side-nav>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from "./PageComponents/MainHeader";
import SideNav from "./PageComponents/SideNav";
import FloatButton from "../components/common-components/FloatButton";

export default {
  name: "UserInfoPage",
  components: {
    MainHeader,
    SideNav,
    FloatButton
  },
  data() {
    return {
      headerData: {},
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
    },

    /**
     * 获取用户头部数据
     */
    fetchUserData() {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/base-header-info`;

      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          this.headerData = res.data[0];
        });
    }
  },
  mounted() {
    this.fetchUserData();
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
    color: #242424;
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
        background-color: rgba(255, 255, 255, 0.93);
        position: absolute;
        left: -130px;
      }
      &.open {
        @include tran-horizontal(100%, 0.4s);
      }
      .el-menu {
        border: none !important;
        @media screen and (max-width: $smallSize) {
          background-color: rgba(255, 255, 255, 0.93);
        }
      }
    }
    .el-main {
      z-index: 1;
      background-color: rgba(155, 155, 155, 0.1);
      color: #333;
      text-align: center;
      padding: 0;
      height: calc(100vh - 60px);
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
