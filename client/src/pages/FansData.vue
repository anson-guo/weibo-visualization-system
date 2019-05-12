<template>
  <div>
    <sub-menu :tabsTitle="tabsTitle" @changeTabs="(index) => {this.currentMenuContent = +index}"></sub-menu>
    <el-row>
      <el-row type="flex" justify="center">
        <!-- 粉丝年龄分布 -->
        <el-col v-if="currentMenuContent === 1" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[0] }}</h3>
            <p>以饼图的形式展示该用户的粉丝年龄分布情况</p>
            <f2-base-piechart container="fans-ages-char"></f2-base-piechart>
          </el-card>
        </el-col>

        <!-- 粉丝性别分布 -->
        <el-col v-if="currentMenuContent === 2" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[1] }}</h3>
            <p>以饼图的形式展示该用户的粉丝性别分布情况</p>
            <f2-donut-char container="fans-sex-char"></f2-donut-char>
          </el-card>
        </el-col>

        <!-- 粉丝的粉丝数量排序 -->
        <el-col v-if="currentMenuContent === 3" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[2] }}</h3>
            <p>粉丝的粉丝数</p>
            <f2-base-histogram
              :charData="fansFansData"
              container="fans-fans-number"
              :isShowText="true"
            ></f2-base-histogram>
          </el-card>
        </el-col>

        <!-- 粉丝认证统计 -->
        <el-col v-if="currentMenuContent === 4" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[3] }}</h3>
            <p>粉丝认证统计</p>
            <f2-donut-label-char :charData="fansVerifiedData" container="fans-verified-number"></f2-donut-label-char>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import F2BasePiechart from "../components/visual-components/F2BasePiechart";
import F2DonutChar from "../components/visual-components/F2DonutChar";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2DonutLabelChar from "../components/visual-components/F2DonutLabelChar";
import SubMenu from "./PageComponents/SubMenu";

import {
  uniqueObjProperty,
  findNumberWithRange,
  countOccurences
} from "../lib/utils";
import { mapNumberRange, mapFanVerified } from "../lib/const";

export default {
  name: "FansData",
  components: {
    F2BasePiechart,
    F2BaseHistogram,
    F2DonutChar,
    F2DonutLabelChar,
    SubMenu
  },
  data() {
    return {
      tabsTitle: [
        "粉丝年龄分布",
        "粉丝性别分布",
        "粉丝的粉丝数量统计",
        "粉丝认证统计"
      ],
      currentMenuContent: 1,
      allFansArray: [],
      fansFansData: [],
      fansVerifiedData: []
    };
  },
  methods: {
    /**
     * 获取粉丝的全部数据
     */
    fetchFansData() {
      const id = this.$route.path.split("/")[2];

      this.$axios.get(`/api/user-info/${id}/fans-data`).then(res => {
        const data = res.data;
        this.allFansArray = data[0].fans;
        this.allFansArray = uniqueObjProperty(this.allFansArray, "id");
      });
    },

    /**
     * 整理出粉丝的粉丝数据范围
     */
    getFansFansData() {
      const keys = [
        "3",
        "10",
        "100",
        "500",
        "1000",
        "5000",
        "10000",
        "20000",
        "50000",
        "100000"
      ];
      const follow_count = this.allFansArray.map(item => item.follow_count);

      for (let i = 0; i < keys.length; i++) {
        this.fansFansData.push({
          key: mapNumberRange(keys[i]),
          value: findNumberWithRange(follow_count, [keys[i - 1], keys[i]])
        });
      }
    },

    /**
     * 粉丝认证统计
     */
    getFansVerified() {
      this.fansVerifiedData = [];
      const verifieds = this.allFansArray.map(item => item.verified_type);
      const uniqueKey = new Set(verifieds);
      uniqueKey.forEach(item => {
        this.fansVerifiedData.push({
          const: "const",
          key: mapFanVerified(item),
          value: countOccurences(verifieds, +item)
        });
      });
    }
  },
  watch: {
    currentMenuContent: function(val) {
      switch (+val) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          this.getFansFansData();
          break;
        case 4:
          this.getFansVerified();
          break;
      }
    }
  },
  created() {
    this.fetchFansData();
  }
};
</script>

<style lang="scss" scoped>
.col {
  margin-top: 41px;
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


