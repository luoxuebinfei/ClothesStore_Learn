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
              <div class="login-from-title">{{ title }}</div>
              <el-input v-model="form.emailAddress" placeholder="邮箱"
                ><i slot="prefix" class="el-input__icon el-icon-message"></i
              ></el-input>
              <el-input
                v-model="form.pass"
                type="password"
                placeholder="密码"
                show-password
                ><i slot="prefix" class="el-input__icon el-icon-lock"></i
              ></el-input>
              <el-button type="primary" @click="postLogin">立即登录</el-button>
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
                  @click="getCode"
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
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
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
                <el-form-item prop="checkPass">
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
                  @click="ishidden = 2"
                  id="return-button"
                  >上一步</el-button
                >
                <el-button type="primary" @click="resetPaw">完成</el-button>
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
          <div class="newpage" v-if="title == '用户登录'">
            <router-link to="register">注册新用户</router-link> /
            <a @click.prevent="setPassword" style="cursor: pointer">{{
              forgot_text
            }}</a>
          </div>
          <div class="newpage" v-else>
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
        emailAddress: "",
        pass: "",
        checkPass: "",
        verification: "", //验证码
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      title: "用户登录", //标题
      loginUrl: "/login", //登录url
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
        if (this.form.emailAddres == "") return;
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
        this.$axios.get("/get_email_code", {
          params: { email: this.form.emailAddress },
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
    findpass: function () {
      this.ishidden = 3;
    },
    mouseLeave: function () {
      document.querySelector(".login100-pic").style.transform =
        "perspective(300px) rotateX(0deg) rotateY(0deg)";
    },
    //登录
    postLogin() {
      let email = this.form.emailAddress;
      let paw = this.form.pass;
      let _this = this;
      if (email == "" || paw == "") return;
      this.$confirm("即将登录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(this.loginUrl, {
              email: email,
              paw: paw,
            })
            .then((res) => {
              if (res.data.msg === "登录成功！") {
                const jwt = res.headers["authorization"];
                const userinfo = res.data.data.userinfo;
                _this.$store.commit("SET_TOKEN", jwt);
                _this.$store.commit("SET_USERINFO", userinfo);
                sessionStorage.setItem("group", res.data.data.group);
                this.$message({
                  type: "success",
                  message: "登录成功！",
                });
                if (_this.title == "用户登录") {
                  setTimeout(() => {
                    //跳转到登录前的页面
                    const curr = localStorage.getItem("preRoute");
                    if (curr == null) {
                      this.$router.push({ path: "/" });
                    } else {
                      this.$router.push({ path: curr });
                    }
                  }, 1000);
                } else {
                  setTimeout(() => {
                    //跳转到登录前的页面
                    this.$router.push({ path: "/admin/shop" });
                  });
                }
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登录",
          });
        });
    },
    //重置密码
    resetPaw() {
      let email = this.form.emailAddress;
      let code = this.form.verification;
      let paw = this.form.pass;
      let checkPass = this.form.checkPass;
      let _this = this;
      if (email == "" || code == "" || paw == "" || checkPass == "") {
        return;
      }
      this.$confirm("即将重置密码，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.$axios
            .post("/reset_Password", {
              email: email,
              code: code,
              password: paw,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "密码重置成功！",
                });
                setTimeout(() => {
                  _this.$router.go(0);
                }, 3000);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消重置密码",
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
    this.$nextTick(() => {
      var url = window.location.href;
      var arr = url.split("//");
      url = arr[1].substring(arr[1].indexOf("/"));
      if (url != "/login") {
        this.loginUrl = "/admin/login";
        this.title = "管理员登录";
      }
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/CSS/login-register.css";

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