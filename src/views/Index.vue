<template>
  <!-- 商城首页 -->
  <div class="index">
    <header>
      <Header></Header>
    </header>
    <aside>
      
    </aside>
    <main>
      <div class="main">
        <div class="lc-floor-1 clearfix">
          <div class="lc-floor-nav">
            <p style="margin-top: 0.7rem">大家都在穿</p>
            <div class="nav-1">
              <router-link to="">应季新品</router-link>
              <router-link to="">商场同款</router-link>
              <router-link to="">休闲卫衣</router-link>
              <router-link to="">风衣外套</router-link>
              <router-link to="">毛衣针织</router-link>
            </div>
            <p style="margin-top: 0.7rem">上装</p>
            <div class="nav-1">
              <router-link to="">衬衫</router-link>
              <router-link to="">T恤</router-link>
              <router-link to="">卫衣</router-link>
              <router-link to="">风衣</router-link>
              <router-link to="">西装</router-link>
            </div>
            <p style="margin-top: 0.7rem">下装</p>
            <div class="nav-1">
              <router-link to="">牛仔裤</router-link>
              <router-link to="">休闲裤</router-link>
              <router-link to="">裙子</router-link>
              <router-link to="">运动裤</router-link>
              <router-link to="">短裤</router-link>
            </div>
            <p style="margin-top: 0.7rem">特色精选</p>
            <div class="nav-1" style="border: none">
              <router-link to="">唐装汉服</router-link>
              <router-link to="">lo裙</router-link>
              <router-link to="">礼服</router-link>
              <router-link to="">皮草</router-link>
              <router-link to="">中老年装</router-link>
            </div>
          </div>
          <div class="carousel">
            <el-carousel height="499px">
              <el-carousel-item v-for="item of imgeItems" :key="item">
                <h3 class="small">
                  <router-link to=""
                    ><img :src="item" alt="轮播图" style="width: 100%"
                  /></router-link>
                </h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <div class="lc-floor clearfix">
          <div id="bg-img1">
            <img
              src="https://img13.360buyimg.com/aotucms/jfs/t1/139392/11/15256/13448/604eff3eE59287370/b0db11a54b2e8e8e.jpg.webp"
              alt=""
            />
          </div>
          <div class="lc-ad-base">
            <div class="lc-ad-base-item" v-for="item of adImages" :key="item">
              <router-link to=""><img :src="item" alt="" /></router-link>
            </div>
          </div>
          <div>
            <img
              src="https://img13.360buyimg.com/aotucms/jfs/t1/159775/40/13368/12958/604ef4a4Ec2312c30/8b21386da21d2a06.jpg.webp"
              alt=""
            />
            <div class="lc-floor-recommend">
              <div
                class="lc-floor-recommend-item"
                v-for="item of good_items"
                :key="item"
              >
                <a :href="item.shoplink" target="_blank"
                  ><img :src="item.img" alt="" />
                  <p>{{ item.title }}</p></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <Floor></Floor>
    </footer>
    
  </div>
</template>

<script>
import Floor from "../components/Footer.vue";
import Header from "../components/Shop-Header.vue"
export default {
  name: "Index",
  components: {
    Floor,
    Header,
  },
  data() {
    return {
      imgeItems: [
        "https://img20.360buyimg.com/babel/s1900x980_jfs/t1/106604/21/24332/250258/6221715aE42ae1142/ec142def12c85578.jpg!cc_1900x980.webp",
        "https://img14.360buyimg.com/babel/s1900x980_jfs/t1/167076/25/27195/185846/6216f0c5Edc496740/08e2ace7263ff621.jpg!cc_1900x980.webp",
        "https://img14.360buyimg.com/babel/s1900x980_jfs/t1/221251/35/11667/511978/621de34fEc0aa0106/b105c210017c67bf.jpg!cc_1900x980.webp",
        "https://img20.360buyimg.com/babel/s1900x980_jfs/t1/213019/38/13791/185749/621dc318E429de4fb/70bdbdcffadae6f9.jpg!cc_1900x980.webp",
      ],
      adImages: [
        "https://img30.360buyimg.com/babel/jfs/t1/163230/25/12777/115876/6051a6b0E0ca33316/a973429be410acc4.png.webp",
        "https://img10.360buyimg.com/babel/jfs/t1/163369/30/12848/63228/605018f2Eabae21b5/c564eb8a92338dc3.jpg.webp",
        "https://img11.360buyimg.com/babel/jfs/t1/199645/4/19939/105135/61b314ceEaf0ccdf5/71886e15c90a17b3.png.webp",
        "https://img12.360buyimg.com/babel/jfs/t1/205435/2/17777/36870/61aec443E02dde074/5fc1010aa64b6d57.jpg.webp",
        "https://img14.360buyimg.com/babel/jfs/t1/169386/23/25220/27488/619efba8E14f5e76f/512bcc6b388b6990.jpg.webp",
        "https://img10.360buyimg.com/babel/jfs/t1/143484/38/21596/67218/61a7145dEc4a5dd3a/74866aca9c0c5bd9.jpg.webp",
      ],
      good_items: [
        // 为你推荐模块数据类型
        {
          img: "https://img12.360buyimg.com/babel/s320x320_jfs/t1/215990/26/13804/141295/622237f4E4dd87219/709a28ef6b74fc90.jpg!cc_320x320.webp",
          title:
            "Dickies棉服 男女同款左袖字母印花抓绒充棉棒球夹克春夏新品厚外套男DK008131 黑色 00L",
          shoplink: "https://item.jd.com/10020484775938.html",
        },
        {
          img: "https://img10.360buyimg.com/babel/s320x320_jfs/t1/219955/32/13860/163580/62229a34E389662ee/e3c0ae03429a4ef8.jpg!cc_320x320.webp",
          title:
            "A21秋冬季2021新款男装宽松圆领长袖卫衣秋季新潮街头纯色百搭多颜色套头男舒适休闲衣服情侣装上衣 黑色 175/88A/L",
          shoplink: "https://item.jd.com/10031955277654.html",
        },
        {
          img: "https://img13.360buyimg.com/babel/s320x320_jfs/t1/128296/22/24769/137582/62225985Ea048aacc/37c08152be9c16b5.jpg!cc_320x320.webp",
          title: "范思蓝恩 春秋新款纯色衬衫简约百搭收腰两穿长袖棉衬衣 白色 S",
          shoplink: "https://item.jd.com/10026434691002.html",
        },
        {
          img: "https://img14.360buyimg.com/babel/s320x320_jfs/t1/220268/13/13768/293180/622305c2E53e92815/46a7306a053e6566.jpg!cc_320x320.webp",
          title:
            "【2021秋季新款】betu百图女装经典牛仔外套女休闲复古港风百搭工装短外套2101T26 牛仔蓝 M",
          shoplink: "https://item.jd.com/10025740195951.html",
        },
        {
          img: "https://img11.360buyimg.com/babel/s320x320_jfs/t1/217561/32/13754/219052/622258f9E7b913589/d6eba6be34268d3c.jpg!cc_320x320.webp",
          title:
            "森马牛仔长裤男休闲弹力直筒裤2021新款ins潮牌男士水洗裤子 牛仔深蓝0840 31",
          shoplink: "https://item.jd.com/10030732057580.html",
        },
      ],
    };
  },
  methods: {
    carouselHeightAuto: function () {
      this.height = (this.window.width() * 664) / 1920 + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
}
header {
  height: 5rem;
  // background-color: black;
}
main {
  //   height: 100%;
  width: 100%;
  min-width: 1366px;
  // background-color: rgb(244, 244, 244);
  margin: 0.825rem auto;
}
main .main {
  width: 85%;
  margin: 0 auto;
  background-color: white;
}

/*分类导航栏和轮播图*/
.lc-floor-1 .lc-floor-nav {
  /*导航栏*/
  width: 24.5%;
  // min-width: 300px;
  height: 499px;
  float: left;
  background-color: rgba(88, 88, 88, 0.8);
  // padding: 1rem 1rem;
}
.lc-floor-1 .lc-floor-nav a,
p {
  color: white;
  margin: 0.3rem 1rem;
}
.lc-floor-1 .lc-floor-nav a:hover {
  color: red;
}
.lc-floor-1 .lc-floor-nav .nav-1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  white-space: nowrap;
  border-bottom: 1px dashed white;
  padding-bottom: 1rem;
}
.lc-floor-1 .carousel {
  width: 75%;
  // min-width: 400px;
  // height: 60vh;
  margin: 0 auto;
  float: right;
}
/*******************/
main .lc-floor {
  margin-top: 0.8rem;
}
.small img {
  height: auto;
}
/*精选大牌*/
.lc-ad-base {
  display: flex;
  justify-content: space-between;

  margin: 0 auto;
}
.lc-ad-base-item {
  width: 190px;
  text-align: center;
}
/************/
/*为你推荐*/
.lc-floor-recommend {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
}
.lc-floor-recommend-item {
  width: 190px;
  text-align: center;
}
.lc-floor-recommend-item:hover {
  transform: scale(1.05);
}
.lc-floor-recommend-item p {
  color: black;
  /*显示两行字，多余的用省略号表示*/
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/*********/
aside {
  width: auto;
  height: 3rem;
  // background-color: green;
  position: fixed;
  // z-index: 99;
  bottom: 1rem;
  right: 1rem;
}
.icon {
  width: 1.8rem;
  height: 1.8rem;
}

footer{
  width: 100%;
  min-width: 1366px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.clearfix::after,
.clearfix::before {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  *zoom: 1;
}
</style>