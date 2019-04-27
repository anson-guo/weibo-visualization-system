<!-- 
  用户基本信息展示
-->

<template>
  <div class="container">
    <div class="img">
      <img
        src="https://tvax1.sinaimg.cn/crop.0.0.664.664.180/006bQE56ly8fw956xioj6j30ig0ihjsm.jpg"
        alt
      >
    </div>
    <div class="info">
      <p class="item">
        <span>昵称：</span>
        <span>小红帽</span>
      </p>
      <p class="item">
        <span>Id：</span>
        <span>3217154095</span>
      </p>
      <p class="item">
        <span>性别：</span>
        <span>男</span>
      </p>
       <p class="item">
        <span>描述：</span>
        <span>傾我至誠</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .info {
    flex: 1;
    padding: 0 50px;
    .item {
      display: inline-block;
      width: 400px;
      margin-bottom: 0;
      > span:first-of-type {
        color: #343434;

      }
      > span:last-of-type {
        color: #303133;
        line-height: 22px;
        font-size: 14px;
      }
    }

  }
}
</style>
