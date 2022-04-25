<template>
  <!-- 购物车页面 -->
  <div id="cart">
    <header><Header></Header></header>
    <main>
      <div class="cart-filter-bar">
        <div class="switch-cart">全部商品 {{ this.tableData.length }}</div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text="购物车是空的哦~ 快去选购商品吧~"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @select="changeChecked"
          @select-all="changeCheckedAll"
        >
          <el-table-column
            type="selection"
            width="55"
            name="全选"
          ></el-table-column>
          <el-table-column
            label="商品"
            width="400"
            class-name="shopname clearfix"
          >
            <template slot-scope="scope"
              ><div class="goods-item clearfix">
                <div class="p-img">
                  <router-link
                    :to="{ name: 'shopInfo', params: { id: scope.row.shopId } }"
                    target="_blank"
                    class="clearfix"
                    :title="scope.row.shopname"
                    ><img :src="scope.row.imgurl" :alt="scope.row.shopname" width="80" height="80"
                  /></router-link>
                </div>
                <div class="p-meg">
                  <router-link
                    :to="{ name: 'shopInfo', params: { id: scope.row.shopId } }"
                    target="_blank"
                    class="clearfix"
                    :title="scope.row.shopname"
                    >{{ scope.row.shopname }}</router-link
                  >
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- 规格列 -->
          <el-table-column prop="props" align="left">
            <template slot-scope="scope"
              ><div>
                <p>{{ scope.row.props.split(" ")[0] }}</p>
                <p>{{ scope.row.props.split(" ")[1] }}</p>
              </div></template
            >
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="120"
            align="center"
            :formatter="
              (value) => {
                return `￥${value.price}`;
              }
            "
          >
          </el-table-column>
          <el-table-column
            prop="buyNum"
            label="数量"
            align="center"
            width="120"
          >
            <template slot-scope="scope"
              ><el-input-number
                size="mini"
                v-model="scope.row.buyNum"
                :min="1"
                @change="
                  (newValue, oldValue) =>
                    buyNumChange(newValue, scope, oldValue)
                "
              ></el-input-number
            ></template>
          </el-table-column>
          <el-table-column
            prop="sum"
            label="小计"
            width="120"
            class-name="sum"
            :formatter="
              (value) => {
                return `￥${(
                  (parseFloat(value.price) * value.buyNum * 100) /
                  100
                ).toFixed(2)}`;
              }
            "
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="操作" width="120" align="center">
            <template slot-scope="scope"
              ><el-button type="danger" @click="removeCheck(scope.row)"
                >删除</el-button
              ></template
            ></el-table-column
          >
        </el-table>
      </div>
      <div class="cart-floatbar clearfix">
        <div class="left">
          <el-checkbox v-model="checked" @change="quanxuan">全选</el-checkbox>
          <div class="operation">
            <a @click="removeCheck(undefined)">删除选中的商品</a>
          </div>
        </div>

        <div class="right clearfix">
          <div class="price-sum">
            已选择
            <span style="color: red; font-size: 18px">{{ shopNum }}</span>
            件商品，总计
            <span style="color: red; font-size: 18px"
              >￥{{ shopPriceSum }}</span
            >
            元
          </div>
          <div class="btn-area">
            <el-button type="primary" @click="orderclient">去结算</el-button>
          </div>
        </div>
      </div>
    </main>
    <footer><Footer></Footer></footer>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Cart_index",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      checked: false, //底下全选按钮的选中情况
      shopNum: 0, //商品数量
      shopPriceSum: 0, //商品总价
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    //单个商品数量改变时执行的函数
    buyNumChange: function (newValue, scope, oldValue) {
      this.$axios
        .post("/update_cart_num", {
          skuId: scope.row.shopId,
          num: newValue.toString(),
        })
        .then(() => {
          this.changeNumAndSum();
        })
        .catch(() => {
          scope.row.buyNum = oldValue;
        });
    },

    // 当选中情况发生变化所执行的函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //表头的全选与底下的全选关联起来
      this.multipleSelection.length === this.tableData.length &&
      this.tableData.length != 0
        ? (this.checked = true)
        : (this.checked = false);
      this.changeNumAndSum(val);
      if (this.tableData.length == 0) {
        document.querySelector(".cart-floatbar").style.display = "none";
      }
      // console.log(val)
    },
    quanxuan: function () {
      //底下的全选按钮
      this.$refs.multipleTable.toggleAllSelection();
    },
    //改变数量总价
    changeNumAndSum() {
      let n = 0,
        m = 0;
      this.multipleSelection.forEach((element) => {
        n = n.add((parseFloat(element.price) * 100 * element.buyNum) / 100); //商品总价
        m += parseInt(element.buyNum);
      });
      this.shopPriceSum = n.toFixed(2);
      this.shopNum = m;
    },
    //删除选中商品
    removeCheck(row) {
      this.$confirm("此操作将从购物车中删除商品，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //向后端发送请求，将后端用户购物车中数据一并删除
          if (row != undefined) {
            //单行删除
            this.$axios
              .post("/delete_cart_shop", {
                data: [row.shopId],
              })
              .then(() => {
                this.tableData = diffrence(this.tableData, Array(row));
              });
          } else {
            //多选删除
            var x = [];
            for (let i of this.multipleSelection) {
              x.push(i.shopId);
            }
            this.$axios
              .post("/delete_cart_shop", {
                data: x,
              })
              .then(() => {
                this.tableData = diffrence(
                  this.tableData,
                  this.multipleSelection
                );
              });
          }
          if (this.tableData.length == 0) {
            document.querySelector(".cart-floatbar").style.display = "none";
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    tableRowClassName({ row }) {
      // 当前选中行id 与 表格的各行比较
      //如果当前行在已选中的数据中则返回
      if (this.multipleSelection.some((item) => item === row)) {
        return "success-row";
      }
      return "";
    },
    //进入提交订单页面
    orderclient() {
      if (this.multipleSelection.length === 0) {
        return;
      }
      var m = this.multipleSelection;
      m = m.map((e)=>{
        var a = {};
        a.skuid = e.shopId;
        a.buyNum = e.buyNum.toString();
        return a
      })
      const _this = this;
      this.$axios.post("/get_order_client",{
        data:m,
      }).then((res)=>{
        let data = res.data.data;
        window.sessionStorage.setItem("checkedData", JSON.stringify(data));
        var route = _this.$router.resolve({ name: "orderClient" });
        window.open(route.href, "_blank");
      })
    },
    //通过api获取购物车数据
    getCartIndex() {
      const _this = this;
      this.$axios.get("/cart_index").then((res) => {
        var data = res.data.data;
        if (data === null) {
          _this.tableData = [];
        } else {
          _this.tableData = data;
          _this.multipleSelection = data.filter((res) => {
            return res.checked == "1";
          });
          _this.$nextTick(() => {
            for (let i of _this.multipleSelection) {
              _this.$refs.multipleTable.toggleRowSelection(i, true);
            }
          });
        }
      });
    },
    //当切换某一行选中状态时执行的函数
    changeChecked(selection, row) {
      var status = "1"; //默认为选中
      if (selection.indexOf(row) != -1) {
        status = "1";
      } else {
        status = "2";
      }
      this.$axios.post("/change_cart_checked", {
        data: [row.shopId],
        status: status,
      });
    },
    //点击全选时执行的函数
    changeCheckedAll(selection) {
      var x = [];
      if (selection.length === 0) {
        for (let i of this.tableData) {
          x.push(i.shopId);
        }
        this.$axios.post("/change_cart_checked", {
          data: x,
          status: "2",
        });
      } else {
        for (let i of selection) {
          x.push(i.shopId);
        }
        this.$axios.post("/change_cart_checked", {
          data: x,
          status: "1",
        });
      }
    },
  },
  created() {
    this.$nextTick(function () {
      this.getCartIndex();
    });
  },
};
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
};
function diffrence(a, b) {
  a = a.map(JSON.stringify);
  b = b.map(JSON.stringify);
  return a
    .concat(b)
    .filter((v) => !a.includes(v) || !b.includes(v))
    .map(JSON.parse);
}
</script>

<style lang="scss" scoped>
/* 购物车页面css */
#cart {
  position: relative;
  min-height: 100%;
}
header {
  min-width: 1200px;
}
main {
  margin: 0.8rem auto;
  width: 80%;
  position: relative;
  transform: scale3d(1, 1, 1);
  padding-bottom: 5.5rem;
}
/* 标头 */
.cart-filter-bar {
  margin-bottom: 0.8rem;
}
.cart-filter-bar .switch-cart {
  color: red;
  font-weight: 700;
  font-size: 18px;
}
/* 表 */
.table {
  width: 100%;
  min-width: 1200px;
  z-index: 99;
}
.table /deep/ .el-input-number--mini {
  width: 100px;
}
/* 表头设置为灰色 */
.table /deep/ thead.has-gutter tr > * {
  background-color: rgb(243, 243, 243);
}
/* 选中的行背景色 */
.table /deep/ .success-row,
.success-row > *:hover {
  background-color: rgb(255, 244, 232);
}
/* 商品列表中的文字颜色 */
.cell a:hover {
  color: red;
}
/* 商品列中文字换行 */
.table .goods-item .p-meg {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*（行数）*/
  -webkit-box-orient: vertical;
}
/* 商品列表中图片和文字并排 */
.table .goods-item {
  float: left;
  margin: 12px auto;
}
.table .goods-item .p-img {
  float: left;
  margin-right: 1rem;
}

/* 小计中文字的粗细 */
.table /deep/ .sum .cell {
  font-weight: 700;
}

/*底部结算栏*/
.cart-floatbar {
  width: 100%;
  min-width: 1200px;
  height: 52px;
  margin: 2rem auto;
  border: 1px solid rgb(240, 240, 240);
  background-color: white;
  z-index: 100;
  position: sticky;
  bottom: 0;
}
.operation {
  display: inline-block;
  margin-left: 1rem;
  font-size: 14px;
}
.operation > a:hover {
  cursor: pointer;
}
.cart-floatbar .left {
  display: inline-block;
  margin-left: 0.8rem;
  /* //垂直居中 */
  line-height: 52px;
}
.cart-floatbar .right {
  display: inline-block;
  height: 52px;
  position: absolute;
  right: 0;
  top: -1px;
}
/* //总结文字 */
.cart-floatbar .right .price-sum {
  display: inline-block;
  font-size: 14px;
  margin-right: 1rem;
}
.cart-floatbar .right .btn-area {
  /* // float: left; */
  display: inline-block;
}
.btn-area /deep/ .el-button {
  height: 52px;
}

/* 底栏 */
footer {
  position: absolute;
  min-width: 1200px;
  height: 5.5rem;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>