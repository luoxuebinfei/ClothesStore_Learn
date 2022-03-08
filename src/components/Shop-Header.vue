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
        <li><a href="/home"><el-button icon="iconfont icon-wode" title="个人中心"></el-button></a></li>
        <li><el-button icon="iconfont icon-dingdan" title="订单"></el-button></li>
        <!-- <li><el-button icon="iconfont icon-wode" title="个人中心"></el-button></li> -->
        <li><a href="/cart_index"><el-button icon="iconfont icon-gouwuche" title="购物车"></el-button></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop-Header",
  data() {
    return {
      form:{
        searchText: "",
      }
    };
  },
  methods: {
    searchPost: function () {
      console.log(`提交了 ${this.form.searchText}`);
    },
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
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
.shortcut{
  width: 336px;
  // position: relative;
  // top: -5px;
  // right: 10rem;
  float: right;
  margin: 0 4rem 0 0;
}
.shortcut ul>li{
  list-style: none;
  float: right;
  
  margin: 0 1.5rem;
}
.shortcut /deep/ .el-button,.el-button:hover,.el-button:active{
  border: none;
  background: transparent;
}
.shortcut /deep/ .el-button:hover{
  transform: scale(1.5);
}

</style>