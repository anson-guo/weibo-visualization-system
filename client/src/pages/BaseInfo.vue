<template>
  <div class="base-info">
    <personal-info :userData="userData" :imgUrl="imgUrl"></personal-info>
    <card-list :userCharData="userCharData"></card-list>
    <hr>
    <time-line v-if="timeLineData.length" :timeLineData="timeLineData"></time-line>
  </div>
</template>

<script>
import CardList from "./PageComponents/CardList";
import PersonalInfo from "./PageComponents/PersonalInfo";
import TimeLine from "../components/common-components/TimeLine";

export default {
  name: "BaseInfo",
  components: {
    PersonalInfo,
    CardList,
    TimeLine
  },
  props: {
    userBaseInfo: Object
  },
  data() {
    return {
      userData: [], // 用户个人信息
      imgUrl: "", // 用户头像url地址
      userCharData: {}, // 用户图表相关数据，粉丝数、关注数、微博数量、图片数量等
      weibos: [], // 用户的微博数据
      timeLineData: [] // 用户微博时间线数据
    };
  },
  methods: {
    /**
     * 获取微博数据
     */
    fetchWeiboData(callback) {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/weibos`;

      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          if (+res.status === 200) {
            this.weibos = res.data;
            this.formatTimeLineData();
          }
        });
    },

    /**
     * 构造时间线格式的数据
     */
    formatTimeLineData() {
      const sources = this.weibos.map((item, index) => {
        return item.source;
      });

      const sourceList = new Set(sources);

      // 获取第一条微博
      this.timeLineData.push({
        content: "微博",
        timestamp: this.weibos[0].created_at,
        color: "#0bbd87"
      });

      const colorList = ["#cd484d", "#ec8b7a", "#edb789", "#eee7cb", "#eee7cb"];

      const _this = this;
      this.weibos.forEach((item, index) => {
        if (sourceList.has(item.source)) {
          _this.timeLineData.push({
            content: item.source,
            timestamp: item.created_at,
            color: colorList[index % colorList.length]
          });
          sourceList.delete(item.source);
        }
      });
    }
  },
  watch: {
    userBaseInfo(val) {
      this.userData = [
        {
          label: "姓名",
          value: val.name
        },
        {
          label: "性别",
          value: val.gender === "f" ? "女" : "男"
        },
        {
          label: "描述",
          value: val.description
        },
        {
          label: "微博条数",
          value: val.weibos_count + " 条"
        },
        {
          label: "粉丝数",
          value: val.fans_count + " 个"
        },
        {
          label: "关注数",
          value: val.follows_count + " 个"
        },
        {
          label: "是否为认证用户",
          value: val.verified ? "是" : "否"
        },
        {
          label: "认证理由",
          value: val.verified_reason
        },
        {
          label: "注",
          value: `该用户的微博数据抓取时间为 ${val.crawled_at}，仅供参考`
        }
      ];
      this.imgUrl = val.avatar;
      this.userCharData = {
        weibos: val.weibos_count,
        fans: val.fans_count,
        follows: val.follows_count,
        weiboImgs: val.weiboImgs
      };
    }
  },
  created() {
    this.fetchWeiboData();
  }
};
</script>

<style lang="scss" scoped>
.base-info {
  hr {
    background-color: #e6e6e6;
    height: 1px;
    border: none;
  }
}
</style>
