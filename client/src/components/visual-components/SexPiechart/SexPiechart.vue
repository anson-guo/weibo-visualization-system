<!-- 
component name: 性别分布饼图
props: sexData
example: 
  var data = [
    {
      item: "男性",
      count: 40,
      percent: 0.4
    },
    {
      item: "女性",
      count: 60,
      percent: 0.6
    }
  ];
-->

<template>
  <div id="sexPiechart"></div>
</template>

<script>
export default {
  name: "SexPiechart",
  props: {
    sexData: Array
  },
  data() {
    return {};
  },
  mounted() {
    var chart = new this.$G2.Chart({
      container: "sexPiechart",
      // forceFit: true,
      height: 300
    });
    chart.source(this.sexData, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    chart.coord("theta", {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart
      .intervalStack()
      .position("percent")
      .color("item")
      .label("percent", {
        formatter: function formatter(val, item) {
          return item.point.item + ": " + val;
        }
      })
      .tooltip("item*percent", function(item, percent) {
        percent = percent * 100 + "%";
        return {
          name: item,
          value: percent
        };
      })
      .style({
        lineWidth: 1,
        stroke: "#fff"
      });
    chart.render();
  }
};
</script>

<style lang="scss" scoped>
</style>
