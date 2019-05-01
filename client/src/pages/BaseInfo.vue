<template lang="html">
  <div class="base-info">
    <personal-info :userData="userData" :imgUrl="imgUrl"></personal-info>
    <hr />
    <d3-horizontal-bar-chart :userCharData="userCharData" title="图表数据展示"></d3-horizontal-bar-chart>

  </div>
</template>

<script>
import PersonalInfo from "./PageComponents/PersonalInfo";
import D3HorizontalBarChart from "../components/visual-components/D3HorizontalBarChart";

export default {
  name: "BaseInfo",
  components: {
    PersonalInfo,
    D3HorizontalBarChart
  },
  props: {
    userBaseInfo: Object
  },
  data() {
    return {
      userData: [], // 用户个人信息
      imgUrl: "", // 用户头像url地址
      userCharData: {} // 用户图表相关数据，粉丝数、关注数、微博数量等
    };
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
          value: val.data === "f" ? "女" : "男"
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
      this.userCharData[0] = {
        label: "粉丝数量",
        value: [val.fans_count || 0]
      };
      this.userCharData[1] = {
        label: "关注数量",
        value: [val.follows_count || 0]
      };
      this.userCharData[2] = {
        label: "微博数量",
        value: [val.weibos_count || 0]
      };
    }
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
