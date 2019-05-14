<template>
  <div>
    <sub-menu :tabsTitle="tabsTitle" @changeTabs="(index) => {this.currentMenuContent = +index}"></sub-menu>

    <el-row>
      <el-row type="flex" justify="center">
        <!-- 关注者的粉丝数量和关注者数量 -->
        <el-col v-if="currentMenuContent === 1" class="col" :sm="24" :md="16" :lg="16">
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
        <el-col v-if="currentMenuContent === 2" class="col" :sm="24" :md="16" :lg="16">
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
import F2DonutLabelChar from "../components/visual-components/F2DonutLabelChar";
import F2BaseHistogram from "../components/visual-components/F2BaseHistogram";

import {
  uniqueObjProperty,
  findNumberWithRange,
  countOccurences
} from "../lib/utils";
import { mapNumberRange, mapFanVerified } from "../lib/const";

export default {
  name: "FollowsData",
  components: {
    SubMenu,
    F2DonutLabelChar,
    F2BaseHistogram
  },
  data() {
    return {
      tabsTitle: ["粉丝的相关数量统计", "关注者认证统计"],
      currentMenuContent: 1,
      allFollowsData: [],
      followersFansData: [],
      followersFollowersData: [],
      followsVerifiedData: []
    };
  },
  methods: {
    /**
     * 获取关注者的全部数据
     */
    fetchFollowsData() {
      const id = this.$route.path.split("/")[2];

      this.$axios.get(`/api/user-info/${id}/follows-data`).then(res => {
        const data = res.data;
        this.allFollowsData = data[0].follows;
        this.allFollowsData = uniqueObjProperty(this.allFollowsData, "id");

        this.getFollowersFansData();
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
          this.getFollowersFansData();
          break;
        case 2:
          this.getFansVerified();
          break;
        case 3:
          break;
        case 4:
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
