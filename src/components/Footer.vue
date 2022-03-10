<template>
  <div class="w clearfix">
    <ol class="slogen">
      <li class="item fore1"><i>多</i>品类齐全，轻松购物</li>
      <li class="item fore2"><i>快</i>多仓直发，极速配送</li>
      <li class="item fore3"><i>好</i>正品行货，精致服务</li>
      <li class="item fore4"><i>省</i>天天低价，畅选无忧</li>
    </ol>
  </div>
</template>

<script>
export default {
    name:"Floor",
}
</script>

<style lang="scss" scoped>
.w {
  width: 100%;
  height: 102px;
  background-color: rgb(234, 234, 234);
  margin: 0 auto;
}
.slogen {
  width: 80%;
  min-width: 1300px;
  height: 42px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 42px;
  //   background-color: red;
  padding: 30px 0 45px 110px;
}
ol,
li {
  list-style: none;
}
ol > li {
  float: left;
  width: 292px;
  //   text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 42px;
  text-indent: 46px;
  height: 42px;
  position: relative;
  //   top: 0;
  //   left: 0;
}

.item > i {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 42px;
  text-indent: -9999px;
  background: url("https://misc.360buyimg.com/jdf/1.0.0/unit/service/5.0.0/i/ico_service.png");
  background-repeat: no-repeat;
  background-position: 0px 0px;
}
.fore2 > i {
  background-position: 0px -43px;
}
.fore3 > i {
  background-position: 0px -86px;
}
.fore4 > i {
  background-position: 0px -129px;
}

.clearfix::after,
.clearfix::before {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  *zoom: 1;
}
</style>