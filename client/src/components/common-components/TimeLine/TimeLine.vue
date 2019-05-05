<template>
  <div class="container">
    <h3>微博时间线</h3>
    <el-radio-group class="buttons" v-model="reverse">
      <el-radio :label="true">从过去到现在</el-radio>
      <el-radio :label="false">从现在到过去</el-radio>
    </el-radio-group>
    <el-timeline class="time-line" :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >{{activity.content}}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data() {
    return {
      reverse: false,
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more"
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87"
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large"
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../common/css/base.scss";
.container {
  width: 50%;
  position: relative;
  .buttons {
    position: absolute;
    top: 5px;
    left: 120px;
  }
  @media screen and (max-width: $smallSize) {
    width: 100%;
  }
  h3 {
    @include h3();
  }
  .time-line {
    text-align: left;
    padding-top: 10px;
  }
}
</style>


