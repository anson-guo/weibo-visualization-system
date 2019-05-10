<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import loadConsole from "./lib/console";

export default {
  name: "app",
  beforeCreate() {
    loadConsole();
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
