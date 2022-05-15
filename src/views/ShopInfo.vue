<template>
  <!-- 商品详情页 -->
  <div>
    <header><Header></Header></header>
    <main>
      <div class="w">
        <div class="product-intro clearfix">
          <div class="preview-wrap">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in specImages" :key="item">
                <img :src="item" alt="轮播图" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="itemInfo-wrap">
            <div class="sku-name">{{ skuName }}</div>
            <div class="summary">
              <div class="summary-price clearfix">
                <div class="dt">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="dd">￥{{ price }}</div>
              </div>
              <div class="summary-stock clearfix">
                <div class="dt">配 送 至</div>
                <div class="dd">
                  <el-select
                    v-model="areaId"
                    filterable
                    allow-create
                    default-first-option
                    @change="changeAddress"
                    placeholder="请选择配送地址"
                  >
                    <el-option
                      v-for="item of areaData"
                      :key="item.id"
                      :label="item.name + ' ' + item.address + ' ' + item.phone"
                      :value="item.id"
                    >
                      <span style="float: left">{{
                        item.name + " " + item.address + " " + item.phone
                      }}</span>
                      <!-- <span
                        style="
                          margin-left: 15px;
                          color: #8492a6;
                          font-size: 13px;
                        "
                        >({{ item.areaId }})</span
                      > -->
                    </el-option>
                  </el-select>
                  <div class="stock" v-if="stock">有货</div>
                  <div class="stock" v-else>无货</div>
                  <a
                    href="/home#address"
                    style="color: #666; margin-left: 1rem; font-size: 16px"
                    >新增地址</a
                  >
                </div>
              </div>
              <div class="summary-weight clearfix">
                <div class="dt">重&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</div>
                <div class="dd">{{ weight }}</div>
              </div>
            </div>
            <div class="choose-attrs">
              <div id="choose-attr-1" class="li clearfix">
                <div class="dt">选择颜色</div>
                <div class="dd">
                  <div
                    v-for="i in attrs.color"
                    :key="i.skuid"
                    class="item"
                    v-bind:class="{ disabled: !i.stock }"
                    :data-sku="i.skuid"
                    :title="i.text"
                  >
                    <router-link
                      :to="{ name: 'shopInfo', params: { id: i.skuid } }"
                      v-if="i.skuid != ''"
                      ><img
                        :src="i.imgurl"
                        :alt="i.text"
                        width="40px"
                        height="40px"
                      /><i>{{ i.text }}</i></router-link
                    >
                  </div>
                </div>
              </div>
              <div id="choose-attr-2" class="li clearfix">
                <div class="dt">选择尺码</div>
                <div class="dd">
                  <div
                    v-for="i in attrs.size"
                    :key="i.skuid"
                    class="item"
                    v-bind:class="{ disabled: !i.stock }"
                    :data-sku="i.skuid"
                    :title="i.text"
                  >
                    <router-link
                      :to="{ name: 'shopInfo', params: { id: i.skuid } }"
                      ><i>{{ i.text }}</i></router-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div id="choose-btns" class="clearfix">
              <div class="choose-amount">
                <!-- 购买数量 -->
                <el-input-number
                  v-model="buyNum"
                  controls-position="right"
                  @change="queryStock"
                  :min="1"
                ></el-input-number>
              </div>
              <div class="btn-special1">
                <el-button @click="addCart">加入购物车</el-button>
              </div>
              <div class="btn-buy">
                <el-button @click="getOrderClient">立即购买</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w clearfix">
        <!-- 店铺、详情、评论 -->
        <!-- <div class="aside">
          <div class="popbox-inner">
            <div class="mt">
              <h3>
                <router-link
                  :to="{ name: 'mall', params: { id: shopId } }"
                  target="_blank"
                  :title="shopName"
                  >{{ shopName }}</router-link
                >
              </h3>
            </div>
            <div class="mc">
              <div class="btns">
                <router-link
                  :to="{ name: 'mall', params: { id: shopId } }"
                  target="_blank"
                  :title="shopName"
                  ><button>进店逛逛</button></router-link
                >

                <button @click="followMall" class="follow-shop">
                  关注店铺
                </button>
              </div>
            </div>
          </div>
        </div> -->
        <div class="detail">
          <div class="ETab">
            <div class="tab-main">
              <ul @click="chooseCurrent">
                <li class="current" clstag="shangpinjieshao">商品介绍</li>
                <!-- <li clstag="shouhoubaozhang">售后保障</li> -->
                <!-- <li clstag="pingjia">商品评价</li> -->
              </ul>
            </div>
            <div class="tab-con">
              <div v-show="chooseNum == 1">
                <div class="p-parameter">
                  <ul class="p-parameter-list clearfix">
                    <li :title="parameter.brand">
                      品牌：{{ parameter.brand }}
                    </li>
                  </ul>
                  <ul class="parameter2 clearfix">
                    <li
                      v-for="(value, name) in parameter.parameter2"
                      :key="name"
                      :title="value"
                    >
                      {{ name }}：{{ value }}
                    </li>
                  </ul>
                </div>
              </div>
              <div v-show="chooseNum == 2">
                <div class="guarantee">
                  <div class="mt">售后保障</div>
                  <div class="mc">
                    <div class="item-detail">
                      <div class="serve-agree-bd"><dl></dl></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="J-detail-content" v-show="chooseNum == 1">
              <div class="ssd-module-wrap">
                <img v-lazy="i" alt="" v-for="i in detailsImages" :key="i" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <aside><el-backtop></el-backtop></aside>
    <footer><Footer></Footer></footer>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      specImages: [
        //350x350大小的图片
      ],
      smallSpecImages: [
        //50x50大小的图片
      ],
      skuName: "",
      price: "",
      areaId: "",
      areaData: [],
      weight: "0.5kg",
      stock: false,
      attrs: {
        color: [],
        size: [],
        // stock: true,
      },
      buyNum: 1, //购买数量
      shopName: "雅鹿服装自营旗舰店", //店铺名字
      shopId: 1, //店铺id
      parameter: {},
      detailsImages: [],
      chooseNum: 1, //切换参数
    };
  },
  methods: {
    //   将轮播图指示器渲染成图片
    indicatorToimage: function () {
      var a = document.querySelectorAll(".el-carousel__button");
      // console.log(a);
      for (let i in this.specImages) {
        //添加一个img
        let img = document.createElement("img");
        img.width = "50";
        img.height = "50";
        img.src = this.specImages[i];
        //加到button里面
        a[i].appendChild(img);
      }
    },
    //根据本页面skuid选中相应的选项
    setChooseAttrClassName: function () {
      var skuid = window.location.pathname.split("/")[2];
      var items = document.querySelectorAll(".dd .item");
      items.forEach((element) => {
        if (element.getAttribute("data-sku") == skuid) {
          element.className = "item selected";
        }
      });
    },
    //库存查询，更新attrs数据
    queryStock: function () {},
    //请求关注店铺api
    followMall: function () {},
    //切换列表
    chooseCurrent: function (e) {
      var a = e.toElement;
      // console.log(e.toElement.className);
      //选中的元素
      if (a.localName != "ul") {
        document
          .querySelector(".tab-main li.current")
          .classList.remove("current");
        a.className = "current";
      }
      var c = document.querySelector(".tab-main li.current");
      //切换
      if (c.getAttribute("clstag") == "shangpinjieshao") {
        this.chooseNum = 1;
      } else if (c.getAttribute("clstag") == "shouhoubaozhang") {
        this.chooseNum = 2;
      }
    },
    //加载详情图
    loadDetailsImages: function () {
      var d = document.querySelector(".J-detail-content .ssd-module-wrap");
      for (let i of this.detailsImages) {
        let img = new Image();
        img.src = i;
        // 判断是否有缓存
        var height;
        if (img.complete) {
          height = img.height;
        } else {
          // 加载完成执行
          img.onload = function () {
            height = img.height;
          };
        }
        let bg = document.createElement("div");
        bg.style.cssText += `background-image:url(${i})`;
        bg.style.cssText += "background-color:#b3b3b3";
        bg.style.cssText += "background-size:100% 100%";
        bg.style.cssText += `width:750px`;
        bg.style.cssText += `height:${height}px`;
        d.appendChild(bg);
      }
    },
    //添加商品到购物车
    addCart() {
      var skuid = window.location.pathname.substring(10);
      this.$axios
        .post("/add_cart", {
          skuId: skuid,
          buyNum: this.buyNum.toString(),
        })
        .then((res) => {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        });
    },
    //进入订单提交页面
    getOrderClient() {
      var skuid = window.location.pathname.split("/")[2];
      const _this = this;
      var m = new Array();
      m.push({
        skuid: skuid,
        buyNum: _this.buyNum.toString(),
      });
      this.$axios
        .post("/get_order_client", {
          data: m,
        })
        .then((res) => {
          let data = res.data.data;
          window.sessionStorage.setItem("checkedData", JSON.stringify(data));
          _this.$router.push("/order_client");
        });
    },
    //后台请求商品信息
    getshopInfo() {
      var skuid = window.location.pathname.split("/")[2];
      const _this = this;
      axios.get(`/shopInfo/${skuid}`).then((res) => {
        var data = res.data.data;
        _this.specImages = JSON.parse(data["specImages"]); //轮播图
        _this.detailsImages = JSON.parse(data.detailsImages); //详情图
        _this.attrs = data.attrs; //规格切换
        _this.skuName = data.skuName; //标题
        _this.price = data.price; //价格
        _this.parameter.parameter2 = JSON.parse(data.parameter2); //详细参数
        _this.stock = data.stock; //有货无货
        _this.parameter.brand = data.brand_name; //品牌名
        _this.weight = data.weight; //重量
        _this.$nextTick(() => {
          _this.indicatorToimage();
        });
      });
      console.log(window.localStorage.getItem("token"));
      // _this.$nextTick(() => {
      //   if (
      //     window.localStorage.getItem("token") == "" ||
      //     window.localStorage.getItem("token") == undefined
      //   ) {
      //     this.areaData = [];
      //     this.areaId = "";
      //   } else {
      //     console.log(111);
      //     this.$axios.get("/get_address").then((res) => {
      //       let data = res.data.data;
      //       data = data.sort((a, b) => {
      //         return parseInt(b.is_default) - parseInt(a.is_default);
      //       });
      //       _this.areaId = data[0].id;
      //       _this.areaData = data;
      //     });
      //   }
      // });
    },
    //切换默认收货地址
    changeAddress(value) {
      const _this = this;
      this.$axios
        .post("/change_addressDefault", {
          id: value,
        })
        .then((res) => {
          var data = res.data.data;
          _this.areaData = data.sort((a, b) => {
            return parseInt(b.is_default) - parseInt(a.is_default);
          });
          console.log(_this.areaData);
        });
    },
  },
  mounted() {
    //在完全加载后再执行函数
    this.$nextTick(() => {
      this.getshopInfo();
    });
    

    // this.$nextTick(() => this.indicatorToimage());
    // this.$nextTick(() => this.setChooseAttrClassName());
    // this.$nextTick(() => this.loadDetailsImages()); //加载详情图
  },
  created(){
    const _this = this;
    this.$nextTick(() => {
      if (
        window.localStorage.getItem("token") == "" ||
        window.localStorage.getItem("token") == undefined
      ) {
        this.areaData = [];
        this.areaId = "";
      } else {
        console.log(111);
        this.$axios.get("/get_address").then((res) => {
          let data = res.data.data;
          data = data.sort((a, b) => {
            return parseInt(b.is_default) - parseInt(a.is_default);
          });
          _this.areaId = data[0].id;
          _this.areaData = data;
        });
      }
    });
  },
  updated() {
    this.$once("hook:updated", function () {
      // this.indicatorToimage();
      this.setChooseAttrClassName();
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0.8rem auto;
}
i {
  font-style: normal;
}
.w {
  width: 80%;
  margin: 0 auto;
}
/* 轮播图样式 */
.preview-wrap .el-carousel {
  width: 350px;
  height: 400px;
}
.preview-wrap /deep/.el-carousel__button {
  width: 50px;
  height: 50px;
}

/* 轮播图和价格信息浮动并排 */
.preview-wrap {
  float: left;
}
.itemInfo-wrap {
  float: left;
  margin-left: 2.5rem;
}
.itemInfo-wrap .sku-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 5px;
}
/* 价格条幅 */
.summary {
  background-color: #f3f3f3;
}
.summary .summary-price,
.summary-stock,
.summary-weight {
  padding: 1rem 0.5rem;
}
/* 库存信息样式 */
.summary-stock .stock {
  display: inline-block;
  color: rgb(155, 153, 153);
  font-size: 14px;
  margin-left: 1rem;
}
.summary .dt {
  float: left;
  font-size: 14px;
  color: rgb(153, 153, 153);
}
.summary .dd {
  float: left;
  padding: 0 12px;
  font-size: 22px;
  color: red;
}
/* 对配送栏的修改 */
.summary-stock .dt {
  line-height: 40px;
}
.summary-stock .dd .el-select {
  width: 300px;
}
.summary-weight .dd {
  line-height: 20px;
}
.summary-weight .dd {
  font-size: 14px;
  color: #666;
  line-height: 20px;
}
/* 选择栏 */
.choose-attrs {
  padding: 1rem 0.5rem;
}
.choose-attrs .dt {
  float: left;
  font-size: 14px;
  color: rgb(153, 153, 153);
  line-height: 40px;
}
.choose-attrs .dd {
  float: left;
  padding: 0 12px;
  font-size: 22px;
  color: #666;
}
.li .item {
  float: left;
  margin-right: 1rem;
  font-size: 14px;
  line-height: 40px;
  background-color: #f7f7f7;
  border: 1px solid rgb(204, 204, 204);
  margin-right: 7px;
  margin-bottom: 8px;
}
/* 滑到上面边框变红 */
.item:hover {
  border: 1px solid red;
}
.choose-attrs .item img,
i {
  display: inline-block;
}
.choose-attrs .item i {
  margin: 0 8px;
}
/* 选择栏无货样式 */
.disabled,
.disabled:hover {
  border: 1px dashed rgb(204, 204, 204);
  /* 鼠标禁止点击 */
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
/* 选择栏选中样式 */
.choose-attrs .selected {
  border: 1px solid red !important;
}

/* 购买栏样式 */
// #choose-btns{
//   display: flex;
// }
#choose-btns .choose-amount {
  float: left;
  margin-right: 1rem;
}
#choose-btns .choose-amount .el-input-number {
  width: 120px;
}
#choose-btns .btn-special1 {
  /* 加入购物车按钮 */
  float: left;
  margin-right: 1rem;
}
#choose-btns .btn-special1 .el-button {
  background-color: rgb(98, 153, 54);
  color: white;
  font-weight: 700;
}
#choose-btns .btn-buy {
  /* 购买按钮 */
  float: left;
}
#choose-btns .btn-buy .el-button {
  background-color: red;
  color: white;
  font-weight: 700;
}
/* 店铺 */
.aside {
  float: left;
  margin-top: 3rem;
}
.popbox-inner {
  width: 180px;
  border: 1px solid #ddd;
}
.popbox-inner .mt {
  text-align: center;
  background-color: rgb(245, 245, 245);
  padding: 10px;
  position: sticky;
  top: 0;
}
.popbox-inner .mc {
  padding: 10px;
}
.popbox-inner .mc .btns button {
  display: inline-block;
  width: 75px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  line-height: 34px;
  font-size: 14px;
}
.popbox-inner .mc .btns .follow-shop {
  margin-left: 8px;
}

/* 商品详情页 */
.detail {
  float: right;
  margin-top: 3rem;
  width: 990px;
  margin-right: 1.5rem;
}
.tab-main {
  background-color: #f7f7f7;
  width: 100%;
  border-bottom: 1px solid red;
  position: sticky;
  top: 0;
}
.tab-main > ul > li {
  display: inline-block;
  margin-right: 15px;
  padding: 15px;
  line-height: 20px;
  font-weight: 700;
  cursor: pointer;
}
.tab-main li:not(.current):hover {
  /* 除了current类其他会变红 */
  color: red;
}
.tab-main .current {
  background-color: red;
  color: white;
}
/* 参数栏 */
.p-parameter {
  border-bottom: 1px solid #969696;
}
.p-parameter-list {
  padding: 20px 0;
}
.p-parameter-list > li,
.parameter2 > li {
  float: left;
  width: 200px;
  padding-left: 42px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #666;
}
/* 详情图 */
.ssd-module-wrap {
  margin: 30px auto;
  width: 750px;
  text-align: center;
}

footer,
footer > .w {
  width: 100%;
}
</style>