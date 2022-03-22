<template>
  <!-- 注册界面 -->
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
          <div class="form-ForgotPass" v-show="ishidden">
            <el-form ref="form" :model="form" label-width="80px">
              <div class="login-from-title">用户注册</div>
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
              <el-button type="primary" @click="ishidden = !ishidden"
                >继续</el-button
              >
            </el-form>
          </div>
          <div class="form-ForgotPass" v-show="!ishidden">
            <div class="login-from-title">用户注册</div>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
              <el-input v-model="form.userName" placeholder="昵称"
                ><i slot="prefix" class="el-input__icon el-icon-message"></i
              ></el-input>
              <div class="verification">
                <el-form-item prop="pass">
                  <el-input
                    v-model="form.pass"
                    placeholder="密码"
                    maxlength="10"
                    show-password
                    autocomplete="off"
                    ><i slot="prefix" class="el-input__icon el-icon-lock"></i
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" style="margin-left: 0px">
                  <el-input
                    v-model="form.checkPass"
                    placeholder="确认密码"
                    maxlength="10"
                    show-password
                    autocomplete="off"
                    ><i slot="prefix" class="el-input__icon el-icon-lock"></i
                  ></el-input>
                </el-form-item>
              </div>
              <div class="abreast-input">
                <el-button
                  type="primary"
                  @click="ishidden = !ishidden"
                  id="return-button"
                  >上一步</el-button
                >
                <el-button type="primary" @click="zhuce">完成注册</el-button>
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
            <router-link to="login">已有账号?去登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ishidden: true,
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
        emailAddress: "",
        userName: "", //用户昵称
        pass: "",
        verification: "", //验证码
        checkPass: "", //确认密码
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
        let _this = this;
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
        this.$axios.get("/get_email_code", {
          params: { email: _this.form.emailAddress },
        });
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
    mouseLeave: function () {
      document.querySelector(".login100-pic").style.transform =
        "perspective(300px) rotateX(0deg) rotateY(0deg)";
    },
    zhuce: function () {
      let email_ = this.form.emailAddress;
      let code_ = this.form.verification;
      let name = this.form.userName;
      let paw = this.form.pass;
      let paw_ = this.form.checkPass;
      let _this = this;
      this.$confirm("即将注册xx商城，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/register", {
              email: email_,
              code: code_,
              username: name,
              password: paw,
            })
            .then((res) => {
              if (res.data.msg === "注册成功！") {
                this.$message({
                  type: "success",
                  message: "注册成功！",
                });
                //登录成功后跳转到首页
                setTimeout(()=>{this.$router.push({ path: "/" })},3000);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消注册",
          });
        });
    },
  },
  mounted() {
    //解决el-form-item左边距的问题
    document
      .querySelectorAll(".verification .el-form-item__content")
      .forEach((e) => {
        e.style.marginLeft = "";
      });
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/CSS/login-register.css";
.background {
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
/* el-form-item调整 */
.verification .el-form-item {
  margin-bottom: 0;
}
/* 校验错误 */
.verification .el-form-item.is-error {
  margin-bottom: 20px;
}
.verification /deep/ .el-form-item__error {
  right: 0;
}
</style>