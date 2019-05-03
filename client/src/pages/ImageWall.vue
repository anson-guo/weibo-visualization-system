<template>
  <div class="container">
    <vue-waterfall-easy
      ref="waterfall"
      class="wall-img"
      :imgsArr="images"
      height="100vh"
      @click="clickFn"
      @scrollReachBottom="fetchNextUserWeiboData"
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
      images: this.userWeiboImages,
      page: 1
    };
  },
  methods: {
    /**
     * 处理点击图片事件
     */
    clickFn() {
      // event.preventDefault(); // 禁止跳转
    },
    /**
     * 处理滚动到容器底部后获取下一页图片
     */
    fetchNextUserWeiboData() {
      this.page++;
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/id/weibo-images`;

      const params = {
        page: this.page
      };

      this.$router.push({
        query: {
          page: this.page
        }
      });
      this.$axios
        .get(url, {
          params
        })
        .then(res => {
          const data = res.data;
          if (!data.isLast) {
            this.images = this.images.concat(data.data);
          } else {
            console.log('end');
            this.$refs.waterfall.waterfallOver();
          }
        });
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
