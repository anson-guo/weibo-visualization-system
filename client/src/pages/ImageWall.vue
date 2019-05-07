<template>
  <div class="container">
    <vue-waterfall-easy
      ref="waterfall"
      class="wall-img"
      :imgsArr="images"
      height="100vh"
      @click="clickFn"
      @scrollReachBottom="fetchNextUserWeiboData"
    >
      <div slot="waterfall-over">图片已经全部加载完毕</div>
    </vue-waterfall-easy>
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
  data() {
    return {
      images: [],
      page: 0
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

      const url = `/api/user-info/id/weibo-imageslist`;

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
          if (!data.isLast || this.page === 1) {
            this.images = this.images.concat(data.data);
          } else {
            this.$refs.waterfall.waterfallOver();
          }
        });
    }
  },
  mounted() {
    this.fetchNextUserWeiboData();
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
