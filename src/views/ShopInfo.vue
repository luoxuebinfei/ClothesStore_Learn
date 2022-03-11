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
                <div class="dd">￥158.00</div>
              </div>
              <div class="summary-stock clearfix">
                <div class="dt">配 送 至</div>
                <div class="dd">
                  <el-select
                    v-model="areaId"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择配送地址"
                  >
                    <el-option
                      v-for="item of areaData"
                      :key="item.areaId"
                      :label="item.areaText"
                      :value="item.areaId"
                    >
                      <span style="float: left">{{ item.areaText }}</span>
                      <span
                        style="
                          margin-left: 15px;
                          color: #8492a6;
                          font-size: 13px;
                        "
                        >({{ item.areaId }})</span
                      >
                    </el-option>
                  </el-select>
                  <div class="stock" v-if="attrs.stock">有货</div>
                  <div class="stock" v-else>无货</div>
                  <router-link
                    to=""
                    style="color: #666; margin-left: 1rem; font-size: 16px"
                    >新增地址</router-link
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
                    v-for="i of attrs.color"
                    :key="i.skuid"
                    class="item"
                    v-bind:class="{ disabled: !i.stock }"
                    :data-sku="i.skuid"
                    :title="i.text"
                  >
                    <router-link
                      :to="{ name: 'shopInfo', params: { id: i.skuid } }"
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
                    v-for="i of attrs.size"
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
                <el-button>加入购物车</el-button>
              </div>
              <div class="btn-buy">
                <el-button>立即购买</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w">
        <!-- 店铺、详情、评论 -->
        <div class="aside">
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
                  >进店逛逛</router-link
                >
                <a href="/"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "../components/Shop-Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      specImages: [
        //350x350大小的图片
        "https://img14.360buyimg.com/n1/jfs/t1/115912/7/19734/103753/5f81a091E9e6aa2a0/2baec75362bd45a6.jpg",
        "https://img14.360buyimg.com/n1/jfs/t1/126305/8/14564/91164/5f81a090Eab367090/db16b395687aca42.jpg",
        "https://img14.360buyimg.com/n1/jfs/t1/120562/13/14617/85552/5f81a091Ef44628b3/b69d1a258b2d2d78.jpg",
        "https://img14.360buyimg.com/n1/jfs/t1/115864/23/19753/86031/5f81a091Eb46675d7/7595b5353e4f8abe.jpg",
        "https://img14.360buyimg.com/n1/jfs/t1/149290/30/10358/111037/5f81a091E101606aa/a5bf2c5ab0833d9f.jpg",
      ],
      smallSpecImages: [
        //50x50大小的图片
        "https://img14.360buyimg.com/n5/jfs/t1/115912/7/19734/103753/5f81a091E9e6aa2a0/2baec75362bd45a6.jpg",
        "https://img14.360buyimg.com/n5/jfs/t1/126305/8/14564/91164/5f81a090Eab367090/db16b395687aca42.jpg",
        "https://img14.360buyimg.com/n5/jfs/t1/120562/13/14617/85552/5f81a091Ef44628b3/b69d1a258b2d2d78.jpg",
        "https://img14.360buyimg.com/n5/jfs/t1/115864/23/19753/86031/5f81a091Eb46675d7/7595b5353e4f8abe.jpg",
        "https://img14.360buyimg.com/n5/jfs/t1/149290/30/10358/111037/5f81a091E101606aa/a5bf2c5ab0833d9f.jpg",
      ],
      skuName:
        "雅鹿 男士棉衣 2021冬季男士青年时尚简约百搭纯色宽松保暖立领棉衣 19781012 黑色 175/XL",
      areaId: "23-3690-3696-53704",
      areaData: [
        {
          areaId: "23-3690-3696-53704",
          areaText: "海南三亚市天涯区河西区街道",
        },
      ],
      weight: "0.5kg",
      attrs: {
        color: [
          {
            skuid: "1",
            text: "黑色",
            stock: true,
            isChecked: true,
            imgurl:
              "https://img13.360buyimg.com/n9/s40x40_jfs/t1/115912/7/19734/103753/5f81a091E9e6aa2a0/2baec75362bd45a6.jpg",
          },
          {
            skuid: "2",
            text: "墨绿",
            stock: false,
            isChecked: false,
            imgurl:
              "https://img10.360buyimg.com/n9/s40x40_jfs/t1/132882/23/11610/92928/5f81a0d7Ecb468728/34f5f0e17aefc520.jpg",
          },
        ],
        size: [
          { skuid: "3", text: "170/L", stock: true, isChecked: false },
          { skuid: "4", text: "175/XL", stock: true, isChecked: false },
          { skuid: "1", text: "180/2XL", stock: true, isChecked: true },
          { skuid: "5", text: "190/4XL", stock: true, isChecked: false },
        ],
        stock: true,
      },
      buyNum: 1, //购买数量
      shopName: "雅鹿服装自营旗舰店", //店铺名字
      shopId: 1, //店铺id
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
        img.src = this.smallSpecImages[i];
        //加到button里面
        a[i].appendChild(img);
      }
    },
    //根据本页面skuid选中相应的选项
    setChooseAttrClassName: function () {
      var skuid = window.location.pathname.split("/")[2];
      var items = document.querySelectorAll(".item");
      items.forEach((element) => {
        if (element.getAttribute("data-sku") == skuid) {
          element.className = "item selected";
        }
      });
    },
    //库存查询，更新attrs数据
    queryStock: function () {},
  },
  mounted() {
    //在完全加载后再执行函数
    this.$nextTick(() => this.indicatorToimage());
    this.$nextTick(() => this.setChooseAttrClassName());
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
.selected {
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
.popbox-inner {
  width: 180px;
}
.popbox-inner .mt {
  text-align: center;
  background-color: rgb(245, 245, 245);
  padding: 10px;
}
.popbox-inner .mc {
  padding: 10px;
}
</style>