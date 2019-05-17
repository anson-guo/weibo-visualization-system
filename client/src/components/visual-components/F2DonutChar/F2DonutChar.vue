<template>
  <div>
    <div class="chart-wrapper">
      <canvas class="fans-se-char" :id="container"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "F2DonutChar",
  props: {
    container: String,
    charData: Array,
    total: Number
  },
  methods: {
    init() {
      var map = {};
      this.charData.map(function(obj) {
        map[obj.name] = obj.percent + "%";
      });

      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"]
      });
      chart.source(this.charData, {
        percent: {
          formatter: function formatter(val) {
            return val + "%";
          }
        }
      });
      chart.tooltip(false);
      chart.legend({
        position: "right",
        itemFormatter: function itemFormatter(val) {
          return val + "    " + map[val];
        }
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#3BA4FF", "#FE5D4D", "#737DDE"])
        .adjust("stack");

      chart.guide().html({
        position: ["50%", "45%"],
        html:
          '<div style="width: 250px;height: 40px;text-align: center;">' +
          '<div style="font-size: 16px">粉丝数</div>' +
          '<div style="font-size: 24px">' +
          this.total +
          "</div>" +
          "</div>"
      });
      chart.render();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.fans-se-char {
  width: 100%;
  height: 50%;
}
</style>

