<template>
  <div>
    <time-line v-if="timeLineData.length" :timeLineData="timeLineData"></time-line>
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
      const url = `/api/user-info/${id}/weibo-timeline`;

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
  created() {
    this.fetchWeiboData();
  }
};
</script>

<style lang="scss" scoped>
</style>
