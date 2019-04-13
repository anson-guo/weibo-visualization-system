<template>
  <div class="home">
    <div class="container">
      <h1>基于 D3 的微博数据可视化系统</h1>

      <div class="foot">
        <el-button type="primary">
          <router-link to="/user-search">查找用户</router-link>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import AreaChart from "../components/visual-components/AreaChart";
import FDemo from "../components/visual-components/FDemo";

export default {
  name: "HomePage",
  components: {
    AreaChart,
    FDemo
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  .container {
    width: 75%;
    height: 50vh;
    border:2px solid  lightblue;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      text-align: center;
      color: #3f3f3f;
    }
    .foot {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
