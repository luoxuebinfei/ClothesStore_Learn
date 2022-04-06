<template>
  <div class="header clearfix">
    <div class="search clearfix">
      <!-- 搜索相关 -->
      <el-form ref="form" :model="form">
        <el-input v-model="form.searchText" placeholder="搜索"
          ><el-button
            icon="el-icon-search"
            slot="suffix"
            @click="searchPost"
          ></el-button
        ></el-input>
      </el-form>
    </div>
    <div class="shortcut clearfix">
      <ul>
        <li class="center">
          <a href="/home"
            ><el-button icon="iconfont icon-wode" title="个人中心"></el-button
          ></a>
          <div class="info" v-if="username.length!=0 || username===undefined">
            <span :title="username">昵称：{{ username }}</span
            ><a href="javascript:;" @click="quit">退出登录</a>
          </div>
          <div class="no-info" v-else>
            未登录 <a href="/login">去登陆</a>
          </div>
        </li>
        <li>
          <a href="/order"
            ><el-button icon="iconfont icon-dingdan" title="订单"></el-button
          ></a>
        </li>
        <!-- <li><el-button icon="iconfont icon-wode" title="个人中心"></el-button></li> -->
        <li>
          <a href="/cart_index"
            ><el-button icon="iconfont icon-gouwuche" title="购物车"></el-button
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop-Header",
  data() {
    return {
      form: {
        searchText: "",
      },
      username: "",
    };
  },
  methods: {
    searchPost: function () {
      console.log(`提交了 ${this.form.searchText}`);
    },
    quit() {
      this.$confirm("确定退出账号吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出",
          });
          setTimeout(()=>{
            this.$store.commit("REMOVE_INFO");
            this.$router.go(0)
          },3000)
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
  },
  created() {
    if (localStorage.getItem("token")===null || localStorage.getItem("token").length===0){
      this.$store.commit("REMOVE_INFO");
    }
    this.username = this.$store.getters.getUser;
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem;
  width: 100%;
  min-width: 1366px;
  box-shadow: 1px 1px 15px rgb(155, 155, 155);
  // border-bottom: 1px solid gray;
}
/*搜索相关样式 */
.search {
  width: 35rem;
  margin: 0 3rem 0 20rem;
  float: left;
  // position: relative;
  // left: 20rem;
}
.search /deep/ .el-input__inner {
  border-radius: 15px;
}
.search /deep/ .el-button {
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: gray;
}
.search /deep/ .el-button:hover,
.el-button:active,
.el-button:visited {
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: gray;
}
/**************/

/*快捷路径*/
.shortcut {
  width: 336px;
  // position: relative;
  // top: -5px;
  // right: 10rem;
  float: right;
  margin: 0 4rem 0 0;
}
.shortcut ul > li {
  list-style: none;
  float: right;
  transform: scale(1.3);
  margin: 0 1.5rem;
}
.shortcut /deep/ .el-button,
.el-button:hover,
.el-button:active {
  border: none;
  background: transparent;
}
.shortcut /deep/ .el-button:hover {
  transform: scale(1.5);
}

.center {
  position: relative;
  z-index: 9999;
}
.info,.no-info {
  display: none;
  position: absolute;
  z-index: 9999;
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px 1px rgb(240, 240, 240);
  border-radius: 10px;
  text-align: center;
  font-size: 12px;
  padding: 10px;
  width: 100px;
  left: 50%;
  transform: translate(-50%);
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.info a {
  display: block;
  margin-top: 5px;
}
.center:hover .info,.center:hover .no-info {
  display: block;
}
</style>