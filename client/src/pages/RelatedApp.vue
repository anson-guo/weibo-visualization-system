<template>
  <div class="related-app">
    <time-line
      class="time-line"
      @clickSource="fetchDetailWeibo"
      v-if="timeLineData.length"
      :timeLineData="timeLineData"
    ></time-line>

    <div
      @click="closeDetailWeibo"
      :class="{'detail-weibos': true, 'show': isShow, 'close': isClose}"
      :loading="loading"
    >
      <h3>{{ source }}</h3>
      <p>
        用户一共通过
        <span class="font-red">{{ source }}</span> 发送了
        <span class="font-weight">{{ detailWeibos.length}}</span> 条动态
      </p>
      <div v-for="(item, index) of detailWeibos" :key="index">
        <div class="weibo-item">
          <div v-html="item.text"></div>
          <p class="review">
            <span class="iconfont icon-shijian"></span>
            <span>{{item.created_at ? item.created_at : 0}}</span>
            <span class="iconfont icon-dianzan"></span>
            <span>{{item.attitudes_count ? item.attitudes_count : 0}}</span>
            <span class="iconfont icon-pinglun"></span>
            <span>{{item.comments_count ? item.comments_count : 0}}</span>
            <span class="iconfont icon-web-icon-"></span>
            <span>{{item.reposts_count ? item.reposts_count : 0}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="clear"></div>
  </div>
</template>

<script>
import TimeLine from "../components/common-components/TimeLine";

import { Loading } from "element-ui";

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
      source: "",
      loading: true
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

      const loading = this.$loading({
        target: ".detail-weibos",
        fullscreen: false
      });

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
          this.$nextTick(() => {
            loading.close();
          });
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
  .font-red {
    color: rgb(255, 108, 96);
  }
  .font-weight {
    font-weight: bold;
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
    .close-btn {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 555;
    }
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
  .review {
    span {
      &:nth-of-type(odd) {
        padding-right: 2px;
        font-size: 13px;
      }
      &:nth-of-type(even) {
        margin-right: 15px;
      }
    }
  }

  @media screen and (max-width: $smallSize) {
    .review {
      span {
        &:nth-of-type(odd) {
          padding-right: 2px;
          font-size: 13px;
        }
        &:nth-of-type(even) {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
