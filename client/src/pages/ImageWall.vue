<template>
  <div class="container">
    <vue-waterfall-easy
      class="wall-img"
      :imgsArr="userWeiboImages"
      height="100vh"
      @click="clickFn"
      @scrollReachBottom="getImageData"
    ></vue-waterfall-easy>
  </div>
</template>

<script>
import { Image } from "element-ui";
import VueWaterfallEasy from "vue-waterfall-easy";

export default {
  name: "ImageWall",
  components: {
    VueWaterfallEasy
  },
  props: {
    userWeiboImages: Array
  },
  data() {
    return {
      images: []
    }
  },
  methods: {
    /**
     * 处理点击图片事件
     */
    clickFn() {
      // event.preventDefault(); // 禁止跳转
    },
    /**
     * 处理滚动到容器底部后获取数据
     */
    getImageData() {
      console.log('here');
    }
  },
  watch: {
    userWeiboImages(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
@import "../common/css/base.scss";
@media screen and (max-width: $smallSize) {
  .img-wraper {
    width: 100% !important;
    height: auto !important;
  }
}
</style>
