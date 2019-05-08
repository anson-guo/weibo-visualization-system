<template>
  <div class="weibo-data">
    <el-menu
      default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      background-color="gray"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSubmenuClick"
    >
      <el-menu-item index="1">微博活跃度统计</el-menu-item>
      <el-menu-item index="2">用户发博平台统计</el-menu-item>
    </el-menu>

    <el-row type="flex" justify="center">
      <el-col v-if="currentMenuContent === 1" class="col" :sm="24" :md="16" :lg="16">
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
            <el-tab-pane label="柱状图" name="activity-histogram" :lazy="true">
              <f2-base-histogram :activityData="activityData" container="activity-histogram"></f2-base-histogram>
            </el-tab-pane>
            <el-tab-pane label="折线图" name="activity-linechar" :lazy="true">
              <f2-base-linechar :activityData="activityData" container="activity-linechar"></f2-base-linechar>
            </el-tab-pane>
            <el-tab-pane label="玫瑰饼图" name="activity-piechar" :lazy="true">
              <f2-rose-piechar :activityData="activityData" container="activity-piechar"></f2-rose-piechar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col v-if="currentMenuContent === 2" class="col" :sm="24" :md="16" :lg="16">
        <el-card class="char-card">
          <h3>用户发博平台统计</h3>
          <p>以用户发送微博消息的设备或者其他三方平台为数据基础</p>
          <f2-horizontal-barchart :sourceData="sourceData" container="source-barchar"></f2-horizontal-barchart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import F2RosePiechar from "../components/visual-components/F2RosePiechar";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2BaseLinechar from "../components/visual-components/F2BaseLinechar";
import F2HorizontalBarchart from "../components/visual-components/F2HorizontalBarchart";

import { mapWeek, mapMonth } from "../lib/const";

export default {
  name: "WeiboData",
  components: {
    F2RosePiechar,
    F2BaseHistogram,
    F2BaseLinechar,
    F2HorizontalBarchart
  },
  data() {
    return {
      tabActiveName: "activity-histogram", // activity-piechar - 饼图，activity-histogram - 柱状图，activity-linechar - 折线图
      period: "month", // week - 周， month - 月， year - 年
      lazyLoad: true,
      activityData: [],
      sourceData: [],
      currentMenuContent: 1
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
          const data = res.data;
          this.formatActivityDataLabel(data);
        });
    },

    /**
     * 格式化 微博活跃度统计 图表的图例
     */
    formatActivityDataLabel(data) {
      switch (this.period) {
        case "week":
          data.forEach(item => {
            item.key = mapWeek(item.key);
          });
          break;
        case "month":
          data.forEach(item => {
            item.key = mapMonth(item.key);
          });
          break;
        case "year":
          data.forEach(item => {
            item.key = `${item.key}年`;
          });
          break;
      }
      this.activityData = data;
    },

    /**
     * 获取 用户发博平台统计 图表数据
     */
    fetchWeiboSource() {
      const id = this.$route.path.split("/")[2];

      this.$axios
        .get(`/api/user-info/${id}/weibo-source-data`, {})
        .then(res => {
          const data = res.data;
          this.sourceData = data;
        });
    },

    /**
     *
     *
     */
    handleSubmenuClick(index) {
      this.currentMenuContent = +index;
    }
  },
  created() {
    this.fetchActivityData();
    this.fetchWeiboSource();
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";

.weibo-data {
  .el-menu--horizontal {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
    .is-active {
      color: #ffffff !important;
      border-bottom-color: #c92828 !important;
    }
  }
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
