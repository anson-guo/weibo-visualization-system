<template>
  <div class="chart-wrapper">
    <canvas class="f2BaseHistogram" :id="container"></canvas>
  </div>
</template>

<script>
export default {
  name: "F2BaseHistogram",
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
          items[0].value = `${items[0].value}条`;
        }
      });
      chart.interval().position("key*value");
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
.f2BaseHistogram {
  width: 100%;
  height: 50%;
}
</style>

