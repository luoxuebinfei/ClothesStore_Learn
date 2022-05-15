<template>
  <div>
    <header><AdminHeader></AdminHeader></header>
    <aside><Sidebar></Sidebar></aside>
    <main>
      <div class="a_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100"> </el-table-column>
          <el-table-column prop="name" label="昵称" width="180" v-if="u == '1'">
          </el-table-column>
          <el-table-column prop="username" label="昵称" width="180" v-else>
          </el-table-column>
          <el-table-column prop="email" label="电子邮件"> </el-table-column>
          <el-table-column prop="password" label="密码"> </el-table-column>
          <el-table-column prop="created_at" label="创建日期" v-if="u == '1'">
          </el-table-column>
          <el-table-column prop="created_time" label="创建日期" v-else>
          </el-table-column>
          <el-table-column prop="update_at" label="更新日期" v-if="u == '1'">
          </el-table-column>
          <el-table-column prop="update_time" label="更新日期" v-else>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scopes">
              <el-button @click="czbtn(scopes.row)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </main>
    <div class="thickdiv" @click="hiddenThick"></div>
    <div class="thickbox">
      <el-form ref="userInfo" :model="userInfo" label-width="80px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="邮件地址" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="updatebtn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Sidebar from "../components/AdminSidebar.vue";
export default {
  name: "AdminUser",
  components: { AdminHeader, Sidebar },
  data() {
    return {
      tableData: [],
      u: "",
      userInfo: {
        id: "",
        name: "",
        email: "",
        password: "",
        u:"",
      },
    };
  },
  methods: {
    getApi() {
      var url = location.search;
      this.u = url.split("=")[1];
      const _this = this;
      this.$axios.get(`/admin/user${url}`).then((res) => {
        var data = res.data.data;
        _this.tableData = data;
      });
    },
    //操作按钮
    czbtn(row) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
      if (this.u == "1") {
        this.userInfo.id = row.id;
        this.userInfo.name = row.name;
        this.userInfo.email = row.email;
        this.userInfo.password = row.password;
        this.userInfo.u = "1";
      } else {
        this.userInfo.id = row.id;
        this.userInfo.name = row.username;
        this.userInfo.email = row.email;
        this.userInfo.password = row.password;
        this.userInfo.u = "2";
      }
    },
    //隐藏界面
    hiddenThick() {
      document.querySelector(".thickdiv").style.display = "none";
      document.querySelector(".thickbox").style.display = "none";
    },
    // 提交按钮
    updatebtn() {
      const _this = this;
      this.$axios.post("/admin/user_update", this.userInfo).then((res) => {
        var msg = res.data.msg;
        _this.$message({
          message: msg,
          type: 'success'
        });
        _this.getApi();
        _this.hiddenThick();
      });
    },
  },
  created() {
    this.getApi();
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化,刷新页面
      if (to.query != from.query) {
        this.getApi(); //重新加载数据
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  left: 260px;
  width: calc(100% - 260px);
  height: 100%;
}
.a_table {
  margin-right: 10px;
}

.thickdiv {
  display: none;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 230, 230, 0.6);
  position: fixed;
  left: 0;
  top: 0;
}
.thickbox {
  display: none;
  z-index: 10001;
  width: 500px;
  height: 300px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}
</style>