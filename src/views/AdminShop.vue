<template>
  <div style="overflow: hidden">
    <header><AdminHeader></AdminHeader></header>
    <aside><Sidebar></Sidebar></aside>
    <main>
      <div class="a_table">
        <el-button @click="openSpuBox(1)">新增SPU</el-button>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-button @click="openSkuBox(props.row)">新增SKU</el-button>
              <el-table
                :data="props.row.children"
                style="width: 100%; padding-left: 30px"
              >
                <el-table-column
                  prop="skuID"
                  label="商品ID"
                  width="100"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="goods_name"
                  label="商品名"
                  align="center"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="title"
                  label="商品标题"
                ></el-table-column>
                <el-table-column
                  prop="sku_product_specs"
                  label="规格"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="price"
                  label="商品价格"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="stock_num"
                  label="商品库存"
                  width="100"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <a
                      href="javascript:;"
                      @click="update_sku(scope.row)"
                      class="mr-3"
                      >修改</a
                    >
                    <a href="javascript:;" @click="delete_sku(scope.row)"
                      >删除</a
                    >
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="stock" label="商品库存"></el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="spuID" label="SpuID" width="100">
          </el-table-column>
          <el-table-column label="商品名" width="180">
            <template slot-scope="scope">
              <p>
                {{ scope.row.shop_name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            property="spu_product_specs"
            width="180"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.spu_product_specs }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="轮播图" class-name="img-set">
            <template slot-scope="props">
              <img
                v-lazy="i"
                v-for="i in props.row.images"
                :key="i"
                alt=""
                width="60"
                height="60"
              />
            </template>
          </el-table-column>
          <el-table-column label="背景图" class-name="img-set">
            <template slot-scope="props">
              <img
                v-lazy="i"
                v-for="i in props.row.details_images"
                :key="i"
                alt=""
                width="60"
                height="60"
              />
            </template>
          </el-table-column>
          <el-table-column
            propertry="attribute_list"
            label="详细信息"
            class-name="info-set"
          >
            <template slot-scope="scope">
              <p>
                {{ scope.row.attribute_list }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <a href="javascript:;" @click="update_spu(scope.row)" class="mr-3"
                >修改</a
              >
              <a href="javascript:;" @click="delete_spu(scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </main>
    <div class="thickdiv" @click="hiddenThick"></div>
    <!-- 增加SPU -->
    <div class="thickbox">
      <el-form ref="spuBox" :model="spu_box" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="spu_box.shop_name"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="spu_box.product_specs"></el-input>
        </el-form-item>
        <el-form-item label="轮播图">
          <el-input v-model="spu_box.images"></el-input>
        </el-form-item>
        <el-form-item label="背景图">
          <el-input v-model="spu_box.details_images"></el-input>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input v-model="spu_box.attribute_list"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="spu_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 增加SKU -->
    <div class="thickbox-1">
      <el-form ref="spuBox" :model="sku_box" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="sku_box.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="sku_box.product_specs"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="sku_box.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="sku_box.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="sku_box.stock_num"></el-input>
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="sku_box.weight"></el-input>
        </el-form-item>

        <el-form-item label="上架">
          <el-switch
            v-model="sku_box.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="sku_btn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Sidebar from "../components/AdminSidebar.vue";
import { Message } from "element-ui";

export default {
  name: "AdminShop",
  components: { AdminHeader, Sidebar },
  data() {
    return {
      tableData: [],
      // 弹出框中SPU的信息
      spu_box: {
        spuID: "",
        shop_name: "",
        product_specs: "", //规格
        images: "", //轮播图
        details_images: "", //背景图
        attribute_list: "",
      },
      //spu弹出框选择更新还是插入
      spu_choose: 1,
      //弹出框sku信息
      sku_box: {
        spuID: "",
        skuID: "",
        goods_name: "",
        product_specs: "",
        title: "",
        price: "",
        stock_num: "",
        weight: "",
        first_image: "",
        status: true,
      },
      sku_choose: 1,
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        //获得焦点
        if (el.className === "el-input") {
          el.querySelector("input").focus();
        } else if (el.className === "el-textarea") {
          el.querySelector("textarea").focus();
        }
        // console.log(this.$refs)
      },
    },
  },
  methods: {
    //根据条件将某行添加class
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 获取后台数据
    getInfo() {
      const _this = this;
      this.$axios.get("/admin/shop").then((res) => {
        var data = res.data.data;
        data.forEach((e) => {
          e.images = JSON.parse(e.images);
          e.details_images = JSON.parse(e.details_images);
        });
        _this.tableData = data.map((item) => {
          return { ...item, isSelected: false };
        });
      });
    },
    //隐藏界面
    hiddenThick() {
      document.querySelector(".thickdiv").style.display = "none";
      document.querySelector(".thickbox").style.display = "none";
      document.querySelector(".thickbox-1").style.display = "none";
    },
    //打开spu盒子
    openSpuBox(a) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
      if (a == 1) {
        this.spu_box.spuID = "";
        this.spu_box.shop_name = "";
        this.spu_box.product_specs = "";
        this.spu_box.images = [];
        this.spu_box.details_images = [];
        this.spu_box.attribute_list = "";
        this.spu_choose = 1;
      } else {
        this.spu_choose = 2;
      }
    },
    //提交添加apu按钮
    spu_btn() {
      const _this = this;
      var a = this.spu_box;
      if (this.spu_choose == 1) {
        //新增spu
        delete a["spuID"];
        this.$axios.post("/admin/shop_add_spu", a).then((res) => {
          _this.hiddenThick();
          _this.getInfo();
        });
      } else {
        // 更新spu
        this.$axios
          .post("/admin/shop_update_spu", {
            spuID: a.spuID,
            shop_name: a.shop_name,
            product_specs: a.product_specs,
            images: a.images,
            details_images: a.details_images,
            attribute_list: a.attribute_list,
          })
          .then((res) => {
            var msg = res.data.msg;
            Message.success(msg);
            _this.hiddenThick();
            _this.getInfo();
          });
      }
    },
    //删除spu按键
    delete_spu(row) {
      const _this = this;
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/admin/shop_delete_spu", {
              spuID: row.spuID,
            })
            .then(() => {
              _this.$message({
                type: "success",
                message: "删除成功!",
              });
              _this.getInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //更新spu
    update_spu(row) {
      this.spu_box.spuID = row.spuID;
      this.spu_box.shop_name = row.shop_name;
      this.spu_box.product_specs = row.spu_product_specs;
      this.spu_box.images = JSON.stringify(row.images);
      this.spu_box.details_images = JSON.stringify(row.details_images);
      this.spu_box.attribute_list = row.attribute_list;
      this.openSpuBox(2);
    },
    //打开sku盒子
    openSkuBox(row) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox-1").style.display = "block";
      this.sku_box.spuID = row.spuID;
      this.sku_box.first_image = row.images[0];
      this.sku_box.goods_name = row.children[0].goods_name;
      this.sku_box.title = row.children[0].title;
      this.sku_box.stock_num = "9999";
      this.sku_box.price = row.children[0].price;
      this.sku_box.weight = row.children[0].weight;
      this.sku_box.product_specs = "";
      this.sku_box.skuID = "";
      this.sku_choose = 1;
    },
    // sku提交
    sku_btn() {
      const _this = this;

      if (_this.sku_choose == 1) {
        _this.$axios.post("/admin/shop_add_sku", _this.sku_box).then((res) => {
          var msg = res.data.msg;
          Message.success(msg);
          _this.hiddenThick();
          _this.getInfo();
        });
      } else {
        console.log(1111);
        _this.$axios
          .post("/admin/shop_update_sku", _this.sku_box)
          .then((res) => {
            var msg = res.data.msg;
            Message.success(msg);
            _this.hiddenThick();
            _this.getInfo();
          });
      }
    },
    //删除sku按键
    delete_sku(row) {
      const _this = this;
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/admin/shop_delete_sku", {
              skuID: row.skuID,
            })
            .then(() => {
              _this.$message({
                type: "success",
                message: "删除成功!",
              });
              _this.getInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //更新sku
    update_sku(row) {
      console.log(row);
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox-1").style.display = "block";
      this.sku_box.goods_name = row.goods_name;
      this.sku_box.title = row.title;
      this.sku_box.stock_num = row.stock_num;
      this.sku_box.price = row.price;
      this.sku_box.weight = row.weight;
      this.sku_box.product_specs = row.sku_product_specs;
      this.sku_box.skuID = row.skuID;
      if (row.status == "1") {
        this.sku_box.status = true;
      } else {
        this.sku_box.status = false;
      }
      this.sku_choose = 2;
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  // left: 0;
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
  height: 100%;
}
.a_table {
  margin-right: 10px;
}
.a_table /deep/ .el-table .warning-row {
  background: oldlace;
}
.a_table /deep/ .el-table .success-row {
  background: #f0f9eb;
}
/* 设置列中图片的样式 */
.a_table .el-table .el-table__row .img-set img {
  // height: 60px;
  display: inline-block;
}
.a_table /deep/ .el-table td.el-table__cell.img-set div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 详细信息列中的样式 */
.a_table /deep/ .el-table td.el-table__cell.info-set div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

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
  height: 550px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}

/*确认框*/
div.el-message-box__wrapper {
  z-index: 10000;
}
</style>