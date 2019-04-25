<template lang="html">
  <div
    class="header-container"
    style="background-image: url('http://img.t.sinajs.cn/t5/skin/public/covervip/2012.jpg')"
  >
    <div class="info">
      <div class="info-img">
        <img
          src="https://tva3.sinaimg.cn/crop.0.0.640.640.180/bfc243a3jw8efzr4c9ajij20hs0hsaav.jpg"
          alt="头像"
        >
      </div>
      <h3>回忆专用小马甲</h3>
      <p>微博人气博主</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainHeader"
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 200px;
  .info {
    text-align: center;
    color: #ffffff;
    .info-img {
      padding-top: 30px;
      img {
        width: 90px;
        border-radius: 50%;
      }
    }
    h3 {
      margin: 8px 0;
    }
    p {
      margin: 0;
      font-size: 14px;
    }
  }
}
</style>


