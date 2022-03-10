<template>
  <!-- 商品详情页 -->
  <div>
    <header><Header></Header></header>
    <main>
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
              <div class="dt">京 东 价</div>
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
                      style="margin-left: 15px; color: #8492a6; font-size: 13px"
                      >({{ item.areaId }})</span
                    >
                    <router-link to="\login" style="display: block"
                      >新增地址</router-link
                    >
                  </el-option>
                </el-select>
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
            <div id="choose-attr-1">
              <div class="dt">选择颜色</div>
              <div class="dd">
                <div v-for="i of attrs.color" :key="i" class="item" v-bind:class="{selected:i.stock,disabled:!i.stock}" :data-sku="i.skuid" :title="i.text">
                  <router-link :to="{name:'shopInfo',params:{id:i.skuid}}"><img :src="i.imgurl" :alt="i.text" width="40px" height="40px"><i>{{i.text}}</i></router-link>
                </div>
              </div>
            </div>
            <div id="choose-attr-2"></div>
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
      attrs:{color:[{skuid:"1",text:"黑色",stock:true,imgurl:"https://img13.360buyimg.com/n9/s40x40_jfs/t1/115912/7/19734/103753/5f81a091E9e6aa2a0/2baec75362bd45a6.jpg"},{skuid:"2",text:"墨绿",stock:true,imgurl:"https://img10.360buyimg.com/n9/s40x40_jfs/t1/132882/23/11610/92928/5f81a0d7Ecb468728/34f5f0e17aefc520.jpg"}],size:[]}
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
  },
  mounted() {
    //在完全加载后再执行函数
    this.$nextTick(() => this.indicatorToimage());
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0.8rem auto;
}
i{
  font-style: normal;
}
.product-intro {
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
.choose-attrs{
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
.choose-attrs .item{
  float: left;
  margin-right: 1rem;
  font-size: 16px;
  background-color: #f7f7f7;
}
.choose-attrs .item img,i{
  display: inline-block;
  
}
.choose-attrs .item i{
  margin: 0 8px;
}
/* 选择栏有货无货样式 */
// {
//   border: 1px solid red;
// }
.choose-attrs .disabled {
  border: 1px dashed rgb(204, 204, 204);
}
</style>