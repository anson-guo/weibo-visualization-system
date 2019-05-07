<template>
  <div class="chart-wrapper">
    <canvas class="f2BaseHistogram" :id="container"></canvas>
  </div>
</template>

<script>
var data = [
  
  {
    year: "1958 年",
    sales: 48
  },
  {
    year: "1959 年",
    sales: 38
  },
  {
    year: "1990 年",
    sales: 38
  },
  {
    year: "1992 年",
    sales: 38
  },
  {
    year: "1996 年",
    sales: 38
  },
  {
    year: "1997 年",
    sales: 38
  }
];

export default {
  name: "F2BaseHistogram",
  props: {
    container: String
  },
  methods: {
    init() {
      var chart = new this.$F2.Chart({
        id: this.container,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          var items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = "¥ " + items[0].value;
        }
      });
      chart.interval().position("year*sales");
      chart.render();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.f2BaseHistogram {
  width: 100%;
  height: 50%;
}
</style>

