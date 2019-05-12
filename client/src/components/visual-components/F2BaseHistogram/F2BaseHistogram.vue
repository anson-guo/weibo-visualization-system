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
    charData: Array,
    isShowText: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      var chart = new this.$F2.Chart({
        id: this.container,
        // height:
        pixelRatio: window.devicePixelRatio
      });

      chart.source(this.charData, {
        sales: {
          tickCount: 5
        }
      });
      chart.axis("key", {
        label: {
          rotate: -Math.PI / 9,
          textAlign: "end",
          textBaseline: "middle",
          marginBottom: 20
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

      // 柱状图添加文本
      if (this.isShowText) {
        this.charData.map(function(obj) {
          chart.guide().text({
            position: [obj.key, obj.value],
            content: obj.value,
            style: {
              textAlign: "center",
              textBaseline: "bottom"
            },
            offsetY: -4
          });
        });
      }

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
.f2BaseHistogram {
  width: 100%;
  height: 50%;
}
</style>

