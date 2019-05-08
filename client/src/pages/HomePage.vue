<template>
  <div class="home">
    <video
      class="home-video"
      src="../assets/home-bg-video.mp4"
      autoplay="true"
      poster="../assets/home-bg-video.jpg"
      loop="true"
    >抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以下载并用你喜欢的播放器观看!</video>

    <el-container class="container">
      <el-header class="header">
        <h1>基于Web技术的微博数据可视化系统</h1>
      </el-header>

      <el-main>
        <img class="info-pic" src="../assets/home.png" alt="图标">
        <div class="info">
          <p>一个集数据采集和数据可视化与一体的微博数据可视化平台</p>
          <div class="info-btn">
            <el-button type="primary">
              <router-link to="/user">进入系统</router-link>
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
@import "../common/css/base.scss";

.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .home-video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

.container {
  width: 70%;
  background: rgba($color: #f6f6f6, $alpha: 0.3);
  border-radius: 15px;
  color: #ffffff;
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    p {
      padding-top: 30px;
    }
    .info-btn {
      margin-top: 80px;
      text-align: center;
      button {
        background: #ffffff;
        border: none;
        padding: 15px 50px;
        border-radius: 20px;
        margin: 0 30px;
        &:hover {
          a {
            color: #343434;
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

@media screen and (max-width: $smallSize) {
  .container {
    height: 100vh;
    width: 95%;
    background: transparent;
    .header {
      font-size: 18px;
    }
    .info-pic {
      display: none;
    }
    .info {
      width: 90%;
      height: calc(100% - 60px);
      p {
        margin-top: 100px;
        text-align: center;
      }
      .info-btn {
        // button {
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 100px;
        // }
      }
    }
    .footer {
      text-align: center;
      height: 30px !important;
      font-size: 14px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
