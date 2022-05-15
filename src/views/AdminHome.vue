<template>
  <div>
    <header><AdminHeader></AdminHeader></header>
    <aside><Sidebar></Sidebar></aside>
    <main>
      <div class="main">
        <div class="lunbo">
          <div>轮播图管理</div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddDetails(1)"
            >添加</el-button
          >
          <el-table :data="imageItems" style="width: 100%" ref="lunbo">
            <el-table-column prop="imgurl" label="缩略图">
              <template slot-scope="scope">
                <img :src="scope.row.imgurl" alt="" width="120" height="80" />
              </template>
            </el-table-column>
            <el-table-column prop="url" label="链接"> </el-table-column>
            <el-table-column label="操作"
              ><template slot-scope="scope"
                ><a href="javascript:;" @click="update(scope, 1)" class="mr-3">修改</a
                ><a href="javascript:;" @click="dele(scope, 1)">删除</a></template
              >
            </el-table-column>
          </el-table>
        </div>
        <div class="ad">
          <div>广告图管理</div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddDetails(2)"
            >添加</el-button
          >
          <el-table :data="adImages" style="width: 100%">
            <el-table-column prop="imgurl" label="缩略图">
              <template slot-scope="scope">
                <img :src="scope.row.imgurl" alt="" width="80" height="80" />
              </template>
            </el-table-column>
            <el-table-column prop="url" label="链接"> </el-table-column>
            <el-table-column label="操作"
              ><template slot-scope="scope"
                ><a href="javascript:;" @click="update(scope, 2)" class="mr-3">修改</a
                ><a href="javascript:;" @click="dele(scope, 2)">删除</a></template
              >
            </el-table-column>
          </el-table>
        </div>
        <div class="goods">
          <div>推荐管理</div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddDetails(3)"
            >添加</el-button
          >
          <el-table :data="good_items" style="width: 100%">
            <el-table-column prop="img" label="缩略图">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" width="80" height="80" />
              </template>
            </el-table-column>
            <el-table-column prop="shoplink" label="链接"> </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope"
                ><a href="javascript:;" @click="update(scope, 3)" class="mr-3">修改</a
                ><a href="javascript:;" @click="dele(scope, 3)">删除</a></template
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
    <div class="thickdiv" @click="hiddenThick"></div>
    <!-- 增加信息 -->
    <div class="thickbox">
      <el-form ref="imgset" :model="imgset" label-width="80px">
        <el-form-item label="缩略图">
          <el-input v-model="imgset.imgurl"></el-input>
        </el-form-item>
        <el-form-item label="导向链接">
          <el-input v-model="imgset.url"></el-input>
        </el-form-item>
        <el-form-item label="标题" v-if="tableIndex == 3">
          <el-input v-model="imgset.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="upbtn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="thickbox-1">
      <el-form ref="imgset" :model="imgset" label-width="80px">
        <el-form-item label="缩略图">
          <el-input v-model="imgset.imgurl"></el-input>
        </el-form-item>
        <el-form-item label="导向链接">
          <el-input v-model="imgset.url"></el-input>
        </el-form-item>
        <el-form-item label="标题" v-if="tableIndex == 3">
          <el-input v-model="imgset.title" @input="$forceUpdate()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="upbtn1">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Sidebar from "../components/AdminSidebar.vue";
export default {
  name: "AdminHome",
  components: { AdminHeader, Sidebar },
  data() {
    return {
      imageItems: [],
      adImages: [],
      good_items: [],
      imgset: {
        imgurl: "",
        url: "",
        title: "",
      },
      tableIndex: 0,
      rowIndex: 0,
    };
  },
  methods: {
    getApi() {
      const _this = this;
      this.$axios.get("/").then((res) => {
        var data = res.data.data;
        _this.imageItems = JSON.parse(data.imageItems);
        _this.adImages = JSON.parse(data.adImages);
        _this.good_items = JSON.parse(data.good_items);
      });
    },
    //隐藏界面
    hiddenThick() {
      document.querySelector(".thickdiv").style.display = "none";
      document.querySelector(".thickbox").style.display = "none";
      document.querySelector(".thickbox-1").style.display = "none";
    },
    // 新增
    handleAddDetails(a) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
      this.tableIndex = a;
    },
    // 提交
    upbtn() {
      var a = this.imgset;
      if (this.tableIndex == 1) {
        delete a["title"];
        this.$set(this.imageItems, this.imageItems.length, a);
      } else if (this.tableIndex == 2) {
        delete a["title"];
        this.$set(this.adImages, this.adImages.length, a);
      } else if (this.tableIndex == 3) {
        this.$set(this.good_items, this.good_items.length, {
          img: this.imgset.imgurl,
          shoplink: this.imgset.url,
          title: this.imgset.title,
        });
      }
      const _this = this;
      this.$axios
        .post("/admin/index_update", {
          imageItems: JSON.stringify(this.imageItems),
          adImages: JSON.stringify(this.adImages),
          good_items: JSON.stringify(this.good_items),
        })
        .then((res) => {
          _this.getApi();
        });
      this.hiddenThick();
      this.imgset.imgurl = "";
      this.imgset.url = "";
      this.imgset.title = "";
    },
    //删除
    dele(row, a) {
      // console.log(this.$refs)
      if (a == 1) {
        this.imageItems.splice(row.$index, 1);
      } else if (a == 2) {
        this.adImages.splice(row.$index, 1);
      } else if (a == 3) {
        this.good_items.splice(row.$index, 1);
      }
      const _this = this;
      this.$axios
        .post("/admin/index_update", {
          imageItems: JSON.stringify(this.imageItems),
          adImages: JSON.stringify(this.adImages),
          good_items: JSON.stringify(this.good_items),
        })
        .then((res) => {
          _this.getApi();
        });
    },
    // 修改
    update(row, a) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox-1").style.display = "block";
      this.tableIndex = a;
      this.rowIndex = row.$index;
      if (a != 3) {
        this.imgset.imgurl = row.row.imgurl;
        this.imgset.url = row.row.url;
      } else {
        this.imgset.imgurl = row.row.img;
        this.imgset.url = row.row.shoplink;
        this.imgset.title = row.row.title;
      }
    },
    upbtn1() {
      var _this = this;
      var a = this.imgset;
      if (this.tableIndex == 1) {
        delete a["title"];
        this.imageItems.splice(this.rowIndex, 1, a);
      } else if (this.tableIndex == 2) {
        delete a["title"];
        this.adImages.splice(this.rowIndex, 1, a);
      } else if (this.tableIndex == 3) {
        this.good_items.splice(this.rowIndex, 1, {
          img: this.imgset.imgurl,
          shoplink: this.imgset.url,
          title: this.imgset.title,
        });
      }
      this.$axios
        .post("/admin/index_update", {
          imageItems: JSON.stringify(this.imageItems),
          adImages: JSON.stringify(this.adImages),
          good_items: JSON.stringify(this.good_items),
        })
        .then((res) => {
          _this.getApi();
        });
      this.hiddenThick();
      this.imgset.imgurl = "";
      this.imgset.url = "";
      this.imgset.title = "";
    },
  },
  created() {
    this.getApi();
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 70px;
}
aside {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  // float: left;
  height: 100%;
}
main {
  position: relative;
  left: 260px;
  width: calc(100% - 260px);
  height: auto;
}

.main {
  display: flex;
  width: 100%;
}
.main .lunbo {
  flex: 1;
  // width: 50%;
}
.main .ad {
  flex: 1;
  // width: 50%;
}
.main .goods {
  flex: 1;
}
// 弹出框
.thickdiv {
  display: none;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 230, 230, 0.6);
  position: fixed;
  left: 0;
  top: 0;
}
.thickbox,
.thickbox-1 {
  display: none;
  z-index: 10001;
  width: 500px;
  height: 300px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}
</style>