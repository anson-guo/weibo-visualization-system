<!-- 
  用户页面头部组件
-->

<template lang="html">
  <div
    class="header-container">
    <div class="info">
      <div class="info-img">
        <img
          :src="headerData.avatar"
          alt="头像"
        >
      </div>
      <h3>{{headerData.name}}</h3>
      <p>{{ headerData.description}}</p>
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
  height: 200px;
  background-color: #293c55;
  .info {
    text-align: center;
    color: #ffffff;
    .info-img {
      padding-top: 30px;
      img {
        width: 90px;
        border-radius: 50%;
      }
    }
    h3 {
      margin: 8px 0;
    }
    p {
      margin: 0;
      font-size: 14px;
    }
  }
}
</style>


