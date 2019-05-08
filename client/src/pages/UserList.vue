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

    <!-- 表格，微博用户列表 -->
    <!-- <el-table :data="tableData" style="width: 100%; min-height: 600px;" v-loading="loading">
      <el-table-column prop="avatar" label="头像" width="80">
        <template slot-scope="scope">
          <img style="height: 50px" :src="scope.row.avatar" alt="头像">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="180"></el-table-column>
      <el-table-column prop="id" label="Id" width="180"></el-table-column>
      <el-table-column label="性别" width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === 'm'">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" width="300" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">访问</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <!-- 分页 -->
    <div class="user-list">
      <div
        class="item"
        v-for="(item, index) in tableData"
        :key="index"
        @click="handleLink(item.id)"
      >
        <img :src="item.avatar" alt>
        <div class="user-info">
          <p>{{ item.name }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="block pages">
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
      loading: true,
      total: 0,
      userName: ""
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
      this.loading = true;
      this.$axios
        .get("/api/user", {
          params
        })
        .then(res => {
          this.tableData = res.data.data;
          console.log(this.tableData);
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
  width: 70%;
  margin: 0 auto;
  height: 100vh;
  .user-search {
    height: 80px;
    background: red;
    padding: 0 10px;
    .input {
      line-height: 80px;
    }

    // .search {
    //   margin-left: 10px;
    // }
  }

  .user-list {
    padding: 50px 20px;
    display: flex;
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      width: 50%;
      padding: 10px 20px;
      border: 1px solid red;
      img {
        float: left;
        width: 70px;
        border-radius: 50%;
      }
      .user-info {
        float: left;
      }
    }
  }

  .pages {
    margin-top: 20px;
    margin-bottom: 50px;
    float: right;
  }
}

@media screen and (max-width: $smallSize) {
  .container {
    width: 100%;
    .user-list {
      padding: 30px 10px;
      display: flex;
      .item {
        box-sizing: border-box;
        width: 50%;
        padding: 10px 0;
        img {
          float: left;
          width: 50px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

