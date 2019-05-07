<template>
  <div>
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>微博活跃度统计</h3>
          <p>根据用户发微博数据统计用户活跃度</p>

          <el-radio v-model="radio" label="1">周度</el-radio>
          <el-radio v-model="radio" label="2">月度</el-radio>
          <el-radio v-model="radio" label="3">年度</el-radio>

          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="饼图" name="source-first" :lazy="true">
              <f2-base-piechart container="activity-piechar"></f2-base-piechart>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="source-second" :lazy="true">
              <f2-base-histogram container="activity-histogram"></f2-base-histogram>
            </el-tab-pane>
            <el-tab-pane label="折线图" name="source-third" :lazy="true">
              <f2-base-linechar container="activity-linechar"></f2-base-linechar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>用户发博平台统计</h3>
          <p>以用户发送微博消息的设备或者其他三方平台为数据基础</p>
          <!-- <sex-piechart></sex-piechart> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import F2BasePiechart from "../components/visual-components/F2BasePiechart";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2BaseLinechar from "../components/visual-components/F2BaseLinechar";

export default {
  name: "WeiboData",
  components: { F2BasePiechart, F2BaseHistogram, F2BaseLinechar },
  data() {
    return { activeName: "source-first", radio: "1", lazyLoad: true };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
