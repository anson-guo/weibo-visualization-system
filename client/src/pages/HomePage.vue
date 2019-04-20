<template>
  <div class="home">
    <video
      src="../assets/Over-the-Map.mp4"
      autoplay="true"
      poster="../assets/Over-the-Map.jpg"
      loop="true"
    >抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以下载并用你喜欢的播放器观看!</video>

    <el-container class="container">
      <el-header class="header">
        <h1>基于 D3 的微博数据可视化系统</h1>
      </el-header>

      <el-main>
        <img class="info-pic" src="../assets/home.png" alt="图标">
        <div class="info">
          <p>———— 一个集数据采集和数据可视化与一体的微博数据可视化平台</p>
          <div class="info-btn">
            <el-button type="primary">
              <router-link to="/user">查找用户</router-link>
            </el-button>
            <el-button type="primary">
              <router-link to>热门微博</router-link>
            </el-button>
          </div>
        </div>
      </el-main>

      <el-footer class="footer">
        <span>郭敬安 |</span> 四川师范大学
      </el-footer>
    </el-container>
  </div>
</template>

  
<script>
const axios = require("axios");

export default {
  name: "HomePage",
  components: {},
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  width: 70%;
  background: rgba($color: #f6f6f6, $alpha: 0.3);
  border-radius: 15px;
  color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .header {
    padding-top: 50px;
    text-align: center;
    font-size: 24px;
  }
  .info-pic {
    width: 200px;
    float: left;
  }
  .info {
    float: left;
    padding: 20px 30px;
    p {
      padding-top: 30px;
    }
    .info-btn {
      margin-top: 80px;
      text-align: center;
      button {
        margin: 0 30px;
        &:hover {
          a {
            color: #ffffff;
          }
        }
        a {
          color: #3f3f3f;
          text-decoration: none;
        }
      }
    }
  }
  .footer {
    text-align: right;
    span {
      font-size: 20px;
    }
  }
}
</style>
