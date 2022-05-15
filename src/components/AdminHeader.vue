<template>
  <div class="header">
    <div class="logo">后台管理</div>
    <div class="right">
      <!-- 用户头像 -->
      <div class="user-name">
        {{ username }}
        <div class="dropdown">
          <div v-if="group!=''">
            <div>用户组：{{ group }}</div>
            <div style="text-align: center">
              <a href="javascript:;" @click="quit">退出登录</a>
            </div>
          </div>
          <div v-else style="text-align:center;">未登录 <a href="/admin/login">去登陆</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      group: "",
    };
  },
  methods: {
    //退出账号
    quit() {
      this.$confirm("确定退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出",
          });
          setTimeout(() => {
            this.$store.commit("REMOVE_INFO");
            sessionStorage.clear();
            this.$router.push({ path: "/admin/login" });
          }, 3000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
  created() {
    this.username = sessionStorage.getItem("userInfo").replaceAll(`"`, "");
    this.group = sessionStorage.getItem("group").replaceAll(`"`, "");
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  background-color: rgb(36, 47, 66);
}
.header .logo {
  position: absolute;
  left: 20px;
  float: left;
  width: 250px;
  line-height: 70px;
}
.right {
  position: relative;
  float: right;
}
/* 用户名字 */
.right .user-name {
  position: relative;
  right: 120px;
  line-height: 70px;
}
.right .user-name .dropdown {
    display: none;
  position: absolute;
  top: 70px;
  width: 150px;
  font-size: 14px;
  line-height: 34px;
  z-index: 9999;
  color: black;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px 1px rgb(240, 240, 240);
  padding: 10px;
  border-radius: 10px;
}
.right .user-name:hover .dropdown{
    display: block;
}
</style>