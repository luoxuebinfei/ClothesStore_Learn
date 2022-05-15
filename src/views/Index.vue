<template>
  <!-- 商城首页 -->
  <div class="index">
    <header>
      <Header></Header>
    </header>
    <aside></aside>
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
              <el-carousel-item v-for="(item, index) of imageItems" :key="index">
                <h3 class="small">
                  <router-link :to="item.url"
                    ><img :src="item.imgurl" alt="轮播图" style="width: 100%"
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
            <div
              class="lc-ad-base-item"
              v-for="(item, index) of adImages"
              :key="index"
            >
              <router-link :to="item.url"><img :src="item.imgurl" alt="" /></router-link>
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
                v-for="(item, index) of good_items"
                :key="index"
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
import Header from "../components/Shop-Header.vue";
export default {
  name: "Index",
  components: {
    Floor,
    Header,
  },
  data() {
    return {
      imageItems: [
        
      ],
      adImages: [
        
      ],
      good_items: [
        
      ],
    };
  },
  methods: {
    carouselHeightAuto: function () {
      this.height = (this.window.width() * 664) / 1920 + "px";
    },
    getApi(){
      const _this = this;
      this.$axios.get("/").then(res=>{
        var data = res.data.data;
        _this.imageItems = JSON.parse(data.imageItems);
        _this.adImages = JSON.parse(data.adImages);
        _this.good_items = JSON.parse(data.good_items);
      })
    }
  },
  created(){
    this.getApi();
  }
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

footer {
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