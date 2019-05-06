<template>
  <el-aside>
    <el-menu
      :default-active="currentMenu"
      class="menu"
      router
      text-color="#303133"
      active-text-color="#c92828"
    >
      <el-menu-item index="base" class="menu-item">
        <i class="iconfont icon-mydata"></i>
        <span slot="title">基本信息</span>
      </el-menu-item>

      <el-menu-item index="fans" class="menu-item">
        <i class="iconfont icon-fensi"></i>
        <span slot="title">粉丝数据</span>
      </el-menu-item>

      <el-menu-item index="follows" class="menu-item">
        <i class="iconfont icon-guanzhu-"></i>
        <span slot="title">关注者数据</span>
      </el-menu-item>

      <el-menu-item index="weibos" class="menu-item">
        <i class="iconfont icon-weibo"></i>
        <span slot="title">微博数据</span>
      </el-menu-item>

      <el-menu-item index="related" class="menu-item">
        <i class="iconfont icon-shijianzhou"></i>
        <span slot="title">时间轴</span>
      </el-menu-item>

      <el-menu-item index="images" class="menu-item">
        <i class="iconfont icon-tuku"></i>
        <span slot="title">用户图库</span>
      </el-menu-item>

      <router-link class="white-font" to="/user">
        <el-menu-item class="menu-item">
          <i class="iconfont icon-chaxun"></i>
          <span>查询用户</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      currentMenu: "" // 当前菜单项
    };
  },
  mounted() {
    this.currentMenu = this.$route.path.split("/")[3];
  }
};
</script>

<style scoped lang="scss">
@import "../../../common/css/base.scss";

.el-menu {
  background-color: none !important;
  @media screen and (max-width: $smallSize) {
    background-color: rgba(255, 255, 255, 0.93);
  }
}
.menu {
  border: none;

  .el-menu-item {
    height: auto;
    line-height: 30px;
    margin-bottom: 10px;
  }

  .menu-item {
    padding: 10px 0 !important;
    text-align: center;
    font-size: 12px;
    a {
      color: #303133;
    }
    &:hover {
      background: #c92828 !important;
      span,
      i,
      a {
        color: #ffffff !important;
      }
    }
    i {
      display: block;
      font-size: 28px;
    }
    a {
      text-decoration: none;
    }
  }
  .is-active {
    background: #c92828 !important;
    color: #ffffff !important;
  }
  .white-font {
    text-decoration: none;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
