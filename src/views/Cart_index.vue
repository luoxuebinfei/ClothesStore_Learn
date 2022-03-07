<template>
  <!-- 购物车页面 -->
  <div>
    <header><Header></Header></header>
    <main>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text="购物车是空的哦~ 快去选购商品吧~"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            name="全选"
          ></el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">{{ scope.row.shopname }}</template>
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
            :formatter="
              (value) => {
                return `￥${((parseFloat(value.price) * value.quantity * 100) /100).toFixed(2)}`;
              }
            "
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            width="120"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <div class="cart-floatbar">
        <el-checkbox v-model="checked" @change="quanxuan">全选</el-checkbox>
        <div class="operation">
          <a @click="removeCheck">删除选中的商品</a>
        </div>
        <p style="margin-left: 10rem; display: inline">
          已选择{{ shopNum }}件商品，总计￥{{ shopPriceSum }}元
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
export default {
  name: "Cart_index",
  components: {
    Header,
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
    },
    quanxuan: function () {
      //底下的全选按钮
      this.$refs.multipleTable.toggleAllSelection();
    },
    changeNumAndSum() {
      this.shopNum = this.multipleSelection.length;
      let n = 0;
      this.multipleSelection.forEach((element) => {
        n = n.add(parseFloat(element.price)*100*element.quantity/100);
      });
      this.shopPriceSum = n.toFixed(2);
    },
    //删除选中商品
    removeCheck() {
      this.tableData = diffrence(this.tableData, this.multipleSelection);
      //向后端发送请求，将后端用户购物车中数据一并删除
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
main {
  margin: 0.8rem auto;
  width: 80%;
}
/* 表 */
.table {
  width: 100%;
}
.table /deep/ .el-input-number--mini {
  width: 100px;
}
/*底部结算栏*/
.cart-floatbar {
  height: 50px;
  position: fixed;
  bottom: 0;
}
.operation {
  display: inline-block;
  margin-left: 1rem;
}
.operation > a:hover {
  cursor: pointer;
}
</style>