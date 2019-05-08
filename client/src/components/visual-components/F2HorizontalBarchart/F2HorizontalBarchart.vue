<template>
  <div class="chart-wrapper">
    <canvas class="horizontal-barchart" :id="container"></canvas>
  </div>
</template>

<script>
export default {
  name: "F2HorizontalBarchart",
  props: {
    container: String,
    sourceData: Array
  },
  methods: {
    init() {
      var Global = this.$F2.Global;

      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio,
        height:
          this.sourceData.length < 8
            ? 50 * this.sourceData.length
            : 35 * this.sourceData.length
      });

      chart.source(this.sourceData, {
        population: {
          tickCount: 5
        }
      });
      chart.coord({
        transposed: true
      });
      chart.axis("key", {
        line: Global._defaultAxis.line,
        grid: null
      });
      chart.axis("value", {
        line: null,
        grid: Global._defaultAxis.grid,
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
      chart.interval().position("key*value");
      chart.render();
    }
  },
  watch: {
    sourceData: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.horizontal-barchart {
  width: 100%;
  height: 50%;
}
</style>

