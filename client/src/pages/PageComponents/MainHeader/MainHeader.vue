<!-- 
  用户页面头部组件
-->

<template>
  <div class="header-container">
    <div class="logo">
      <img src="../../../assets/logo.png">
    </div>
    <div class="info">
      <img :src="headerData.avatar" alt="头像">
      <span>用户用户名用</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    headerData: Object
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  .logo {
    float: left;
    img {
      margin-left: 40px;
      margin-top: 8px;
      width: 60px;
    }
  }
  &:after {
    content: "";
    display: block;
    visibility: hidden;
    clear: both;
  }
  .info {
    width: 200px;
    float: right;
    color: #303133;
    line-height: 60px;
    text-align: right;
    position: relative;
    img {
      width: 30px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-40px, -26px);
    }
    span {
      display: inline-block;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>


