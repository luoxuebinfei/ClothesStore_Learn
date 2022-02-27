<template>
  <div class="body">
    <div class="background">
      <div class="wrap-login100">
        <div class="login100-pic" @mousemove="mouseMove" @mouseleave="mouseLeave">
          <img src="../static/images/img-01.png" alt="IMG" />
        </div>
        <div class="form">
          <div class="form-login" v-show="isforgot">
            <el-form ref="form" :model="form" label-width="80px">
              <div class="login-from-title">用户登录</div>
              <el-input v-model="form.emailAddress" placeholder="邮箱"
                ><i slot="prefix" class="el-input__icon el-icon-message"></i
              ></el-input>
              <el-input
                v-model="form.password"
                type="password"
                placeholder="密码"
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>
              <el-button type="primary">立即登录</el-button>
            </el-form>
          </div>
          <div class="form-ForgotPass" v-show="!isforgot">
            <el-form ref="form" :model="form" label-width="80px">
              <div class="login-from-title">找回密码</div>
              <el-input v-model="form.emailAddress" placeholder="邮箱"
                ><i slot="prefix" class="el-input__icon el-icon-message"></i
              ></el-input>
              <div class="verification">
                <el-input
                  v-model="form.verification"
                  placeholder="验证码"
                  maxlength="6"
                  ><i slot="prefix" class="el-input__icon el-icon-key"></i
                  ><el-button
                    type="text"
                    slot="suffix"
                    @click="getCode"
                    :disabled="codeDisabled"
                    >{{ codeMsg }}</el-button
                  ></el-input
                >
              </div>

              <el-button type="primary">立即找回</el-button>
            </el-form>
          </div>
          <div
            style="
              border: 1px solid rgb(220, 220, 220);
              margin: 0.5em auto;
              width: 80%;
            "
          ></div>
          <div class="newpage">
            <router-link to="register">注册新用户</router-link> /
            <a @click.prevent="setPassword" style="cursor: pointer">{{
              forgot_text
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      isforgot: true,
      forgot_text: "忘记密码?",
      // 是否禁用按钮
      codeDisabled: false,
      // 倒计时秒数
      countdown: 60,
      // 按钮上的文字
      codeMsg: "获取验证码",
      // 定时器
      timer: null,
      form: {
        emailAdress: "",
        password: "",
        verification: "", //验证码
      },
    };
  },
  methods: {
    setPassword: function () {
      //登录和找回密码页面切换
      this.forgot_text = "登录";
      this.form.verification = "";
      this.isforgot = !this.isforgot;
    },
    getCode: function () {
      //获取验证码
      if (!this.timer) {
        this.codeDisabled = true; //按钮设置为不可用
        this.timer = setInterval(() => {
          if (this.countdown >= 0 && this.countdown <= 60) {
            this.countdown--;
          }
          if (this.countdown != 60 && this.countdown >= 0) {
            this.codeMsg = `重新发送(${this.countdown})`;
          } else {
            //清除定时器，属性重置
            clearInterval(this.timer);
            this.codeMsg = "获取验证码";
            this.countdown = 60;
            this.timer = null;
            this.codeDisabled = false;
          }
        }, 1000);
      }
    },
    mouseMove: function (e) {
      let x = e.offsetX; //相对元素的X偏移量
      let y = e.offsetY; //相对元素的Y偏移量
      let img = document.querySelector(".login100-pic");
      let x1 = img.offsetWidth;//元素的宽度
      let y1 = img.offsetHeight;//元素的高度
      document.querySelector(".login100-pic").style.cssText += "will-change: transform";
      document.querySelector(".login100-pic").style.cssText += `transform:perspective(300px) rotateX(${(x1 / 2 - x) / 20}deg) rotateY(${(y1 / 2 - y) / 20}deg) scale3d(1.1,1.1,1.1)`;
    },
    mouseLeave: function () {
      document.querySelector(
        ".login100-pic"
      ).style.transform ="perspective(300px) rotateX(0deg) rotateY(0deg)";
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.body {
  height: 100%;
  padding: 0;
  margin: 0;
}
.background {
  //将背景设置为渐变色
  height: 100%;
  box-sizing: border-box;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
.wrap-login100 {
  width: 960px;
  height: 610px;
  background-color: white;
  padding: 177px 130px 33px 95px;
  //设置水平垂直居中
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 25px; //圆角设置
  display: flex;
}
.login100-pic {
  width: 316px;
  flex: 1;
}

.login100-pic img {
  max-width: 100%;
}

.form {
  width: 100%;
  font-size: 24px;
  flex: 1;
  text-align: center;
}
.form .login-from-title {
  font-weight: 600;
  margin-bottom: 1em;
}
.form /deep/ .el-input__inner {
  border-radius: 25px;
  margin: 0.5em auto;
  width: 70%;
  background-color: rgb(230, 230, 230);
  font-weight: 600;
  padding-left: 3em;
  height: 3.25rem;
  line-height: 3.5rem;
}
.form /deep/ .el-input__icon {
  margin-left: 3.875rem;
  margin-top: 0.125rem;
  line-height: 3.5rem;
}
.form /deep/ .el-button {
  margin: 1em 0 0 0;
  width: 70%;
  border-radius: 25px;
  font-weight: 600;
  background-color: rgb(87, 184, 70);
  border: 1px solid rgb(87, 184, 70);
}
.form /deep/ .el-button:hover {
  background-color: darkgreen;
  border: 1px solid darkgreen;
}
.form .newpage {
  font-size: 0.6em;
  color: rgb(131, 130, 130);
}
// .form-ForgotPass .verification{

// }
// .form-ForgotPass .verification /deep/ .el-input__inner{

// }
.form-ForgotPass .verification /deep/ .el-button {
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: gray;
  margin-right: 5.3125rem;
}
</style>