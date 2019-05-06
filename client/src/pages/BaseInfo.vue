<template>
  <div class="base-info-container">
    <personal-info v-loading="loading" :userData="userData"></personal-info>
    <card-list :userCharData="userCharData"></card-list>
    <hr>
  </div>
</template>

<script>
import CardList from "./PageComponents/CardList";
import PersonalInfo from "./PageComponents/PersonalInfo";

export default {
  name: "BaseInfo",
  components: {
    PersonalInfo,
    CardList
  },
  data() {
    return {
      userData: [], // 用户个人信息，用于传递给子组件，循环渲染
      userCharData: {}, // 用户图表相关数据，粉丝数、关注数、微博数量、图片数量等
      userBaseInfo: {}, // 用户基本信息
      userWeiboImages: [], // 用户微博图片数据
      loading: true
    };
  },
  methods: {
    /**
     * 获取用户数据
     */
    fetchUserData() {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/base-info`;
      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          const data = res.data.data[0]; // 基本数据
          const num = res.data.imageNum; // 微博图片

          // 用户基本数据
          data.weiboImgs = num;
          this.userBaseInfo = data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchUserData();
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

      this.userCharData = {
        weibos: val.weibos_count,
        fans: val.fans_count,
        follows: val.follows_count,
        weiboImgs: val.weiboImgs
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.base-info-container {
  hr {
    background-color: #e6e6e6;
    height: 1px;
    border: none;
  }
}
</style>
