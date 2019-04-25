<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="user-search">
      <el-input class="input" v-model="userName" @keyup.enter.native="searchUserByName" clearable/>
      <el-button class="search" type="primary" @click="searchUserByName">查询</el-button>
    </div>
    <!-- 表格，微博用户列表 -->
    <el-table :data="tableData" style="width: 100%; min-height: 600px;" v-loading="loading">
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
          <el-button size="mini" @click="handleLink(scope.$index, scope.row)">访问</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    handleLink(index, row) {
      this.$router.push({ path: `/user-info/${row.id}/base` });
    }
  },
  mounted() {
    this.$router.push({ path: "/user" });
    this.fetchUserList(null);
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 70%;
  margin: 100px auto;
  height: 100vh;
  .user-search {
    margin-bottom: 50px;
    display: flex;
    .search {
      margin-left: 10px;
    }
  }
  .pages {
    margin-top: 20px;
    margin-bottom: 50px;
    float: right;
  }
}
</style>

