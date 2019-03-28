<template>
  <div>
    <el-row>
      <el-col>
        <el-input v-model="user" class="search-input" placeholder="请输入内容"></el-input>
        <el-button class="search-btn" icon="el-icon-search" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserSearch",
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

