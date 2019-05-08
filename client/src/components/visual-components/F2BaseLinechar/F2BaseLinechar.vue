<template>
  <div class="chart-wrapper">
    <canvas class="sourceLinechar" :id="container"></canvas>
  </div>
</template>

<script>

export default {
  name: "F2BaseLinechar",
  props: {
    container: String,
    activityData: Array
  },
  methods: {
    init() {
      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(this.activityData, {
        value: {
          tickCount: 5,
          min: 0
        },
        day: {
          range: [0, 1]
        }
      });
      chart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = null;
          items[0].value = `${items[0].value}条`;
        }
      });
      chart.axis("day", {
        label: function label(text, index, total) {
          var textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      chart.line().position("key*value");
      chart
        .point()
        .position("key*value")
        .style({
          stroke: "#fff",
          lineWidth: 1
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
.sourceLinechar {
  width: 100%;
  height: 50%;
}
</style>
