<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="user-search">
      <search-input class="input"/>
    </div>
    <!-- 表格，微博用户列表 -->
    <el-table :data="tableData" style="width: 100%"  v-loading="loading" border>
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
      <el-table-column prop="description" label="描述"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template> 

<script>
import SearchInput from "../components/common-components/SearchInput";

export default {
  name: "UserSearch",
  components: {
    SearchInput
  },
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  methods: {
    /**
     * 处理分页功能
     */
    handlePageChange(num) {
      console.log(num);
    }
  },
  mounted() {
    this.$axios.get("http://localhost/users").then(res => {
      console.log(res);
      this.tableData = res.data;
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
  }
  .pages {
    margin-top: 20px;
    margin-bottom: 50px;
    float: right;
  }
}
</style>

