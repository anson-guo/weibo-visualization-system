<template>
  <div class="search-box">
    <el-input v-model="user" class="search-input" placeholder="请输入用户昵称"></el-input>
    <el-button class="search-btn" icon="el-icon-search" circle></el-button>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      user: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  .search-btn {
    position: absolute;
    right: 0;
    border-radius: 0;
  }
}
</style>

