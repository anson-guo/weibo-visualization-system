<template>
  <div>
    <el-row>
      <el-col class="col" :xs="24" :sm="24" :md="24" :lg="24">
        <el-card>
          <!-- <h3>该用户近三年微博数目统计</h3> -->
          <!-- <d3-bar-chart :data="formatUserweboData" v-if="isShowChart"></d3-bar-chart> -->
          <d3-histogram></d3-histogram>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import D3BarChart from "../components/visual-components/D3BarChart";
import D3Histogram from "../components/visual-components/D3Histogram";

export default {
  name: "WeiboData",
  components: {
    D3BarChart,
    D3Histogram
  },
  data() {
    return {
      userWeiboData: [], // 用户微博数据
      formatUserweboData: [], // 处理成符合 d3-bar-char 数据格式的数据
      isShowChart: false
    };
  },
  methods: {
    /**
     * 根据 id 获取用户的微博数据
     */
    fetchWeiboData(callback) {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/weibos`;

      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          if (+res.status === 200) {
            this.userWeiboData = res.data;
          }
          callback();
        });
    },
    /**
     * 将获取到的数据转换成 d3-bar-char 组件的标准数据格式
     */
    formatDataToD3BarChar() {
      /**
       * freqData: [
        { State: "1月", freq: { 2017: 47, 2018: 13, 2019: 2 } },
        { State: "2月", freq: { 2017: 11, 2018: 4, 2019: 6 } },
        { State: "3月", freq: { 2017: 9, 2018: 21, 2019: 4 } },
        { State: "4月", freq: { 2017: 8, 2018: 11, 2019: 18 } },
        { State: "5月", freq: { 2017: 44, 2018: 33, 2019: 9 } },
        { State: "6月", freq: { 2017: 16, 2018: 1, 2019: 10 } },
        { State: "7月", freq: { 2017: 18, 2018: 2, 2019: 12 } },
        { State: "8月", freq: { 2017: 44, 2018: 38, 2019: 9 } },
        { State: "9月", freq: { 2017: 7, 2018: 18, 2019: 15 } },
        { State: "10月", freq: { 2017: 1, 2018: 3, 2019: 4 } },
        { State: "11月", freq: { 2017: 1, 2018: 3, 2019: 4 } },
        { State: "12月", freq: { 2017: 1, 2018: 3, 2019: 4 } }
      ]
       */
      let item01 = 0, // 2017
        item02 = 0, // 2018
        item03 = 0; // 2019

      let month = 1;

      while (month <= 12) {
        this.userWeiboData.forEach(item => {
          const date = item.created_at.split("-").splice(0, 2); // ['2019', '01']
          if (+date[1] === month) {
            if (+date[0] === 2019) {
              item03++;
            } else if (+date[0] === 2018) {
              item02++;
            } else if (+date[0] === 2017) {
              item01++;
            }
            this.formatUserweboData[month - 1] = {
              State: `${month}月`,
              freq: {
                2017: item01,
                2018: item02,
                2019: item03
              }
            };
          }
        });

        month++;
        item01 = 0;
        item02 = 0;
        item03 = 0;
      } // end while

      // 处理一个特殊情况，某个用户在这三年的某个月都，微博数都为0
      const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const indexs = [];
      this.formatUserweboData.forEach((item, index) => {
        indexs.push(index);
      });
      let difference = number
        .concat(indexs)
        .filter(v => !number.includes(v) || !indexs.includes(v));

      if (difference.length) {
        difference.forEach(item => {
          this.formatUserweboData[item] = {
            State: `${item + 1}月`,
            freq: {
              2017: 0,
              2018: 0,
              2019: 0
            }
          };
        });
      }

      // console.log(this.formatUserweboData);
      this.isShowChart = true;
    }
  },
  created() {
    this.isShowChart = false;
    this.formatUserweboData = [];
  },
  mounted() {
    this.fetchWeiboData(this.formatDataToD3BarChar);
  }
};
</script>

<style lang="scss" scoped>
</style>


