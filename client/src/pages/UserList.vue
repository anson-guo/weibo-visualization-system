<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="user-search">
      <el-input
        class="input"
        v-model="userName"
        @keyup.enter.native="searchUserByName"
        clearable
        placeholder="请输入用户id"
      />
      <!-- <el-button class="search" type="primary" @click="searchUserByName">查询</el-button> -->
    </div>
    <div v-loading="loading">
      <div class="user-list" v-if="tableData.length">
        <div
          class="item"
          v-for="(item, index) in tableData"
          :key="index"
          @click="handleLink(item.id)"
        >
          <div class="image">
            <img :src="item.avatar" alt="用户头像">
          </div>
          <div class="user-info">
            <p class="user-name">
              <span>{{ item.name }}</span>
              <span v-if="item.gender === 'm'" class="iconfont icon-nan blue"></span>
              <span v-else class="iconfont icon-nv pink"></span>
            </p>

            <p>{{ item.description ? item.description : '暂无相关数据' }}</p>
          </div>
        </div>
      </div>
      <div class="no-data" style="line-height: 605px; text-align: center" v-else>
        <p>暂无相关数据</p>
      </div>
    </div>

    <div class="block pages" v-if="total > 10">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template> 

<script>
import SearchInput from "../components/common-components/SearchInput";
import { getUrl } from "../lib/utils.js";

export default {
  name: "UserList",
  components: {
    SearchInput
  },
  data() {
    return {
      tableData: [],
      total: 0,
      userName: "",
      loading: true
    };
  },
  methods: {
    /**
     * 处理分页功能
     */
    handlePageChange(num) {
      let params = {};

      if (this.$route.query.name) {
        params = {
          name: this.$route.query.name,
          pagenum: num
        };
      } else {
        this.$router.push({ path: "/user", query: { pagenum: num } });
        params = {
          pagenum: num
        };
      }

      this.fetchUserList(params);
    },
    /**
     * 处理用户昵称改变后的搜索
     */
    searchUserByName() {
      const user = this.userName.trim();

      if (!user) {
        this.$router.push({ path: "/user" });
        this.fetchUserList(null);
      } else {
        this.$router.push({ path: "/user", query: { pagenum: 1, name: user } });
        this.fetchUserList({ pagenum: 1, name: user });
      }
    },
    /**
     * 异步请求用户列表
     */
    fetchUserList(params) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      this.loading = true;
      this.$axios
        .get("/api/user", {
          params
        })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 访问对应的用户
     */
    handleLink(id) {
      this.$router.push({ path: `/user-info/${id}/base` });
    }
  },
  mounted() {
    this.$router.push({ path: "/user" });
    this.fetchUserList(null);
  }
};
</script>

<style lang="scss" scoped>
@import "../common/css/base.scss";
.container {
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  .user-search {
    height: 80px;
    background: #c92828;
    display: flex;
    .input {
      line-height: 80px;
      width: 60%;
      margin: 0 auto;
    }
  }

  .user-list {
    width: 60%;
    margin: 0 auto;
    display: flex;
    min-height: 605px;
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      width: 50%;
      display: flex;
      padding: 20px 10px;

      .image {
        img {
          width: 70px;
          border-radius: 50%;
        }
      }
      .user-info {
        padding: 5px 20px;
        color: rgb(48, 49, 51);
        font-size: 12px;
        .user-name {
          font-size: 16px;
          span {
            padding-right: 5px;
          }
          .blue {
            color: lightblue;
          }
          .pink {
            color: pink;
          }
          .small-id {
            font-size: 14px;
          }
        }
        p {
          margin-top: 0;
          margin-bottom: 10px;
        }
      }
    }
  }

  .pages {
    margin-top: 20px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    & /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
      background: #c92828;
    }
  }
}

@media screen and (max-width: $smallSize) {
  .container {
    .user-search {
      width: 100%;
      .input {
        width: 90%;
      }
    }
    .user-list {
      width: 100%;
      .item {
        width: 100%;
      }
    }
  }
}
</style>

