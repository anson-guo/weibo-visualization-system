<template>
  <div class="related-app">
    <time-line
      class="time-line"
      @clickSource="fetchDetailWeibo"
      v-if="timeLineData.length"
      :timeLineData="timeLineData"
    ></time-line>

    <div :class="{'detail-weibos': true, 'show': isShow, 'close': isClose}">
      <button @click="closeDetailWeibo">按钮</button>
      <h3>{{ source }}</h3>
      <p>用户一共通过 {{ source }} 发送了 {{ detailWeibos.length}} 条动态</p>
      <div v-for="(item, index) of detailWeibos" :key="index">
        <div class="weibo-item">
          <div v-html="item.text"></div>
          <p class="review">
            <span>{{item.created_at}}</span>
            <span>{{item.attitudes_count}}</span>
            <span>{{item.comments_count}}</span>
            <span>{{item.reposts_count}}</span>
          </p>
        </div>
        <hr style="border:0;background-color:#ff6c60;height:2px;">
      </div>
    </div>

    <div class="clear"></div>
  </div>
</template>

<script>
import TimeLine from "../components/common-components/TimeLine";

export default {
  name: "RelatedApp",
  components: {
    TimeLine
  },
  data() {
    return {
      timeLineData: [], // 用户微博时间线数据
      detailWeibos: [],
      isShow: false,
      isClose: false,
      source: ""
    };
  },
  methods: {
    /**
     * 获取微博数据
     */
    fetchWeiboData(callback) {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/weibo-timeline`;

      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          if (+res.status === 200) {
            this.timeLineData = res.data;
          }
        });
    },

    /**
     * 获取详细微博，根据source值
     */
    fetchDetailWeibo(item) {
      this.isShow = true;
      this.isClose = false;
      this.source = item;
      this.detailWeibos = [];

      this.$router.push({
        query: {
          source: item
        }
      });

      const params = {
        source: item
      };

      this.$axios
        .get("/api/user-info/weibo-timeline-detail", {
          params
        })
        .then(res => {
          const data = res.data;
          this.detailWeibos = data;
        });
    },

    /**
     * closeDetailWeibo
     */
    closeDetailWeibo() {
      this.isClose = true;
    }
  },
  created() {
    this.fetchWeiboData();
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";

.clear {
  clear: both;
}
.related-app {
  .time-line {
    float: left;
  }
  .detail-weibos {
    height: calc(100vh - 60px);
    padding: 5px 20px 5px 10px;
    box-sizing: border-box;
    background: lightgray;
    overflow: scroll;
    width: 400px;
    float: right;
    border-left: 3px solid darkgray;
    position: fixed;
    right: -400px;
    top: 60px;
    @media screen and (max-width: $smallSize) {
      width: 250px;
      right: -250px;
    }
  }
  .show {
    @include tran-horizontal(-100%, 0.4s);
  }
  .close {
    @include tran-horizontal(100%, 0.8s);
  }
}

.weibo-item {
  font-size: 14px;
  padding: 10px;
  width: 95%;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: left;
  text-indent: 1rem;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  border-radius: 5px;

  & /deep/ a {
    color: #303133;
    pointer-events: none;
  }

  @media screen and (max-width: $smallSize) {
  }
  .review {
    span {
      margin-left: 10px;
    }
  }
}
</style>
