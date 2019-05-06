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
      // weibos: [], // 用户的微博数据
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
            console.log(res.data);
            this.timeLineData = res.data;
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
