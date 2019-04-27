<template lang="html">
  <div class="main">
    <el-header class="header">
      <main-header :headerData="headerData"></main-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="base" router>
          <el-menu-item index="base">
            <i class="el-icon-document"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="fans">
            <i class="el-icon-message"></i>
            <span slot="title">粉丝数据</span>
          </el-menu-item>

          <el-menu-item index="weibos">
            <i class="el-icon-document"></i>
            <span slot="title">微博数据</span>
          </el-menu-item>

           <el-menu-item>
            <i class="el-icon-document"></i>
             <router-link to="/user">返回用户列表</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view :userBaseInfo="userBaseInfo"></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainHeader from "./PageComponents/MainHeader";
import BaseInfo from "./BaseInfo";
import FansData from "./FansData";

export default {
  name: "UserInfoPage",
  components: {
    MainHeader,
    BaseInfo,
    FansData
  },
  data() {
    return {
      headerData: {}, // 用户主页面头部所使用的数据
      userBaseInfo: {} // 用户基本信息
    };
  },
  methods: {
    /**
     * 跳转到base页面
     */
    jump2Base() {
      const newpath =
        this.$route.path
          .split("/")
          .splice(0, 3)
          .join("/") + "/base";
      this.$router.push({
        path: newpath
      });
    },
    /**
     * 获取用户数据
     */
    fetchUserData() {
      const id = this.$route.path.split("/")[2];
      const url = `/api/user-info/${id}/base`;
      this.$axios
        .get(url, {
          id
        })
        .then(res => {
          const data = res.data[0];
          // 用户页面头部相关数据
          this.headerData = {
            avatar: data.avatar,
            description: data.description,
            name: data.name
          };
          // 用户基本数据
          this.userBaseInfo = data;
        });
    }
  },
  mounted() {
    this.fetchUserData();
    this.jump2Base();
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/")[3];
      if (toDepth === "base") {
        this.fetchUserData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
}
.el-header {
  padding: 0;
}
.header {
  height: 200px !important;
}

.el-aside {
  color: #333;
}
</style>
