<template>
  <div class="chart-wrapper">
    <canvas id="fansData"></canvas>
  </div>
</template>

<script>
export default {
  name: "FansHistogram",
  mounted() {
    var data = [
      {
        name: "逆旅wy",
        sales: 138
      },
      {
        name: "园刂腥端俣355",
        sales: 123
      },
      {
        name: "2022Tnnss",
        sales: 110
      },
      {
        name: "G_EFE",
        sales: 100
      },
      {
        name: "鲜花思言_96215",
        sales: 49
      },
      {
        name: "毕竟是书生1996",
        sales: 39
      },
      {
        name: "1960",
        sales: 38
      },
      {
        name: "会走路的梦",
        sales: 38
      },
      {
        name: "走路",
        sales: 31
      },
      {
        name: "这是我的id",
        sales: 20
      }
    ];
    var chart = new this.$F2.Chart({
      id: "fansData",
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
        items[0].value = items[0].value + "个";
      }
    });
    chart.interval().position("name*sales");
    chart.render();
  }
};
</script>

<style lang="scss" scoped>
#fansData {
  width: 100%;
  height: 50%;
}
</style>


