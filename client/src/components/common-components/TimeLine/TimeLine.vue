<template>
  <div id="line-container">
    <h3>微博时间线</h3>
    <el-radio-group class="buttons" v-model="reverse">
      <el-radio :label="false">从过去到现在</el-radio>
      <el-radio :label="true">从现在到过去</el-radio>
    </el-radio-group>
    <el-timeline id="time-line" class="time-line" :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in timeLineData"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >
        第一次使用
        <span class="item" @click="handleClickTimeLine(activity.content)">{{activity.content}}</span> 分享身边的新鲜事
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  props: {
    timeLineData: Array
  },
  data() {
    return {
      reverse: false,
    };
  },
  methods: {
    handleClickTimeLine(item) {
      this.$emit('clickSource', item);
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/css/base.scss";
#line-container {
  width: 50%;
  position: relative;
  .buttons {
    position: absolute;
    top: 16px;
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
  .el-radio {
    margin-right: 10px;
  }
}
.item {
  color: rgb(255, 108, 96);
  cursor: pointer;
}

// 覆盖时间线样式
#time-line {
  margin-left: 50px;
  .el-timeline-item__tail {
    height: 150px;
  }
  .el-timeline-item__wrapper {
    padding-bottom: 30px;

    .el-timeline-item__timestamp {
      position: relative;
      top: 29px;
      left: -105px;
    }

    .el-timeline-item__content {
      position: absolute;
      top: 40px;
    }
  }
}
</style>
