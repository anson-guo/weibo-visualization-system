<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>

<script>
export default {
  name: "NumberGrow",
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 720000
    }
  },
  methods: {
    numberGrow(ele) {
      let _this = this;

      let step = (_this.value * 10) / (_this.time * 1000);
      let current = 0;
      let start = 0;
      let t = setInterval(function() {
        start += step;
        if (start > _this.value) {
          clearInterval(t);
          start = _this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current
          .toString()
          .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
      }, 10);
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow);
  }
};
</script>

<style>
.number-grow-warp {
  transform: translateZ(0);
}
.number-grow {
  font-family: "Arial-BoldMT";
  font-size: 64px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  display: block;
  line-height: 64px;
}
</style>