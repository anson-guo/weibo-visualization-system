<template>
  <el-container class="wrap">
    <el-header height="60px">
      <el-button icon="el-icon-menu" class="button" @click="handleOpen"/>
      <main-header :headerData="headerData"></main-header>
    </el-header>
    <el-container class="body-wrap">
      <side-nav :class="{'open': open}"/>
      <el-main>
        <div class="main">
          <router-view :userBaseInfo="userBaseInfo" :userWeiboImages="userWeiboImages"></router-view>
        </div>
      </el-main>
    </el-container>
    <div class="footer">
      <span>2019 &copy; D3 LAB by 郭敬安 | 四川师范大学</span>
    </div>
  </el-container>
</template>

<script>
import MainHeader from "./PageComponents/MainHeader";
import SideNav from "./PageComponents/SideNav";

export default {
  name: "UserInfoPage",
  components: {
    MainHeader,
    SideNav
  },
  data() {
    return {
      headerData: {}, // 用户主页面头部所使用的数据
      userBaseInfo: {}, // 用户基本信息
      userWeiboImages: [], // 用户微博图片数据
      open: false
    };
  },
  methods: {
    /**
     * 控制侧边栏导航开关
     */
    handleOpen() {
      this.open = !this.open;
      console.log(this.open);
    },
    /**
     * 跳转到base页面
     */
    jump2Base() {
      const newpath =
        this.$route.path
          .split("/")
          .splice(0, 3)
          .join("/") + "/base";
      this.$router.push({
        path: newpath
      });
    },
    /**
     * 获取用户数据
     */
    fetchUserData(callback) {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/base`;
      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          const data = res.data[0];
          // 用户页面头部相关数据
          this.headerData = {
            avatar: data.avatar,
            description: data.description,
            name: data.name
          };
          // 用户基本数据
          this.userBaseInfo = data;
          callback();
        });
    },
    /**
     * 获取用户微博数据
     */
    fetchUserWeiboData() {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/weibo-images`;
      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          this.userWeiboImages = res.data.slice(0, 20);
        });
    }
  },
  mounted() {
    this.fetchUserData(this.fetchUserWeiboData);
    this.jump2Base();
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/")[3];
      if (toDepth === "base") {
        this.fetchUserData(this.fetchUserWeiboData);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";
.wrap {
  min-height: 96vh;
  .button {
    z-index: 999;
  }
  .el-header {
    position: relative;
    background-color: #ffffff;
    color: #797979;
    .el-button {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: #ffffff;
      border: #ffffff;
      &:hover {
        color: #ff6c60;
      }
      @media screen and (min-width: $smallSize) {
        display: none;
      }
    }
  }
  .body-wrap {
    position: relative;
    overflow: hidden;
    .el-aside {
      z-index: 999;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 60px);
      background: #1f2732;
      @include tran-horizontal(0, 0.4s);
      @media screen and (max-width: $smallSize) {
        position: absolute;
        left: -200px;
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
