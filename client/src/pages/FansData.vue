<template>
  <div>
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝年龄分布</h3>
          <p>以饼图的形式展示该用户的粉丝年龄分布情况</p>
          <f2-base-piechart container="fans-ages-char"></f2-base-piechart>
        </el-card>
      </el-col>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝性别分布</h3>
          <p>以饼图的形式展示该用户的粉丝性别分布情况</p>
          <f2-donut-char container="fans-sex-char"></f2-donut-char>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="col" :sm="24" :md="12" :lg="12">
        <el-card class="char-card">
          <h3>粉丝的粉丝数量排序</h3>
          <p>以柱状图的形式展示该用户的粉丝的粉丝，从高到低排序并取前10位</p>
          <f2-base-histogram container="fans-count-histogram"></f2-base-histogram>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import F2BasePiechart from "../components/visual-components/F2BasePiechart";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2DonutChar from "../components/visual-components/F2DonutChar";

export default {
  name: "FansData",
  components: {
    F2BasePiechart,
    F2BaseHistogram,
    F2DonutChar
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


