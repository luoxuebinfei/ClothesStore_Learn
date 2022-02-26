<template>
  <div class="body">
    <div class="header clearfix">
      <div class="logo inline"></div>
      <div class="logoName inline"></div>
      <div class="logo">1111</div>
      <div class="tologin">
        已有账号?<router-link to="login" class="text-yellow-600 link"
          >去登陆</router-link
        >
      </div>
    </div>

    <div class="pro-main clearfix">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="emailAddress">
          <el-input v-model="ruleForm.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verification">
          <div id="verf">
            <el-input v-model="ruleForm.verification"></el-input>
            <el-button
              type="primary"
              plain
              :disabled="ruleForm.emailAddress == ''"
              >获取验证码</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="ruleForm.checkpass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="checked" id="agree">同意用户隐私协议</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      checked: false, //隐私协议
      ruleForm: {
        name: "", //昵称
        pass: "", //密码
        checkpass: "",
        emailAddress: "", //邮箱地址
        verification: "", //验证码
        // btnChangeEnable:true,
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        emailAddress: [
          {
            required: true,
            message: "请输入正确的邮箱地址",
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            validator: validatePass,
            trigger: "blur",
          },
        ],
        checkpass: [
          {
            required: true,
            message: "请再次输入密码",
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.body{
  margin: 0 auto;
  padding: 0;
}
.header {
  /* background-color: rgb(179, 176, 176); */
  height: 15vh;
  // width: 100%;
  background: url(http://misc.360buyimg.com/user/reg/3.0.0/css/i/headbg.jpg);
  background-repeat: repeat-x;
  background-position-x: left;
  background-position-y: bottom;
  margin: 0 5vh;
  text-align: center;
  // position: absolute;
  // top: 0;
}
.logo {
  margin-left: 15vh;
  float: left;
}
.tologin {
  margin-top: 55px;
  margin-right: 15vh;
  float: right;
}
.link:hover{
  text-decoration: underline;
}
.pro-main {
  width: 100vh;

  margin: 0 auto;
  // background-color: rgb(192, 192, 207);
  margin-top: 5rem;
  padding: 3em;
  // position: relative;
  // top:15vh;
}
#verf {
  // display: flex;
  width: 100%;
}
#verf .el-input {
  width: 78%;
  margin-right: 2%;
}
#verf .el-button {
  width: 20%;
}
.a {
  text-align: center;
}
#agree {
  margin: 0 5rem;
  text-align: center;
}
// a:first-child .pro-step {
//   margin: 80px auto 0;
//   height: 100px;
// }
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