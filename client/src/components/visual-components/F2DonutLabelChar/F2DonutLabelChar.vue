<template>
  <div class="chart-wrapper">
    <canvas class="f2DonutLabelChar" :id="container"></canvas>
  </div>
</template>

<script>
const PieLabel = require("@antv/f2/lib/plugin/pie-label"); // 引入 PieLabel 模块

export default {
  name: "F2DonutLabelChar",
  props: {
    container: String,
    charData: Array
  },
  methods: {
    init() {
      var chart = new this.$F2.Chart({
        id: this.container,
        plugins: PieLabel,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.charData);
      chart.coord("polar", {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5
      });
      chart.axis(false);
      chart.legend(false);
      chart.tooltip(false);
      chart.guide().html({
        position: ["50%", "50%"],
        html:
          '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
      });
      chart
        .interval()
        .position("const*value")
        .adjust("stack")
        .color("key", [
          "#1890FF",
          "#13C2C2",
          "#2FC25B",
          "#FACC14",
          "#b76d30",
          "#ad3c34",
          "#76246e",
          "#dc3b33"
        ]);
      chart.pieLabel({
        sidePadding: 30,
        activeShape: true,
        label1: function label1(data) {
          return {
            text: `${data.value}个`,
            fill: "#343434",
            fontWeight: "bold"
          };
        },
        label2: function label2(data) {
          return {
            text: data.key,
            fill: "#999"
          };
        },
        onClick: function onClick(ev) {
          var data = ev.data;
          if (data) {
            $("#title").text(data.key);
            $("#money").text(data.value);
          }
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
.f2DonutLabelChar {
  width: 100%;
  height: 50%;
}
</style>
