<template>
  <div>
    <sub-menu :tabsTitle="tabsTitle" @changeTabs="(index) => {this.currentMenuContent = +index}"></sub-menu>

    <el-row>
      <el-row type="flex" justify="center">
        <!-- 粉丝年龄分布 -->
        <el-col v-if="currentMenuContent === 1" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[0] }}</h3>
            <p>以饼图的形式展示该用户关注的人的年龄分布情况</p>
            <f2-base-piechart
              v-if="fansAgeData.length"
              :charData="fansAgeData"
              :map="fansAgeMap"
              container="fans-ages-char"
            ></f2-base-piechart>
          </el-card>
        </el-col>

        <!-- 粉丝性别分布 -->
        <el-col v-if="currentMenuContent === 2" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[1] }}</h3>
            <p>以饼图的形式展示该用户关注的人的性别分布情况</p>
            <f2-donut-char
              :total="totalFansNumber"
              :charData="fansGenderData"
              container="fans-sex-char"
            ></f2-donut-char>
          </el-card>
        </el-col>

        <!-- 关注者的粉丝数量和关注者数量 -->
        <el-col v-if="currentMenuContent === 3" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>关注的人的粉丝数量分布</h3>
            <p>关注的人的粉丝数量分布</p>
            <f2-base-histogram
              :charData="followersFansData"
              container="followers-fans-number"
              :isShowText="true"
            ></f2-base-histogram>
          </el-card>
          <el-card class="char-card">
            <h3>关注的人的关注者数量分布</h3>
            <p>关注的人的关注者数量分布</p>
            <f2-base-histogram
              :charData="followersFollowersData"
              container="fans-follows-number"
              :isShowText="true"
            ></f2-base-histogram>
          </el-card>
        </el-col>

        <!-- 关注者认证统计 -->
        <el-col v-if="currentMenuContent === 4" class="col" :sm="24" :md="16" :lg="16">
          <el-card class="char-card">
            <h3>{{ tabsTitle[0] }}</h3>
            <p>关注者认证统计</p>
            <f2-donut-label-char
              :charData="followsVerifiedData"
              container="follows-verified-number"
            ></f2-donut-label-char>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import SubMenu from "./PageComponents/SubMenu";
import F2BasePiechart from "../components/visual-components/F2BasePiechart";
import F2DonutChar from "../components/visual-components/F2DonutChar";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";
import F2DonutLabelChar from "../components/visual-components/F2DonutLabelChar";
import {
  uniqueObjProperty,
  findNumberWithRange,
  countOccurences
} from "../lib/utils";
import { mapNumberRange, mapFanVerified } from "../lib/const";

export default {
  name: "FollowsData",
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
        "关注者年龄分布",
        "关注者性别分布",
        "关注者的相关数量统计",
        "关注者认证统计"
      ],
      currentMenuContent: 1,
      allFollowsData: [],
      followersFansData: [],
      followersFollowersData: [],
      followsVerifiedData: [],
      fansAgeData: [],
      fansAgeMap: {},
      totalFansNumber: 0,
      fansGenderData: []
    };
  },
  methods: {
    /**
     * 粉丝的年龄分布
     */
    getFansAgeData() {
      this.fansAgeData = [];

      const ageArr = this.allFollowsData.map(item => {
        return item.age;
      });

      const length = ageArr.length; // 实际总人数

      var countedAge = ageArr.reduce(function(allAge, age) {
        if (age in allAge) {
          allAge[age]++;
        } else {
          allAge[age] = 1;
        }
        return allAge;
      }, {});

      const ages = Object.keys(countedAge);
      const ageRangeCount = {
        "16岁以下": 0,
        "[16, 18]": 0,
        "[19, 24]": 0,
        "[25, 30]": 0,
        "30岁以上": 0
      };

      ages.forEach(item => {
        item = +item;
        if (item < 16) {
          ageRangeCount["16岁以下"] += +countedAge[item];
        } else if (item >= 16 && item <= 18) {
          ageRangeCount["[16, 18]"] += +countedAge[item];
        } else if (item >= 19 && item <= 24) {
          ageRangeCount["[19, 24]"] += +countedAge[item];
        } else if (item >= 25 && item <= 30) {
          ageRangeCount["[25, 30]"] += +countedAge[item];
        } else {
          ageRangeCount["30岁以上"] += +countedAge[item];
        }
      });

      for (const item in ageRangeCount) {
        const percent = ageRangeCount[item] / length;
        this.fansAgeData.push({
          name: item,
          percent: +percent.toFixed(2),
          a: "1"
        });
        this.fansAgeMap[item] = Number(percent * 100).toFixed(2) + "%";
      }
    },

    /**
     * 粉丝的性别分布
     */
    getFansGenderData() {
      const genderArr = this.allFollowsData.map(item => {
        return item.gender;
      });
      const length = genderArr.length; // 实际总人数
      this.totalFansNumber = length;

      const countedSex = genderArr.reduce(function(allSex, sex) {
        if (sex in allSex) {
          allSex[sex]++;
        } else {
          allSex[sex] = 1;
        }
        return allSex;
      }, {});

      for (const item in countedSex) {
        const percent = countedSex[item] / length;
        let label = "";
        if (item === "m") {
          label = "男性";
        } else if (item === "f") {
          label = "女性";
        } else {
          label = "未知性别";
        }
        this.fansGenderData.push({
          name: label,
          percent: +percent.toFixed(2),
          a: "1"
        });
      }

      console.log(this.fansGenderData);
    },

    /**
     * 获取关注者的全部数据
     */
    fetchFollowsData() {
      const id = this.$route.path.split("/")[2];

      this.$axios.get(`/api/user-info/${id}/follows-data`).then(res => {
        const data = res.data;
        this.allFollowsData = data[0].follows;
        this.allFollowsData = uniqueObjProperty(this.allFollowsData, "id");

        this.getFansAgeData();
      });
    },

    /**
     * 整理出粉丝的粉丝数据范围
     */
    getFollowersFansData() {
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
      const follow_count = this.allFollowsData.map(item => item.follow_count);
      const follower_count = this.allFollowsData.map(
        item => item.followers_count
      );

      for (let i = 0; i < keys.length; i++) {
        this.followersFansData.push({
          key: mapNumberRange(keys[i]),
          value: findNumberWithRange(follow_count, [keys[i - 1], keys[i]])
        });
        this.followersFollowersData.push({
          key: mapNumberRange(keys[i]),
          value: findNumberWithRange(follower_count, [keys[i - 1], keys[i]])
        });
      }
      console.log(this.followersFansData);
    },

    /**
     * 关注者认证统计
     */
    getFansVerified() {
      this.followsVerifiedData = [];
      const verifieds = this.allFollowsData.map(item => item.verified_type);
      const uniqueKey = new Set(verifieds);
      uniqueKey.forEach(item => {
        this.followsVerifiedData.push({
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
          this.getFansAgeData();
          break;
        case 2:
          this.getFansGenderData();
          break;
        case 3:
          this.getFollowersFansData();
          break;
        case 4:
          this.getFansVerified();
          break;
      }
    }
  },
  created() {
    this.fetchFollowsData();
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
