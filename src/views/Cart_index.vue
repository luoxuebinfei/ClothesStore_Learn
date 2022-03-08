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
        >
          <el-table-column
            type="selection"
            width="55"
            name="全选"
          ></el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope"
              ><router-link
                :to="{ name: 'shopInfo', params: { id: scope.row.shopId } }"
                target="_blank"
                >{{ scope.row.shopname }}</router-link
              ></template
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
            prop="quantity"
            label="数量"
            align="center"
            width="120"
          >
            <template slot-scope="scope"
              ><el-input-number
                size="mini"
                v-model="scope.row.quantity"
                :min="1"
                @change="(value) => quantityChange(value, scope)"
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
                  (parseFloat(value.price) * value.quantity * 100) /
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
            <el-button type="primary">去结算</el-button>
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
      tableData: [
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.99", //单价
          quantity: 1, //数量
          shopId: 1, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 1, //数量
          shopId: 2, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 3, //数量
          shopId: 3, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 4, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 5, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 6, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 7, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 8, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 9, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 10, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 11, //商品ID
        },
        {
          shopname:
            "OPPO Enco X2真无线入耳式蓝牙耳机 降噪游戏音乐运动耳机 久石让调音 通用苹果华为小米手机 凝霜白",
          price: "999.00", //单价
          quantity: 4, //数量
          shopId: 12, //商品ID
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    //单个商品数量改变时执行的函数
    quantityChange: function () {
      this.changeNumAndSum();
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
    },
    quanxuan: function () {
      //底下的全选按钮
      this.$refs.multipleTable.toggleAllSelection();
    },
    changeNumAndSum() {
      let n = 0,
        m = 0;
      this.multipleSelection.forEach((element) => {
        n = n.add((parseFloat(element.price) * 100 * element.quantity) / 100); //商品总价
        m += parseInt(element.quantity);
      });
      this.shopPriceSum = n.toFixed(2);
      this.shopNum = m;
    },
    //删除选中商品
    removeCheck(row) {
      if (row != undefined) {
        //单行删除
        this.tableData = diffrence(this.tableData, Array(row));
      } else {
        //多选删除
        this.tableData = diffrence(this.tableData, this.multipleSelection);
      }
      if (this.tableData.length == 0) {
        document.querySelector(".cart-floatbar").style.display = "none";
      }
      //向后端发送请求，将后端用户购物车中数据一并删除
    },
    tableRowClassName({ row }) {
      // 当前选中行id 与 表格的各行比较
      //如果当前行在已选中的数据中则返回
      if (this.multipleSelection.some((item) => item === row)) {
        return "success-row";
      }
      return "";
    },
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
  .table /deep/ .success-row,.success-row>*:hover {
    background-color: rgb(255, 244, 232);
  }
  /* 商品列表中的文字颜色 */
  .cell a:hover {
    color: red;
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