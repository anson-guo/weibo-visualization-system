<template>
  <div class="chart-wrapper">
    <canvas class="basePiechar" :id="container"></canvas>
  </div>
</template>

<script>
export default {
  name: "F2BasePiechart",
  props: {
    container: String,
    charData: Array,
    map: Object
  },
  methods: {
    init() {
      const _this = this;
      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(_this.charData, {
        percent: {
          formatter: function formatter(val) {
            return val * 100 + "%";
          }
        }
      });
      chart.legend({
        position: "right",
        itemFormatter: function itemFormatter(val) {
          return val + "  " + _this.map[val];
        }
      });
      chart.tooltip(false);
      chart.coord("polar", {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", [
          "#1890FF",
          "#13C2C2",
          "#2FC25B",
          "#FACC14",
          "#F04864",
          "#8543E0"
        ])
        .adjust("stack")
        .style({
          lineWidth: 1,
          stroke: "#fff",
          lineJoin: "round",
          lineCap: "round"
        })
        .animate({
          appear: {
            duration: 1200,
            easing: "bounceOut"
          }
        });
      chart.render();
    }
  },
  watch: {
    charData: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.basePiechar {
  width: 100%;
  height: 50%;
}
</style>
