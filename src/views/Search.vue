<template>
  <div>
    <header><Header></Header></header>
    <main>
      <div class="searchWrap">
        <!-- 搜索结果主体 -->
        <div class="crumbs-bar">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              this.$route.query.keyword
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container">
          <div class="selector">
            <div class="selectorLine s-brand" ref="brands">
              <div class="sl-wrap">
                <div class="sl-key">
                  <strong>品牌：</strong>
                </div>
                <div class="sl-value">
                  <ul class="sl-b-letter brandLetter" @mouseover="searchlog">
                    <li data-initial="0" class="curr">所有品牌</li>
                    <li data-initial="A">A</li>
                    <li data-initial="B">B</li>
                    <li data-initial="C">C</li>
                    <li data-initial="D">D</li>
                    <li data-initial="E">E</li>
                    <li data-initial="F">F</li>
                    <li data-initial="G">G</li>
                    <li data-initial="H">H</li>
                    <li data-initial="I">I</li>
                    <li data-initial="J">J</li>
                    <li data-initial="K">K</li>
                    <li data-initial="L">L</li>
                    <li data-initial="M">M</li>
                    <li data-initial="N">N</li>
                    <li data-initial="O">O</li>
                    <li data-initial="P">P</li>
                    <li data-initial="Q">Q</li>
                    <li data-initial="S">S</li>
                    <li data-initial="T">T</li>
                    <li data-initial="U">U</li>
                    <li data-initial="V">V</li>
                    <li data-initial="W">W</li>
                    <li data-initial="X">X</li>
                    <li data-initial="Y">Y</li>
                    <li data-initial="Z">Z</li>
                  </ul>
                  <div class="sl-vlist">
                    <ul class="valueList">
                      <li v-for="i of brands" :key="i[1]" :data-initial="i[0]">
                        <a href="javascript:;" @click="clickbrand(i[1])">{{
                          i[1]
                        }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="sl-ext">
                  <a class="sl-e-more" href="javascript:;" @click="more"
                    >更多</a
                  >
                </div>
              </div>
            </div>
            <div class="selectorLine s-line" ref="size">
              <div class="sl-wrap">
                <div class="sl-key"><strong>尺码：</strong></div>
                <div class="sl-value">
                  <div class="sl-vlist">
                    <ul class="valueList">
                      <li v-for="i of size" :key="i">
                        <a href="javascript:;" @click="clicksize(i)">{{ i }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="sl-ext">
                  <a class="sl-e-more" href="javascript:;" @click="more"
                    >更多</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="g-main2 clearfix">
            <div class="m-list">
              <div class="ml-wrap">
                <div class="goods-list">
                  <ul class="gl-warp">
                    <li
                      class="gl-item"
                      v-for="i of shopList"
                      :key="i.sku"
                      :data-sku="i.sku"
                    >
                      <div class="gl-i-wrap">
                        <div class="p-img">
                          <router-link
                            :to="{ name: 'shopInfo', params: { id: i.sku } }"
                            ><img
                              v-lazy="i.imgurl"
                              :alt="i.name"
                              width="220"
                              height="220"
                          /></router-link>
                        </div>
                        <div class="p-price">
                          <strong
                            ><em>￥</em
                            ><i :data-price="i.sku">{{ i.price }}</i></strong
                          >
                        </div>
                        <div class="p-name">
                          <router-link
                            :to="{ name: 'shopInfo', params: { id: i.sku } }"
                            :alt="i.name"
                            :title="i.name"
                            >{{ i.name }}</router-link
                          >
                        </div>
                        <div class="p-shop">
                          <router-link
                            :to="{ name: 'mall', params: { id: i.sku } }"
                            >{{ i.shop }}</router-link
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="page clearfix">
            <el-pagination
              background
              layout="prev, pager, next,jumper"
              v-if="total>0"
              :page-size="20"
              :current-page="curr_page"
              @current-change="clickpage"
              :total="total"
            >
            </el-pagination>
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
      brands: [
        ["B", "波司登"],
        ["Y", "雅鹿"],
        ["Y", "鸭鸭"],
        ["X", "雪中飞"],
        ["Q", "七匹狼"],
        ["L", "罗蒙"],
        ["J", "杰克琼斯"],
        ["H", "花花公子"],
        ["P", "皮尔卡丹"],
        ["J", "吉普"],
        ["N", "南极人"],
        ["H", "海澜之家"],
        ["H", "恒源祥"],
        ["T", "太平鸟"],
        ["Z", "啄木鸟"],
      ],
      size: [
        90,
        110,
        125,
        140,
        155,
        160,
        165,
        170,
        175,
        180,
        185,
        190,
        195,
        200,
        205,
        210,
        "XS",
        "S",
        "L",
        "XL",
        "XXL",
      ],
      isShowMoreBtn: "visible",
      shopList: [
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/147636/2/22921/174848/62200fe3E40791b9a/ea371c7c6ab9faef.jpg",
          price: "609.00",
          name: "鸭鸭羽绒服男短款2021冬季新款鸭绒连帽冬季韩版时尚加厚商务休闲保暖外套Y 黑色-DYG07B0250 175/92A",
          shop: "鸭鸭女装官方旗舰店",
          sku: "72478693023",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/154357/21/1530/179016/5f7c83e6E7aadd732/9600a875315f6bd8.png",
          price: "258.00",
          name: "南极人 羽绒服男2021工装羽绒服男士大口袋中长款新款冬季外套潮保暖男装 059 黑色 L(120斤-140斤）",
          shop: "南极人迪卡专卖店",
          sku: "10022594415241",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/99804/27/22482/159626/62145549Eb77ac9e4/5c3840707f1c778d.jpg",
          price: "918.00",
          name: "鸭鸭（YAYA）冬季羽绒服男短款2021冬季鸭绒连帽韩版时尚商务休闲保暖外套YGF DYG07B0250黑色 175/92A",
          shop: "鸭鸭官方旗舰店",
          sku: "10021554447365",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/212492/4/9127/160121/61c78bf9E706e8785/399e3708068c2aa6.jpg",
          price: "198.00",
          name: "绅范 羽绒服男士羽绒服潮牌2021年新款韩版修身短款轻薄秋冬季品牌加厚男生外套 Y11卡其 2XL 建议穿120-140斤",
          shop: "绅范官方旗舰店",
          sku: "10037200783494",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/213608/7/12620/200538/620b6b4eE34eaf9c7/3c5908318efa8eb9.jpg",
          price: "398.00",
          name: "鸭鸭（YAYA）羽绒服男士轻薄短款修身时尚连帽保暖外套简约潮dGF 蓝灰色连帽 175/L",
          shop: "鸭鸭官方旗舰店",
          sku: "10020943604911",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/173680/3/27486/740586/620cdcbdE2a6e0586/13b29fd66ca82eb8.png",
          price: "288.00",
          name: "海澜优选 海澜之家旗下品牌羽绒服男冬季新款国潮男装联名短款轻薄款冬装透气舒适衣服男学生春秋夹克 黑色8935 4XL",
          shop: "海澜优选极澜专卖店",
          sku: "10040536287266",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/191819/29/21731/105544/622ead37Ed248abd4/db2ded5e2906f784.jpg",
          price: "985.00",
          name: "波司登冬季男士羽绒服短款保暖百搭经典版型可脱卸帽保暖防风宽松时尚纯色90绒外套男B00145935 黑色8056 175/92A",
          shop: "波司登京东官方旗舰店",
          sku: "10035016241173",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/209823/6/8690/307215/6189de96E29ab8caa/e28a2833555b00a6.png",
          price: "388.00",
          name: "花花公子国潮男装联名羽绒服男士立领白鸭绒冬季新款休闲学生青年舒适防风男装外套男简约上衣男 Y115黑色（立领款） XL（建议110-130斤）",
          shop: "花花公子连普专卖店",
          sku: "10038086439229",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/136198/35/21149/301468/61f114baE6870b7f5/c120e02fe0819b81.jpg",
          price: "449.00",
          name: "京东京造 90白鸭绒短款轻薄羽绒服男士外套男冬季 连帽红色 S",
          shop: "京东京造官方自营旗舰店",
          sku: "100025204990",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/211840/24/12836/580712/6210ac29Eb93a9975/b146f9a20f731853.png",
          price: "298.00",
          name: "海澜优选 海澜之家旗下品牌羽绒服男士春秋季新款国潮男装联名外套短款青少年学生透气工装上衣服派克服 YYS-1301绿色 XL（建议115-130斤）",
          shop: "海澜优选伊影专卖店",
          sku: "10042012917026",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/85506/35/19864/372157/61ed1008E6b931107/87573225b7d3b1d7.png",
          price: "269.00",
          name: "JEEP吉普羽绒服男短款加厚冬季外套男士袄子新款工装保暖中青年学生防寒服上衣工作服订制印LOGO B705-1583黑色 XL（推荐125斤-140斤）",
          shop: "吉普昆谷专卖店",
          sku: "63988812632",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/140579/9/19589/132156/5fe21b52Efea52771/662e4b7ecfbaa95a.jpg",
          price: "268.00",
          name: "仕季羽绒服男士外套秋冬新款加厚韩版潮流短款帅气潮牌青年学生休闲时尚百搭保暖衣服男装上衣 黑色 XL",
          shop: "仕季旗舰店",
          sku: "10022598613959",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/89223/40/19349/87066/613c1082E5e365c3c/12c88c04b2524c3d.jpg",
          price: "198.00",
          name: "啄木鸟 轻薄羽绒服男款时尚韩版简约百搭长袖连帽白鸭绒抗寒保暖防风短款羽绒服外套男士青年冬季新款上衣服 XG22黑色 L",
          shop: "啄木鸟柚子专卖店",
          sku: "10036795141277",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/111988/1/20311/146594/62200fd9E2164929c/ceee1d881685318d.jpg",
          price: "909.00",
          name: "鸭鸭羽绒服男中长款2021年冬季新款韩版加厚宽松极寒保暖过膝外套Y 黑色-DYG07B0150 175/L",
          shop: "鸭鸭女装官方旗舰店",
          sku: "10022677438298",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/164378/34/28142/221082/62200fedE1486a92c/33a348e0756b0473.jpg",
          price: "709.00",
          name: "鸭鸭反季2021冬季新款保暖鸭绒羽绒服男短款冬装品牌休闲外套潮G 雪山渐变色-DYM00B0180 180",
          shop: "鸭鸭女装官方旗舰店",
          sku: "10033698224527",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/117848/37/27211/389583/61f115acE9e27b1e7/cd8d2e794e1a698b.jpg",
          price: "299.00",
          name: "京东京造 【精选90白鹅绒】短款轻薄羽绒服男士外套男冬装冬季外套 立领黑色 XXL",
          shop: "京东京造官方自营旗舰店",
          sku: "100000166328",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/217879/12/12594/175366/620b7185E070a8948/57ca3f49eedbc57f.jpg",
          price: "658.00",
          name: "雅鹿冬季大鹅羽绒服男连帽鹅绒保暖韩版纯色短款防寒冬装外套D 黑色(男) 175(男款）",
          shop: "yaloo雅鹿官方旗舰店",
          sku: "60124417900",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/217058/14/14595/166102/622c8a83Ee446c66a/4dfe3cc0596cebb7.jpg",
          price: "599.00",
          name: "雪中飞连帽男士短款羽绒服外套2021年冬季新品男时尚休闲简约纯色中青年百搭 黑色 2XL 185",
          shop: "雪中飞邦发专卖店",
          sku: "10028494077995",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/173104/2/27973/126108/616f8cbaEadeb6f47/f377d4fd639c7814.jpg",
          price: "239.00",
          name: "花花公子羽绒服男情侣款2021秋冬季新款潮牌男士外套短款白鸭绒青少年亮面羽绒百搭男装 JSWZ-2219白色 L",
          shop: "花花公子精久专卖店",
          sku: "10038123463818",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/206287/14/10588/182788/6162aeebEa4bd38e1/cbcbf1935ca66df3.jpg",
          price: "298.00",
          name: "南极人羽绒服男中长款冬季连帽男士袄子加厚保暖外套休闲潮流外衣上衣青少年冬天男装 YR886黑色 XL",
          shop: "南极人川峰专卖店",
          sku: "10024673405846",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/86754/4/20134/87292/620a3445Ed9a71214/5e7f6a73ed531bfa.jpg",
          price: "328.00",
          name: "花花公子羽绒服男士短款韩版修身潮流连帽外套男2021秋冬季新款加厚保暖上衣男装 LWKS-1221白色 XL/175",
          shop: "花花公子逐兔专卖店",
          sku: "10035800052052",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/98234/15/22218/229044/62175c8fEceb8ab04/568326e95f0d6a78.jpg",
          price: "899.00",
          name: "ANDSEEYOU 潮牌男士羽绒服 冬季新款商务休闲羽绒服男潮流时尚外套男帅气精品潮流男装联名正 973款绿色 M",
          shop: "ANDSEEYOU官方旗舰店",
          sku: "10038407960250",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/131939/19/25578/132694/6227280fEd3245353/5c7981b5a577d947.jpg",
          price: "1049.00",
          name: "京东超市\n波司登2021年秋冬羽绒服男常规款经典休闲系列90绒外套B10145121 黑黛青5177 180/96A",
          shop: "波司登京东自营旗舰店",
          sku: "100014707215",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/200835/27/6899/224176/613ee8c7Eeca02bee/806cead9c424cb24.jpg",
          price: "1099.00",
          name: "波司登冬季男士羽绒服中长款男加厚时尚可脱卸帽保暖防风外套男B00143041V 铝色8212 170/88A ",
          shop: "波司登京东自营旗舰店",
          sku: "100014349701",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/134761/10/22758/159452/623298abE7bedfe37/6f02df5474ee4d67.jpg",
          price: "489.00",
          name: "雪中飞男士羽绒服亮面中长款外套冬季新款防寒加厚时尚商务外套男X001410623F20981 黑色 180（建议141-160斤）",
          shop: "雪中飞羽绒服旗舰店",
          sku: "10022674882814",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/96395/31/22502/176971/622011cbEe36e95a4/793ad1fe0e0d6403.jpg",
          price: "239.00",
          name: "雅鹿轻薄羽绒服男短款2021新款韩版连帽轻便薄款秋冬保暖外套潮Y Y7007A20740灰蓝 185",
          shop: "雅鹿棉服旗舰店",
          sku: "10022870681654",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/210706/38/16982/89412/6201cc48E0646e1d2/cfc6f6ead64a2959.jpg",
          price: "1888.00",
          name: "MAFEISHIFIGURE轻奢品牌大毛领羽绒服潮鹅派克服羽绒服加厚冬季新款潮牌工装 米白色（男款） S / 165",
          shop: "MAFEISHIFIGURE旗舰店",
          sku: "10044056006649",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/210971/32/17126/92396/6208a2c6E3ae2e9d3/2274eb405c991ab8.jpg",
          price: "89.00",
          name: "皮尔卡丹【特价捡漏】立领保暖男士外套冬季2021新款休闲青年学生保暖加厚羽绒服 黑色连帽 933款 2XL(145-155斤)",
          shop: "汉美公关服饰专营店",
          sku: "10038584545817",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/103092/29/190/63484/5da94c20E4ed7bd5e/0bc71460f9dae342.jpg",
          price: "449.00",
          name: "无印良品 MUJI 男式 羽绒 不易沾水风帽夹克 外套 海军蓝 L",
          shop: "无印良品MUJI官方旗舰店",
          sku: "59440866702",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/94787/35/24419/182725/62329955E287d71c6/388675618447e015.jpg",
          price: "169.00",
          name: "雪中飞轻薄羽绒服男士秋冬季新款立领外套男士薄款休闲纯色上衣潮22002 黑色 185",
          shop: "雪中飞羽绒服旗舰店",
          sku: "10034092238784",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/210227/25/17797/299622/621755c2E6c961239/a64a1386f9021521.jpg",
          price: "989.00",
          name: "ANDSEEYOU 潮牌男士羽绒服 冬季新款潮流时尚英伦风工装商务休闲外套青年羽绒衣精品国潮男装联名 873款白色 XL",
          shop: "ANDSEEYOU官方旗舰店",
          sku: "10040483702853",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/122500/36/23707/204876/6230b514E0c7a30cb/af61f05351377246.jpg",
          price: "349.00",
          name: "波司登春秋新款短款轻薄羽绒服男时尚休闲立领专业轻便显瘦舒适90绒纯色外套男B10131005 黑色8056 180/96A",
          shop: "波司登官方旗舰店",
          sku: "10028504198830",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/136858/40/22978/111660/623039deEea2d5ec4/dea282c98b379faf.jpg",
          price: "318.00",
          name: "雪中飞2021秋冬新款男士轻薄羽绒服休闲短款鸭绒情侣款保暖外套羽绒服男 新黑色 175",
          shop: "雪中飞官方旗舰店",
          sku: "10027608881440",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/86516/3/22822/137011/622f0914E2ef13f08/c4900bd90e6e8c59.jpg",
          price: "358.00",
          name: "雪中飞2021男式羽绒服春秋轻薄款羽绒男士连帽运动休闲短款秋季羽绒服潮外套 新黑色 175/92A",
          shop: "雪中飞官方旗舰店",
          sku: "10033845892679",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/210911/17/19544/104493/622eaa5fE02b38275/a70544c50730dad1.jpg",
          price: "985.00",
          name: "波司登新款男士羽绒服短款保暖百搭可脱卸帽90绒防风宽松时尚男B00145935\\/B10145111 黑色8056 175/92A",
          shop: "波司登官方旗舰店",
          sku: "10028559579824",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/104200/18/20411/115898/61c83334E24e2eda1/e2500e9c43b20ac6.jpg",
          price: "128.00",
          name: "天涧 羽绒服男冬季服男白鸭绒加厚保暖宽松连帽外套男2021新款潮港风面包服 黑色（字母款） M",
          shop: "天涧官方旗舰店",
          sku: "10040500497356",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/93038/15/24341/130209/62272e6bE533d7f9f/130fcde02f212745.jpg",
          price: "449.00",
          name: "京东超市\n波司登2021年秋季轻薄羽绒服男轻便纯色拉链连帽B10131007 黑藏蓝5237 185/100A",
          shop: "波司登京东自营旗舰店",
          sku: "100013307827",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/210846/40/19247/164123/62283702E54619e1c/5d11ef811d220b36.jpg",
          price: "269.00",
          name: "花花公子羽绒服男亮面冬季厚款连帽防寒白鸭绒外套男休闲百搭保暖冬装上衣 黑色 XL",
          shop: "花花公子锦竹专卖店",
          sku: "10037594819545",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/169377/25/23211/129849/61880c4aEba5e36e8/6fa2e1fbfd37b812.jpg",
          price: "138.00",
          name: "普洛塞 冬季羽绒服男加厚棉连帽学生工装外套中长款潮流宽松外套韩版面包服保暖情侣装 黑色 M",
          shop: "普洛塞官方旗舰店",
          sku: "10037182885798",
        },
        {
          imgurl:
            "https://img11.360buyimg.com/n7/jfs/t1/126772/10/25365/117731/6230b567Eb97f68d9/8e1182971bd7d7db.jpg",
          price: "449.00",
          name: "波司登春秋新款轻薄羽绒服男轻时尚纯色显瘦舒适拉链连帽90绒百搭轻柔短款外套男B10131007 黑色8056 185/100A",
          shop: "波司登官方旗舰店",
          sku: "10028506110816",
        },
        {
          imgurl:
            "https://img12.360buyimg.com/n7/jfs/t1/145632/17/22488/178475/6208a2c7Ed7f278a4/e05599d89dc832b9.jpg",
          price: "119.00",
          name: "皮尔卡丹【特价捡漏】2021冬季新款爸爸冬装外套中年男士羽绒服加绒加厚款中老年 黑色加绒款加棉袜 XXXL建议体重140-160斤",
          shop: "汉美公关服饰专营店",
          sku: "10038584529562",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/99479/20/24352/125420/622eaad4E53098492/5f40e1c5894452ee.jpg",
          price: "999.00",
          name: "【店长推荐】波司登冬季新款男士羽绒服一手长保暖百搭可脱卸帽保暖90绒防风宽松外套B10145111 黑色8056 170/88A",
          shop: "波司登官方旗舰店",
          sku: "10037059590024",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/100205/5/25084/197143/623298c1E8e69c79e/0fd981ec585f2f6a.jpg",
          price: "429.00",
          name: "雪中飞羽绒服男士冬季短款休闲新款潮流防寒亮面加厚外套男X00149533F20825 20825黑色 185（建议161-180斤）",
          shop: "雪中飞羽绒服旗舰店",
          sku: "10020528793419",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/103895/39/24348/93440/62303b20E9e859284/6959a2acc42311c3.jpg",
          price: "598.00",
          name: "【90鹅绒】雪中飞2021秋冬新款男女同款休闲连帽舒服保暖鹅绒款羽绒服 黑色男 185",
          shop: "雪中飞官方旗舰店",
          sku: "70323759295",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/92645/6/23893/178131/62287b50E4f2d5461/be4c467603167887.jpg",
          price: "758.00",
          name: "雅鹿男士羽绒服中长款厚款连帽极寒保暖2021冬季新款时尚貉子毛领外套男 1410黑色 180",
          shop: "雅鹿官方旗舰店",
          sku: "55367089630",
        },
        {
          imgurl:
            "https://img10.360buyimg.com/n7/jfs/t1/130027/7/23884/179408/6232994cE8fffae61/061604edaa8e9125.jpg",
          price: "179.00",
          name: "雪中飞轻薄羽绒服男秋冬季新款连帽上衣男士短款休闲保暖外套潮22001 黑色 180",
          shop: "雪中飞羽绒服旗舰店",
          sku: "10034087091240",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/131428/6/17002/165980/5fba81adE9eb4af3e/a96b0bbb591c28af.jpg",
          price: "268.00",
          name: "【正常发货】南极人羽绒服男冬季新款中长款加厚修身中青年连帽韩版潮牌男装外套大衣服 黑色 L（125-140斤）",
          shop: "南极人男装旗舰店",
          sku: "62819665234",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/141572/5/24481/103745/61c697e9Ed2afab39/708dfa9c526a5121.jpg",
          price: "3688.00",
          name: "VANENKSVR（梵恩萨）轻奢品牌羽绒服男 2021秋冬新款潮流中老年爸爸加厚保暖羊羔毛领男士外套 黑色. 175 .",
          shop: "梵恩萨男装旗舰店",
          sku: "10042740174698",
        },
        {
          imgurl:
            "https://img13.360buyimg.com/n7/jfs/t1/149789/7/23967/159715/62330d4aE783ccc87/5ef081c3c9e6528d.jpg",
          price: "150.00",
          name: "Baleno班尼路 时尚轻薄羽绒服男 潮流纯色短款男士外套无缝连帽超轻羽绒外套 25G L",
          shop: "班尼路官方旗舰店",
          sku: "10040217249638",
        },
        {
          imgurl:
            "https://img14.360buyimg.com/n7/jfs/t1/214601/29/12449/273915/620b6b58E38057b43/bec93b855e3555bc.jpg",
          price: "918.00",
          name: "【李易峰同款】鸭鸭羽绒服男2021年新款连帽加厚保暖休闲短款时尚帅气冬季外套HPGF 卡其色 M",
          shop: "鸭鸭官方旗舰店",
          sku: "10039680662734",
        },
      ],
      url: window.location.href,
      curr_page:1,
      total:200,
    };
  },
  methods: {
    searchlog(e) {
      var a = e.target;
      if (a.localName != "ul") {
        document.querySelector(".sl-b-letter .curr").classList.remove("curr");
        a.className = "curr";
        var b = a.getAttribute("data-initial");
        // console.log(b);
        var c = document.querySelectorAll(".sl-vlist .valueList>li");
        c.forEach((res) => {
          // console.log(b, res.getAttribute("data-initial"));
          if (b == "0" || res.getAttribute("data-initial") == b) {
            res.style.display = "block";
          } else {
            res.style.display = "none";
          }
        });
      }
    },
    //更多按钮 点击事件
    more(e) {
      var a = e.target;
      var b = a.parentNode.previousSibling;
      //判断点击的是否是品牌框中的更多按钮，决定是否显示字母条
      var c = b.parentNode.parentNode.className.indexOf("s-brand");
      //展开框
      var vl = b.querySelector("ul.valueList");
      //字母框是否隐藏
      var zmk = document.querySelector(".sl-value .sl-b-letter");
      if (a.innerText == "更多") {
        //展开样式修改
        a.innerText = "收起";

        if (c != -1) {
          vl.style.height = "150px";
          zmk.style.display = "block";
        } else {
          vl.style.height = "60px";
        }
        vl.style["overflow-x"] = "hidden";
        vl.style["overflow-y"] = "auto";
      } else {
        a.innerText = "更多";
        vl.style.height = "";
        zmk.style.display = "";
        vl.style["overflow-x"] = "";
        vl.style["overflow-y"] = "";
        //收起时将选中调整为全部商品
        document.querySelector(".sl-b-letter .curr").classList.remove("curr");
        document.querySelector(
          ".sl-b-letter.brandLetter"
        ).firstChild.className = "curr";
        document.querySelectorAll(".sl-vlist .valueList li").forEach((res) => {
          res.style.display = "block";
        });
      }
      // this.$nextTick(() => {
      //   console.log(this.$refs.brand);
      // });
      // var c = this.$refs.brand;
      // console.log(c.scrollHeight);
      // console.log(c.clientHeight);

      console.log(this.$refs.keys);

      // for (let i of c){
      //   console.log(i.scrollHeight);
      // }
    },
    //是否展示更多按钮
    showMoreBtn() {
      //实际高度
      // console.log(this.$refs.brand.scrollHeight);
      //可视高度
      // console.log(this.$refs.brand.clientHeight);
      for (let index in this.$refs) {
        var list = this.$refs[index].querySelector(".sl-vlist .valueList");
        var btn = this.$refs[index].querySelector(".sl-ext .sl-e-more");
        btn.style.visibility =
          list.scrollHeight <= list.clientHeight ? "hidden" : "visible";
      }
    },
    getSearchApi() {
      const url = location.search.substring(1);
      let r = /keyword=(.*)&?/gi;
      let keyword = r.exec(url)[1];
      const _this = this;
      axios.get(`/search?keyword=${keyword}`).then((res) => {
        let data = res.data.data;
        _this.brands = data.brands;
        _this.size = data.size;
        _this.shopList = data.goods_list;
      });
    },
    //点击品牌
    clickbrand(value) {
      var url = location.search.substring(1);
      let r = /.*?&brand=(.*)&?/gi;
      // let old = r.exec(url)[1]
      if (r.test(url)) {
        let r = /.*?&brand=(.*)&?/gi;
        window.location.href = "/search?" + url.replace(r.exec(url)[1], value);
      } else {
        window.location.href = "/search?" + url + "&brand=" + value;
      }
    },
    //点击尺码
    clicksize(value) {
      var url = location.search.substring(1);
      let r = /.*?&size=(.*)&?/gi;
      // let old = r.exec(url)[1]
      if (r.test(url)) {
        let r = /.*?&size=(.*)&?/gi;
        window.location.href = "/search?" + url.replace(r.exec(url)[1], value);
      } else {
        window.location.href = "/search?" + url + "&size=" + value;
      }
    },
    currentPage(){
      console.log(1111)
    },
    //点击页码切换
    clickpage(){
      console.log(this.curr_page)
    }
  },
  mounted() {
    this.showMoreBtn();
    const _this = this;
    this.$nextTick(() => {
      _this.getSearchApi();
    });
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0.8rem auto;
  width: 1228.8px;
}
em,
i {
  font-style: normal;
}
.crumbs-bar {
  margin-top: 1.5rem;
}
.container {
  margin-top: 1.5rem;
  font-size: 12px;
}
.selector {
  position: relative;
}
.selector .s-brand,
.selector .s-line {
  width: auto;
  height: auto;
}
.selector .sl-wrap {
  border-bottom: 1px solid #ddd;
  background: #f3f3f3;
  line-height: 34px;
  position: relative;
}
.selector .sl-vlist {
  padding-top: 4px;
}
.selectorLine .sl-key {
  float: left;
  width: 100px;
  overflow: hidden;
  padding-left: 10px;
  white-space: nowrap;
}
.sl-wrap .sl-value {
  overflow: hidden;
  padding-left: 10px;
  zoom: 1;
  margin-left: 110px;
  background: #fff;
  padding-right: 130px;
}

/* 首字母条 */
.sl-value .sl-b-letter {
  display: none;
}
.sl-value .sl-b-letter > li {
  list-style: none;
  float: left;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 8px;
  border: 1px solid #fff;
  cursor: default;
  color: #005aa0;
  // font-size: 16px;
}
.sl-value .sl-b-letter .curr,
.sl-b-letter li:hover {
  color: red;
  border: 1px solid red;
}
.selector .sl-b-letter {
  overflow: hidden;
  margin-bottom: 10px;
}
.s-brand .sl-vlist .valueList {
  height: 60px;
}
.valueList {
  height: 30px;
  overflow: hidden;
  *zoom: 1;
}
ul.valueList > li {
  float: left;
  margin-right: 5px;
  overflow: hidden;
  color: #005aa0;
  font-size: 12px;
  display: block;
}
.s-brand .valueList > li {
  width: 130px;
  font-size: 12px;
  height: 26px;
  margin-bottom: 4px;
}
/* 尺码 */
.s-line .valueList > li {
  margin-right: 40px;
  margin-bottom: 4px;
  height: 26px;
  line-height: 26px;
}

/* 控件框 */
.selector .sl-ext {
  position: absolute;
  top: 5px;
  right: 10px;
  width: 110px;
  height: auto;
  line-height: 22px;
  overflow: hidden;
  *zoom: 1;
}
.sl-ext a {
  float: left;
  margin-left: 10px;
  position: relative;

  height: 23px;
  line-height: 23px;

  background: #fff;
  color: #333;
  border: 1px solid #ddd;
}
.sl-ext .sl-e-more {
  width: 39px;
  padding: 0 7px 0 4px;
}
.sl-ext .sl-e-multiple {
  padding: 0 3px 0 18px;
}

/* 商品列表主体 */
.g-main2 {
  margin-bottom: 10px;
}
.g-main2 .m-list {
  width: 100%;
}
.g-main2 .m-list .ml-wrap {
  position: relative;
  margin: 10px auto;
}
.goods-list .gl-warp {
  height: auto;
}
.goods-list .gl-item {
  float: left;
  width: 240px;
  position: relative;
  margin-top: 10px;
  height: 366px;
  margin-right: 5px;
}
.goods-list .gl-item .p-img {
  margin-bottom: 5px;
}
.goods-list .gl-item .p-price {
  position: relative;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  width: 100%;
  margin: 0 0 8px;
}
.goods-list .gl-item .p-price strong {
  float: left;
  margin-right: 10px;
  color: #e4393c;
  font-size: 20px;
  font-weight: 400;
}
/* 链接变色 */
.goods-list .gl-item .p-name a:hover {
  color: red;
}
.goods-list .gl-item .p-name em {
  display: inline;
  height: auto;
  // float: left;
}
.goods-list .gl-item .p-shop {
  margin-top: 10px;
  line-height: 18px;
  height: 18px;
  overflow: hidden;
  color: #999;
}
/* 分页 */
.page {
  margin-bottom: 50px;
}
.page .el-pagination {
  float: right;
}
</style>