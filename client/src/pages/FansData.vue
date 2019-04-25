<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card>
          粉丝性别分布
          <sex-piechart :sexData="sexData"></sex-piechart>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card>
          粉丝年龄分布
          <age-piechart :ageData="ageData"></age-piechart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SexPiechart from "../components/visual-components/SexPiechart";
import AgePiechart from "../components/visual-components/AgePiechart";

var sexData = [
  {
    item: "男性",
    count: 40,
    percent: 0.4
  },
  {
    item: "女性",
    count: 60,
    percent: 0.6
  }
];

var ageData = [
  {
    item: "14岁以下",
    count: 40,
    percent: 0.4
  },
  {
    item: "15-18",
    count: 21,
    percent: 0.21
  },
  {
    item: "18-24",
    count: 17,
    percent: 0.17
  },
  {
    item: "24-30",
    count: 13,
    percent: 0.13
  },
  {
    item: "其他(含未知年龄)",
    count: 9,
    percent: 0.09
  }
];

export default {
  name: "FansData",
  components: {
    SexPiechart,
    AgePiechart
  },
  data() {
    return {
      sexData: sexData,
      ageData: ageData
    };
  }
};
</script>

<style lang="scss" scoped>
</style>


