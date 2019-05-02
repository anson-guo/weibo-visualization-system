<template>
  <el-aside>
    <el-menu
      default-active="base"
      class="menu"
      router
      @open="handleOpen"
      @close="handleClose"
      text-color="#aeb2b7"
      active-text-color="#FF6C60"
    >
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

      <el-menu-item index="images">
        <i class="el-icon-document"></i>
        <span slot="title">用户图库</span>
      </el-menu-item>

      <el-menu-item>
        <i class="el-icon-document"></i>
        <router-link class="white-font" to="/user">返回用户列表</router-link>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "SideNav",
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  border-right: none;
  background-color: #1f2732;

  .el-menu-item:hover {
    span,
    i,
    a {
      color: #ff6c60 !important;
    }
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background: none;
  }
}
.white-font {
  color: #aeb2b7;
}
</style>
