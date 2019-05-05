<template>
  <div>
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝年龄分布</h3>
          <p>以饼图的形式展示该用户的粉丝年龄分布情况</p>
          <age-piechart></age-piechart>
        </el-card>
      </el-col>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝性别分布</h3>
          <p>以饼图的形式展示该用户的粉丝性别分布情况</p>
          <sex-piechart></sex-piechart>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝的粉丝数量排序</h3>
          <p>以柱状图的形式展示该用户的粉丝的粉丝，从高到低排序并取前10位</p>
          <fans-histogram></fans-histogram>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AgePiechart from "../components/visual-components/AgePiechart";
import SexPiechart from "../components/visual-components/SexPiechart";
import FansHistogram from "../components/visual-components/FansHistogram";


export default {
  name: "FansData",
  components: {
    AgePiechart,
    SexPiechart,
    FansHistogram
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.col {
  box-sizing: border-box;
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
</style>


