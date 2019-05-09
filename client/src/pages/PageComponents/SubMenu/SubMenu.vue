<template>
  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    background-color="gray"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelectMenu"
  >
    <el-menu-item v-for="(item, num) of tabsTitle" :key="num" :index="'' + (num + 1) ">{{ item }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SubMenu",
  props: {
    tabsTitle: Array
  },
  methods: {
    handleSelectMenu(index) {
      this.$emit("changeTabs", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-demo {
  position: fixed;
  z-index: 999;
  width: 100%;
  overflow-x: scroll;
  display: flex;
}
.el-menu--horizontal {
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .is-active {
    color: #ffffff !important;
    border-bottom-color: #c92828 !important;
  }
}
</style>
