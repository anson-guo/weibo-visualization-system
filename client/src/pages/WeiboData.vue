<template>
  <div class="weibo-data">
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>微博活跃度统计</h3>
          <p class="description">根据用户发微博数据统计用户活跃度</p>

          <p>
            <el-radio-group v-model="period" @change="fetchActivityData">
              <el-radio label="week">周度</el-radio>
              <el-radio label="month">月度</el-radio>
              <el-radio label="year">年度</el-radio>
            </el-radio-group>
          </p>

          <el-tabs v-model="tabActiveName" @tab-click="handleTabsClick">
            <el-tab-pane label="玫瑰饼图" name="activity-piechar" :lazy="true">
              <f2-rose-piechar :activityData="activityData" container="activity-piechar"></f2-rose-piechar>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="activity-histogram" :lazy="true">
              <f2-base-histogram :activityData="activityData" container="activity-histogram"></f2-base-histogram>
            </el-tab-pane>
            <el-tab-pane label="折线图" name="activity-linechar" :lazy="true">
              <f2-base-linechar :activityData="activityData" container="activity-linechar"></f2-base-linechar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>用户发博平台统计</h3>
          <p>以用户发送微博消息的设备或者其他三方平台为数据基础</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import F2RosePiechar from "../components/visual-components/F2RosePiechar";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2BaseLinechar from "../components/visual-components/F2BaseLinechar";

export default {
  name: "WeiboData",
  components: { F2RosePiechar, F2BaseHistogram, F2BaseLinechar },
  data() {
    return {
      tabActiveName: "activity-piechar", // activity-piechar - 饼图，activity-histogram - 柱状图，activity-linechar - 折线图
      period: "month", // week - 周， month - 月， year - 年
      lazyLoad: true,
      activityData: []
    };
  },
  methods: {
    /**
     * 处理 微博活跃度统计 卡片中tab点击事件
     */
    handleTabsClick(tab) {
      this.tabActiveName = tab.name;
      this.fetchActivityData();
    },

    /**
     * 获取 微博活跃度统计 图表数据
     * 按 周、月、年 并且 饼图、柱状图、折线图 返回满足要求的数据格式
     */
    fetchActivityData() {
      const params = {
        tabActiveName: this.tabActiveName,
        period: this.period
      };
      const id = this.$route.path.split("/")[2];

      this.$axios
        .get(`/api/user-info/${id}/weibo-activity-data`, { params })
        .then(res => {
          this.activityData = res.data;
        });
    }
  },
  created() {
    this.fetchActivityData();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";

.weibo-data {
  .char-card {
    h3 {
      font-size: 14px;
      text-align: left;
    }
    p {
      text-align: left;
      font-size: 12px;
    }
  }
}
</style>
