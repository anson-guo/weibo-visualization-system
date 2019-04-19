<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="user-search">
      <el-input
        class="input"
        v-model="userName"
        @keyup.enter.native="handleUserNameChange"
        clearable
      />
      <el-button class="search" type="primary" @click="handleUserNameChange">查询</el-button>
    </div>
    <!-- 表格，微博用户列表 -->
    <el-table :data="tableData" style="width: 100%; min-height: 600px;" v-loading="loading">
      <el-table-column prop="avatar" label="头像" width="80">
        <template slot-scope="scope">
          <img style="height: 50px" :src="scope.row.avatar" alt="头像">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="180"></el-table-column>
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
      this.loading = true;
      this.$router.push({path:'/users/all',query: {pagenum:num}});
      this.$axios
        .get("/api/users/all", {
          params: {
            pagenum: num
          }
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
     * 处理用户昵称改变后的搜索
     */
    handleUserNameChange() {
      // this.$axios
      //   .get("/api/users/search", {
      //     params: {
      //       username: this.userName
      //     }
      //   })
      //   .then(res => {
      //     this.tableData = res.data.data;
      //     this.loading = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    /**
     * 访问对应的用户
     */
    handleLink(index, row) {
      this.$router.push({ path: `/user-info/${row.name}`});
    }
  },
  mounted() {
    this.$axios.get("/api/user/all").then(res => {
      const { total, data } = res.data;

      this.total = total;
      this.tableData = data;

      this.loading = false;
    });
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

