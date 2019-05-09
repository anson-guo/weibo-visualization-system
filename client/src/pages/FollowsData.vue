<template>
  <div>
    <sub-menu :tabsTitle="tabsTitle" @changeTabs="(index) => {this.currentMenuContent = +index}"></sub-menu>

    <el-row>
      <el-row type="flex" justify="center">
        <!-- 关注者认证统计 -->
        <el-col v-if="currentMenuContent === 1" class="col" :sm="24" :md="16" :lg="16">
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
import { uniqueObjProperty, countOccurences } from "../lib/utils";

import { mapFanVerified } from "../lib/const";


export default {
  name: "FollowsData",
  components: {
    SubMenu,
    F2DonutLabelChar
  },
  data() {
    return {
      tabsTitle: ["关注者认证统计"],
      currentMenuContent: 1,
      allFollowsData: [],
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
        
        this.getFansVerified();

      });
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
