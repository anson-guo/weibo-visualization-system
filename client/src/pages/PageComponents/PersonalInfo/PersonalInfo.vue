<!-- 
  用户基本信息展示
-->

<template>
  <div class="container">
    <div class="img">
      <img :src="imgUrl" alt="用户头像">
    </div>
    <div class="info">
      <p class="item" v-for="(item, index) of userData" :key="index">
        <span>{{item.label}} : </span> 
        <span>{{item.value ? item.value : '暂无相关数据'}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  props: {
    userData: Array,
    imgUrl: String
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .img {
    img {
      width: 100px;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding: 0 50px;

    .item {
      display: inline-block;
      width: 400px;
      margin-bottom: 0;
      margin-top: 10px;
      > span:first-of-type {
        color: #303133;
        font-size: 15px;
      }
      > span:last-of-type {
        color: #303133;
        line-height: 22px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
