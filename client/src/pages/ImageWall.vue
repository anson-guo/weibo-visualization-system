<template>
  <div class="container">
    <div id="box">
      <div class="item" v-for="url in urls" :key="url">
        <img :src="url">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageWall",
  componetns: {},
  data() {
    return {
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
        ""
      ]
    };
  },
  mounted() {
    var box = document.getElementById("box");
    var items = box.children;
    // 定义每一列之间的间隙 为10像素
    var gap = 20;

    // 一进来就调用一次
    waterFall();
    // 封装成一个函数
    function waterFall() {
      // 1- 确定列数  = 页面的宽度 / 图片的宽度
      var pageWidth = getClient().width;
      var itemWidth = items[0].offsetWidth;
      var columns = parseInt(pageWidth / (itemWidth + gap));
      var arr = [];
      for (var i = 0; i < items.length; i++) {
        if (i < columns) {
          // 2- 确定第一行
          items[i].style.top = 0;
          items[i].style.left = (itemWidth + gap) * i + "px";
          arr.push(items[i].offsetHeight);
        } else {
          // 其他行
          // 3- 找到数组中最小高度  和 它的索引
          var minHeight = arr[0];
          var index = 0;
          for (var j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
              minHeight = arr[j];
              index = j;
            }
          }
          // 4- 设置下一行的第一个盒子位置
          // top值就是最小列的高度 + gap
          items[i].style.top = arr[index] + gap + "px";
          // left值就是最小列距离左边的距离
          items[i].style.left = items[index].offsetLeft + "px";

          // 5- 修改最小列的高度
          // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
          arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
      }
    }
    // 页面尺寸改变时实时触发
    window.onresize = function() {
      waterFall();
    };
    // 当加载到第30张的时候
    window.onscroll = function() {
      if (
        getClient().height + getScrollTop() >=
        items[items.length - 1].offsetTop
      ) {
        // 模拟 ajax 获取数据
        var datas = ["../image/瀑布流/001.jpg", ..."../image/瀑布流/030.jpg"];
        for (var i = 0; i < datas.length; i++) {
          var div = document.createElement("div");
          div.className = "item";
          div.innerHTML = '<img src="' + datas[i] + '" alt="">';
          box.appendChild(div);
        }
        waterFall();
      }
    };

    // clientWidth 处理兼容性
    function getClient() {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      return {
        width: width - 200,

        height: height
      };
    }
    // scrollTop兼容性处理
    function getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
img {
  width: 220px;
  display: block;
}

.item {
  box-shadow: 2px 2px 2px #999;
  position: absolute;
}
</style>
