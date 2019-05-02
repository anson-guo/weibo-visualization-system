<!-- 
  用户页面头部组件
-->

<template>
  <div class="header-container">
    <div class="logo">
      D3
      <span>LAB</span>
    </div>
    <div class="info">
      <img :src="headerData.avatar" alt="头像">
      <span>{{ headerData.name }}</span>
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
    margin-left: 42px;
    line-height: 60px;
    font-size: 22px;
    color: #2e2e2e;
    span {
      color: #ff6c60;
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


