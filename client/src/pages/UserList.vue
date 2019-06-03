<template>
  <div class="container">
    <!-- 输入框 -->
    <div class="user-search">
      <el-input
        class="input"
        v-model="userName"
        @keyup.enter.native="searchUserByName"
        clearable
        placeholder="请输入用户昵称"
      />
    </div>
    <div v-loading="loading">
      <div v-if="tableData.length">
        <div class="user-list">
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
        <p class="btn-message">
          列表中没有想关注的用户
          <br>试试
          <el-button class="add-btn" type="text" @click="showAddUserWindow">新增用户</el-button>
          <br>
          <router-link to="/">返回首页</router-link>
        </p>
      </div>
      <div class="no-data" style="line-height: 605px; text-align: center" v-else>
        <p class="btn-message">
          没有找到用户数据！
          <el-button
            type="text"
            class="add-btn"
            @click="() => {this.userName = ''; this.searchUserByName()}"
          >返回列表</el-button>或者
          <el-button type="text" class="add-btn" @click="showAddUserWindow">新增</el-button>一条用户数据
        </p>
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

    <!-- 弹出框 -->
    <el-dialog
      title="爬取用户数据"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :center="true"
      @close="cancelForm('ruleForm')"
    >
      <el-form
        status-icon
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="52px"
        class="demo-ruleForm"
        @submit.native.prevent
      >
        <div>
          <p>
            <strong>说明：</strong>来访者可以通过此接口获取某个用户的微博数据
          </p>
          <p>
            <strong>注意：</strong>由于微博接口访问限制，请耐心等待
          </p>
        </div>

        <el-form-item label="微博id" prop="userId">
          <el-input v-model="ruleForm.userId" autocomplete="off" placeholder="请输入用户id"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
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
    const checkUserId = (rule, value, callback) => {
      if (!value.match(/^\d{8,12}$/)) {
        return callback(new Error("微博id异常，请检查后重新输入"));
      }
      callback();
    };
    return {
      tableData: [],
      total: 0,
      userName: "",
      loading: true,
      dialogFormVisible: false,
      ruleForm: {
        userId: ""
      },
      rules: {
        userId: [{ validator: checkUserId, trigger: "blur" }]
      }
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
    },

    /**
     * 显示弹窗
     */
    showAddUserWindow() {
      this.dialogFormVisible = true;
    },

    /**
     * 提交弹窗表单
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.startCrawlById(this.ruleForm.userId);
        } else {
          return false;
        }
      });
    },

    /**
     * 取消弹窗表单
     */
    cancelForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },

    /**
     *  启动服务端爬虫脚本
     */
    startCrawlById(userId) {
      const _this = this;
      const params = {
        userId
      };
      this.$axios
        .get("/api/user/start-crawler", {
          params
        })
        .then(res => {
          this.$message({
            message: "正在爬取数据，请稍后",
            type: "success",
            duration: "3000",
            center: true,
            showClose: true,
            onClose: function() {
              _this.ruleForm.userId = "";
              _this.fetchUserList();
            }
          });
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
    background: #3f3f3f;
    display: flex;
    .input {
      line-height: 80px;
      width: 60%;
      margin: 0 auto;
    }
    & /deep/ .el-input__inner {
      background: #4f4f4f;
      border: 1px solid #4f4f4f;
      color: #ffffff;
    }
  }

  .btn-message {
    text-align: center;
    color: #303133;
    font-size: 14px;

    .add-btn {
      margin: 0;
      color: #c92828;
    }
  }

  .user-list {
    width: 60%;
    margin: 0 auto;
    min-height: 605px;
    .item {
      box-sizing: border-box;
      width: 50%;
      display: inline-block;
      padding: 20px 10px;

      .image {
        float: left;
        img {
          width: 70px;
          border-radius: 50%;
        }
      }
      .user-info {
        float: left;
        width: calc(100% - 70px);
        box-sizing: border-box;
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

  & /deep/ .el-dialog {
    .el-dialog__header {
      text-align: center;
    }
    .el-button--primary {
      background: #c92828;
      border-color: #c92828;
    }
    .el-button:focus,
    .el-button:hover {
      color: #c92828;
      border-color: lightcoral;
      background: rgba(201, 40, 40, 0.2);
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #c92828;
      font-size: 22px;
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
      .image {
        img {
          width: 60px;
        }
      }
      .item {
        width: 100%;
        padding: 8px 10px;
      }
    }
    & /deep/ .el-dialog {
      width: 98%;
    }
  }
}
</style>

