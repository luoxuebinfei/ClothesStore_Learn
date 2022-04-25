<template>
  <!-- 用户个人中心 -->
  <div>
    <header>
      <Header></Header>
    </header>

    <main>
      <div class="box clearfix">
        <div class="box-left">
          <!-- <div class="userinfo">个人信息</div> -->
          <div class="safe" :class="{ select: st == 1 }" @click="st = 1">
            <a href="javascript:;">账户安全</a>
          </div>
          <div
            class="address mt-5"
            :class="{ select: st == 2 }"
            @click="st = 2"
          >
            <a href="javascript:;">收货地址</a>
          </div>
        </div>
        <div class="box-right">
          <div class="set-safe" v-if="st == 1">
            <div class="username">昵称：{{ username }}</div>
            <div class="email mt-5">邮箱地址：{{ email }}</div>
            <div class="revise-pass mt-5">
              <!-- <div class="passtext">修改密码：</div>
              <div class="passform">

              </div> -->
              <el-form
                ref="form"
                :model="form"
                label-width="80px"
                label-position="left"
                size="medium"
                :rules="rules"
              >
                <el-form-item label="原密码">
                  <el-input v-model="form.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                  <el-input v-model="form.newPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input v-model="form.checkPass" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updatePass()"
                    >提交</el-button
                  >
                  <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="set-address" v-if="st == 2">
            <div class="mt">
              <a href="javascricpt:;" @click="addAddress">新增收货地址</a>
            </div>
            <div class="mc mt-5">
              <div class="">
                <el-table :data="address_list" style="width: 100%">
                  <el-table-column prop="name" label="收货人" width="120">
                  </el-table-column>
                  <el-table-column prop="phone" label="电话" width="120">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <div class="btns clearfix">
                        <el-button
                          class="float-left"
                          @click="updateAddress(scope.row)"
                          >修改</el-button
                        >
                        <el-button
                          class="float-left"
                          @click="deleteAddress(scope.row)"
                          >删除</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="thickdiv" @click="hiddenThick"></div>
      <div class="thickbox">
        <div class="thicktitle pl-5 pt-3">收货地址</div>
        <div class="thickcon mt-5">
          <el-form
            ref="addressForm"
            :model="addressForm"
            label-width="80px"
            :rules="thick_rules"
          >
            <el-form-item label="收货人" prop="name">
              <el-input v-model="addressForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="addressForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="addressForm.address"></el-input>
            </el-form-item>
            <el-form-item label="默认地址">
              <el-switch
                v-model="addressForm.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button @click="updatebtn">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
export default {
  name: "UserHome",
  components: {
    Header,
  },
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
      } else if (value !== this.form.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      username: "",
      email: "",
      st: 1, //select选中情况
      form: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      address_list: [],
      addressForm: {
        address: "",
        id: "",
        is_default: "",
        name: "",
        phone: "",
        value: false,
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      thick_rules: {
        name: [
          { required: true, message: "请输入收件人名字", trigger: "blur" },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, message: '长度为 11 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 5, max: 100, message: '长度在 5 到 100 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    getHome() {
      const _this = this;
      //对路径判断是否直接进入到地址页面
      var url = window.location.hash;
      if (url == "#address"){
        this.st = 2;
      }
      this.$axios.get("/Home").then((res) => {
        var data = res.data.data;
        _this.username = data.username;
        _this.email = data.email;
      });
    },
    //更新密码
    updatePass(formName) {
      const _this = this;
      if (this.form.newPass != this.form.checkPass) {
        return;
      }
      this.$axios
        .post("update_pass", {
          oldPass: this.form.oldPass,
          newPass: this.form.newPass,
        })
        .then((res) => {
          var msg = res.data.msg;
          _this.$message({
            message: msg,
            type: "success",
          });
          _this.form.oldPass = "";
          _this.form.newPass = "";
          _this.form.checkPass = "";
        });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取收货地址
    getAddress() {
      const _this = this;
      this.$axios.get("/get_address").then((res) => {
        let data = res.data.data;
        _this.address_list = data.sort((a, b) => {
          return parseInt(b.is_default) - parseInt(a.is_default);
        });
      });
    },
    //更改收货地址
    updateAddress(value) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
      this.addressForm.id = value.id;
      this.addressForm.name = value.name;
      this.addressForm.phone = value.phone;
      this.addressForm.address = value.address;
      if (value.is_default == "1") {
        this.addressForm.value = true;
      } else {
        this.addressForm.value = false;
      }
    },
    //更改、增加收货地址的提交按钮
    updatebtn() {
      if (this.addressForm.value) {
        this.addressForm.is_default = "1";
      } else {
        this.addressForm.is_default = "0";
      }
      if (
        this.addressForm.name.length == 0 ||
        this.addressForm.phone.length == 0 ||
        this.addressForm.address.length == 0
      ) {
        return;
      }
      const _this = this;
      if (this.addressForm.id != "") {
        this.$axios
          .post("/update_address", {
            id: this.addressForm.id,
            name: this.addressForm.name,
            phone: this.addressForm.phone,
            address: this.addressForm.address,
            is_default: this.addressForm.is_default,
          })
          .then((res) => {
            let msg = res.data.msg;
            _this.$message({
              message: msg,
              type: "success",
            });
            _this.getAddress();
            document.querySelector(".thickdiv").style.display = "none";
            document.querySelector(".thickbox").style.display = "none";
          })
          .catch(() => {
            document.querySelector(".thickdiv").style.display = "none";
            document.querySelector(".thickbox").style.display = "none";
            _this.getAddress();
          });
      } else {
        //id为空是为增加地址
        this.$axios
          .post("/add_address", {
            name: this.addressForm.name,
            phone: this.addressForm.phone,
            address: this.addressForm.address,
            is_default: this.addressForm.is_default,
          })
          .then((res) => {
            let msg = res.data.msg;
            _this.$message({
              message: msg,
              type: "success",
            });
            _this.getAddress();
            document.querySelector(".thickdiv").style.display = "none";
            document.querySelector(".thickbox").style.display = "none";
          });
      }
    },
    //删除收货地址
    deleteAddress(value) {
      const _this = this;
      this.$axios
        .post("/delete_address", {
          id: value.id,
        })
        .then((res) => {
          var msg = res.data.msg;
          _this.$message({
            message: msg,
            type: "success",
          });
          _this.getAddress();
        });
    },
    //隐藏收货地址浮窗
    hiddenThick() {
      document.querySelector(".thickdiv").style.display = "none";
      document.querySelector(".thickbox").style.display = "none";
    },
    //新增收货地址
    addAddress() {
      this.addressForm = {
        address: "",
        id: "",
        is_default: "",
        name: "",
        phone: "",
        value: false,
      };
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
    },
  },
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      _this.getHome();
      _this.getAddress();
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0.8rem auto;
  width: 1000px;
  padding: 10px;
  position: relative;
}
.box-left {
  float: left;
  width: 100px;
  text-align: center;
}
.box-right {
  padding: 0 150px;
}
.box-right .set-safe .revise-pass {
  width: 500px;
}
/* 选中 */
.select {
  color: red;
}

/* 收货地址框 */
.thickdiv {
  display: none;
  position: fixed;
  background-color: rgba(230, 230, 230, 0.6);
  z-index: 9998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.thickbox {
  display: none;
  background-color: white;
  z-index: 9999;
  width: 800px;
  // margin: 0 auto;
  position: absolute;
  left: 28px;
  top: 0;
  border: 4px solid rgba(0, 0, 0, 0.1);
}
.thickbox .thicktitle,
.thickbox .thickcon {
  background-color: white;
  margin: 0 auto;
}
.thickbox .thickcon {
  padding: 20px;
  width: 600px;
}
</style>