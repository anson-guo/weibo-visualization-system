<template>
  <div class="chart-wrapper">
    <canvas class="rosePiechar" :id="container"></canvas>
  </div>
</template>

<script>
export default {
  name: "F2RosePiechar",
  props: {
    container: String,
    activityData: Array
  },
  methods: {
    init() {
      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio,
        width: 400,
        height: 400
      });
      chart.source(this.activityData);
      chart.coord("polar");
      chart.legend({
        position: "bottom"
      });
      chart.axis(false);
      chart
        .interval()
        .position("key*value")
        .color("key")
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.render();
    }
  },
  watch: {
    activityData: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.rosePiechar {
  width: 100%;
  height: 50%;
}
</style>

