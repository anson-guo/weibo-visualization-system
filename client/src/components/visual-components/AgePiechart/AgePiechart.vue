<!-- 
component name: 性别分布饼图
-->

<template>
  <div class="chart-wrapper">
    <canvas id="mountNode"></canvas>
  </div>
</template>

<script>
export default {
  name: "AgePiechart",
  props: {
    ageData: Array
  },
  data() {
    return {
      map: {
        "14岁以下": "40%",
        "[14, 18]": "20%",
        "[19, 24]": "15%",
        "[25, 30]": "5%",
        "30岁以上": "2%"
      },
      testData: [
        {
          name: "14岁以下",
          percent: 0.4,
          a: "1"
        },
        {
          name: "[14, 18]",
          percent: 0.2,
          a: "1"
        },
        {
          name: "[19, 24]",
          percent: 0.18,
          a: "1"
        },
        {
          name: "[25, 30]",
          percent: 0.15,
          a: "1"
        },
        {
          name: "30岁以上",
          percent: 0.02,
          a: "1"
        }
      ]
    };
  },
  mounted() {
    const _this = this;
    var chart = new this.$F2.Chart({
      id: "mountNode",
      pixelRatio: window.devicePixelRatio
    });
    chart.source(_this.testData, {
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
};
</script>

<style lang="scss" scoped>
#mountNode {
  display: inline-block;
  width: 100%;
  height: 50%;
}
</style>


