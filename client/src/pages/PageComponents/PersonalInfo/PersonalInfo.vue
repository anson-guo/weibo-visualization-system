<!-- 
  用户基本信息展示
-->

<template>
  <div class="base-info">
    <h3 class="subtitle">基本信息</h3>
    <el-row :gutter="24" class="info">
      <el-col :sm="24" :md="12" :lg="12" v-for="(item, index) of userData" :key="index">
        <p class="item">
          <span>{{item.label}} :</span>
          <span>{{item.value ? item.value : '暂无相关数据'}}</span>
        </p>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  props: {
    userData: Array
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/css/base.scss";
h3 {
  @include h3();
}
.info {
  padding-left: 15px;
  margin-bottom: 20px;
}
.item {
  text-align: left;
  margin-bottom: 0;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  > span:first-of-type {
    color: #303133;
    font-size: 15px;
  }
  > span:last-of-type {
    color: #303133;
    line-height: 22px;
    font-size: 14px;
  }
}
</style>
