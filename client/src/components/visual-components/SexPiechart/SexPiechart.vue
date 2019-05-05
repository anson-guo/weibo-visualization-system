<template>
  <div>
    <div class="chart-wrapper">
      <canvas id="fansSexNode"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "SexPiechart",
  mounted() {
    var data = [
      {
        name: "男性",
        percent: 83.59,
        a: "1"
      },
      {
        name: "女性",
        percent: 2.17,
        a: "1"
      },
      {
        name: "未知性别",
        percent: 14.24,
        a: "1"
      }
    ];

    var map = {};
    data.map(function(obj) {
      map[obj.name] = obj.percent + "%";
    });

    var chart = new this.$F2.Chart({
      id: "fansSexNode",
      pixelRatio: window.devicePixelRatio,
      padding: [20, "auto"]
    });
    chart.source(data, {
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
      .color("name", ["#FE5D4D", "#3BA4FF", "#737DDE"])
      .adjust("stack");

    chart.guide().html({
      position: ["50%", "45%"],
      html:
        '<div style="width: 250px;height: 40px;text-align: center;">' +
        '<div style="font-size: 16px">粉丝总数</div>' +
        '<div style="font-size: 24px">133</div>' +
        "</div>"
    });
    chart.render();
  }
};
</script>

<style lang="scss" scoped>
#fansSexNode {
  width: 100%;
  height: 50%;
}
</style>

