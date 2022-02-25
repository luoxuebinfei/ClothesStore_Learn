<template>
  <el-container>
    <el-header>
      <div class="header clearfix">
        <!-- <div class="logo inline"></div> -->
        <!-- <div class="logoName inline"></div> -->
        <div class="logo">1111</div>
        <div class="tologin">
          已有账号?<router-link to="login" class="text-yellow-600"
            >去登陆</router-link
          >
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="pro-main">
        <div class="pro-step">111</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "register",
  data() {},
};
</script>
<style scoped>
.header {
  /* background-color: rgb(179, 176, 176); */
  height: 110px;
  background: url(http://misc.360buyimg.com/user/reg/3.0.0/css/i/headbg.jpg);
  background-repeat: repeat-x;
  background-position-x: left;
  background-position-y: bottom;
  margin: 0 auto;
}
.logo {
  float: left;
}
.tologin {
  margin-top: 55px;
  margin-right: 15vh;
  float: right;
}
.pro-main{
  width: 100vh;
  margin: 0 auto;
  background-color: rgb(192, 192, 207);
  border-bottom: or;

}
a:first-child
.pro-step{
  margin: 80px auto 0;
  height: 100px;
}
.clearfix::before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  /* IE6、7专有 */
  *zoom: 1;
}
</style>