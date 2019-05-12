<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :sm="24" :md="12" :lg="6">
        <div class="grid-content bg-purple card">
          <div class="card-left green">
            <i class="el-icon-edit"></i>
          </div>
          <div class="card-right">
            <number-grow v-if="userCharData.weibos" :value="userCharData.weibos"></number-grow>
            <p>微博</p>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <div class="grid-content bg-purple card">
          <div class="card-left red">
            <i class="el-icon-share"></i>
          </div>
          <div class="card-right">
            <number-grow v-if="userCharData.fans" :value="userCharData.fans"></number-grow>
            <p>粉丝</p>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <div class="grid-content bg-purple card">
          <div class="card-left yellow">
            <i class="el-icon-view"></i>
          </div>
          <div class="card-right">
            <number-grow v-if="userCharData.follows" :value="userCharData.follows"></number-grow>
            <p>关注</p>
          </div>
        </div>
      </el-col>
      <el-col :sm="24" :md="12" :lg="6">
        <div class="grid-content bg-purple card">
          <div class="card-left blue">
            <i class="el-icon-picture"></i>
          </div>
          <div class="card-right">
            <number-grow v-if="userCharData.weiboImgs" :value="userCharData.weiboImgs"></number-grow>
            <p>图片</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NumberGrow from "../../../components/common-components/NumberGrow";

export default {
  name: "CardList",
  components: {
    NumberGrow
  },
  props: {
    userCharData: Object
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
}
.el-col {
  margin-bottom: 10px;
}
.card {
  display: flex;
  height: 100px;
  text-align: center;
  background: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  .card-left {
    width: 40%;
    color: #fff;
    font-size: 40px;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .card-right {
    width: 60%;
    text-align: center;
    padding-top: 20px;
    color: #303133;
    p {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
.green {
  background: #6ccac9;
}
.red {
  background: #ff6c60;
}
.yellow {
  background: #f8d347;
}
.blue {
  background: #57c8f2;
}
</style>


