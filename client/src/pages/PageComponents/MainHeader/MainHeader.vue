<!-- 
  用户页面头部组件
-->

<template>
  <div class="header-container">
    <div class="logo">
      <img
        src="../../../assets/logo.png"
        alt="logo"
        @click="() => {this.$router.push({ path: '/' });}"
      >
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
@import "../../../common/css/base.scss";

.header-container {
  height: 60px;
  .logo {
    float: left;
    margin-top: 5px;
    line-height: 60px;
    font-size: 22px;
    img {
      width: 160px;
      cursor: pointer;
    }
  }
  &:after {
    @include clearfix();
  }
  .info {
    float: right;
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


