<template>
  <div class="h-full">
    <div class="relative min-h-full" style="padding-bottom:102px">
      <header><Header></Header></header>
      <main>
        <div class="box">
          <div class="box-0 clearfix">
            <div class="left">
              订单结算页<span class="text-sm font-light inline-block ml-3"
                >填写并核对订单信息</span
              >
            </div>
          </div>
          <div class="checkout-steps">
            <div class="box-1 clearfix">
              <!-- 收货地址栏 -->
              <div class="left clearfix">
                <div class="dd">收货人信息</div>
                <div class="dt">
                  <el-select
                    v-model="addressId"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择配送地址"
                  >
                    <el-option
                      v-for="item of address"
                      :key="item.id"
                      :label="
                        item.name + '  ' + item.address + '  ' + item.phone
                      "
                      :value="item.id"
                    >
                      <span class="inline-block mr-2">{{ item.name }}</span>
                      <span class="inline-block mr-2">{{ item.address }}</span>
                      <span class="inline-block">{{ item.phone }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="right">
                <a href="">新增收货地址</a>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="box-2">
              <div
                class="goods-item clearfix"
                v-for="i of checkedData"
                :key="i.shopId"
              >
                <router-link
                  :to="{ name: 'shopInfo', params: { id: i.shopId } }"
                >
                  <img
                    :src="i.imgurl"
                    :alt="i.shopname"
                    :title="i.shopname"
                    width="60"
                    height="60"
                  />
                  <div class="shopname" :title="i.shopname">
                    {{ i.shopname }}
                  </div>
                  <div class="props">{{ i.props }}</div>
                  <div class="price">￥{{ i.price }}</div>
                  <div class="buynum">x{{ i.quantity }}</div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="box-3">
            <div class="order-money">总商品金额：￥{{ priceSum }}</div>
            <!-- <div class="order-money">￥{{priceSum}}</div> -->
          </div>
          <div class="box-4">
            <div class="pay-money">
              <span class="text-black">实付金额：</span
              ><span class="text-red-500 font-bold text-2xl"
                >￥{{ priceSum }}</span
              >
            </div>
            <div class="consignee-info">
              <span
                >寄送至：{{
                  address.find((res) => res.id === addressId)["address"]
                }}</span
              >
              <span
                >收货人：{{
                  address.find((res) => res.id === addressId)["name"] +
                  "  " +
                  address.find((res) => res.id === addressId)["phone"]
                }}</span
              >
            </div>
          </div>
          <div class="box-5">
            <el-button @click="postOrder">提交订单</el-button>
          </div>
        </div>
      </main>
      <footer><Footer></Footer></footer>
    </div>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "orderClient",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      addressId: "",
      checkedData: [],
      address: [],
      priceSum: "",
    };
  },
  methods: {
    getaddress() {
      const _this = this;
      this.$axios
        .get("/get_address")
        .then((res) => {
          _this.address = res.data.data;
          for (let i of res.data.data) {
            if (i.is_default == "1") {
              _this.addressId = i.id;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pricesum() {
      var sum = 0;
      for (let i of this.checkedData) {
        let price = parseFloat(i.price);
        let num = parseInt(i.quantity);
        sum = (price * 100 * num) / 100 + sum;
      }
      this.priceSum = sum.toFixed(2);
    },
    postOrder() {
      var _this = this;
      this.$axios
        .post("/order", {
          data: this.checkedData,
          area: this.address.find((res) => res.id == _this.addressId),
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  created() {
    //将选中数据提取出来
    this.checkedData = JSON.parse(sessionStorage.getItem("checkedData"));
    this.checkedData.forEach((res) => {
      Object.values(res).forEach((value) => {
        value = value.toString();
      });
    })
      this.$nextTick(this.getaddress());
  },
  mounted() {
    this.pricesum();
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 1266px;
  margin: 0.8rem auto;
  position: relative;
}
a {
  color: #005ea7;
}
a:hover {
  color: red;
}
.box-0 {
  position: relative;
}
.box-0 .left {
  font-size: 22px;
  font-weight: 600;
  // line-height: 22px;
  float: left;
}
.checkout-steps {
  margin-top: 1.5rem;
  border: 1px solid #f0f0f0;
  padding: 0 1.25rem;
}
/* 收货地址栏 */
.box-1 {
  padding: 1.25rem 0;
}
.box-1 .left {
  float: left;
}
.box-1 .dd {
  float: left;
  line-height: 50px;
}
.box-1 .dt {
  float: left;
  line-height: 50px;
  margin-left: 1.5rem;
  width: 30rem;
}
.box-1 .dt .el-select {
  width: 30rem;
}
.box-1 .right {
  float: left;
  line-height: 50px;
  margin-left: 10px;
}
/* 分割线样式 */
.checkout-steps .el-divider {
  margin: 0 0;
}
/* 商品列表 */
.box-2 {
  padding: 1.25rem 0;
  position: relative;
}
.box-2 a {
  color: black;
}
.box-2 .goods-item img,
.box-2 .goods-item .shopname,
.box-2 .goods-item .props,
.box-2 .goods-item .price,
.box-2 .goods-item .buynum {
  float: left;
  margin-right: 15px;
}
// .box-2 .goods-item .price{
//     position: absolute;
//     right: 10rem;
// }
// .box-2 .goods-item .buynum{
//     position: absolute;
//     right: 1rem;
// }

/* 订单金额 */
.box-3 {
  padding: 1.25rem;
}
.box-3 .order-money {
  position: absolute;
  right: 2rem;
}
.box-4 {
  padding: 1.25rem;
  background: #f4f4f4;
  color: #999;
  border-top: 1px solid #e6e6e6;
  text-align: right;
  margin-top: 20px;
}
.box-5 {
  padding: 1.25rem;
  text-align: right;
}
.box-5 .el-button {
  background: red;
  color: white;
  font-weight: 600;
}
footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 102px;
}
</style>
