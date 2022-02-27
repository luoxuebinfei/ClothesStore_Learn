<template>
  <div class="body">
    <div class="background">
      <div class="wrap-login100">
        <div
          class="login100-pic"
          @mousemove="mouseMove"
          @mouseleave="mouseLeave"
        >
          <img src="../static/images/img-01.png" alt="IMG" />
        </div>
        <div class="form">
          <div class="form-login" v-show="ishidden === 1">
            <el-form ref="form" :model="form" label-width="80px">
              <div class="login-from-title">用户登录</div>
              <el-input v-model="form.emailAddress" placeholder="邮箱"
                ><i slot="prefix" class="el-input__icon el-icon-message"></i
              ></el-input>
              <el-input
                v-model="form.password"
                type="password"
                placeholder="密码"
                show-password
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>
              <el-button type="primary">立即登录</el-button>
            </el-form>
          </div>
          <div class="form-ForgotPass" v-show="ishidden === 2">
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
              <el-button type="primary" @click="findpass">立即找回</el-button>
            </el-form>
          </div>
          <div class="form-ForgotPass" v-show="ishidden === 3">
            <div class="login-from-title">重置密码</div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-input
                v-model="form.password"
                placeholder="密码"
                maxlength="10"
                show-password
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>
              <el-input
                v-model="form.confirmPass"
                placeholder="确认密码"
                maxlength="10"
                show-password
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>

              <div class="abreast-input">
                <el-button
                  type="primary"
                  @click="ishidden = 2"
                  id="return-button"
                  >上一步</el-button
                >
                <el-button type="primary">完成</el-button>
              </div>
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
      ishidden: 1,
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
      if (this.forgot_text == "忘记密码?") {
        this.forgot_text = "登录";
        this.form.verification = "";
        this.ishidden = 2;
      } else if (this.forgot_text == "登录") {
        this.forgot_text = "忘记密码?";
        this.form.verification = "";
        this.ishidden = 1;
      }
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
      let x1 = img.offsetWidth; //元素的宽度
      let y1 = img.offsetHeight; //元素的高度
      document.querySelector(".login100-pic").style.cssText +=
        "will-change: transform";
      document.querySelector(
        ".login100-pic"
      ).style.cssText += `transform:perspective(300px) rotateX(${
        (x1 / 2 - x) / 20
      }deg) rotateY(${(y1 / 2 - y) / 20}deg) scale3d(1.1,1.1,1.1)`;
    },
    findpass: function () {
      this.ishidden = 3;
    },
    mouseLeave: function () {
      document.querySelector(".login100-pic").style.transform =
        "perspective(300px) rotateX(0deg) rotateY(0deg)";
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../assets/CSS/login-register.css";
</style>