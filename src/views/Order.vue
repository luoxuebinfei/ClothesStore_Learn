<template>
  <div>
    <header><Header></Header></header>
    <main>
      <div class="mod-main clearfix">
        <div class="mt">
          <ul class="extra" @click="change">
            <li><a href="javascript:;" class="curr">全部订单</a></li>
            <li><a href="javascript:;">待付款</a></li>
            <li><a href="javascript:;">待收货</a></li>
            <li><a href="javascript:;">已完成</a></li>
          </ul>
        </div>
        <div class="mc">
          <div class="search">
            <el-input
              v-model="searchText"
              placeholder="商品名称/商品编号/订单号"
            ></el-input>
            <el-button>搜索</el-button>
          </div>
          <div class="td-void">
            <el-table :data="tableData" style="width: 100%" max-height="400">
              <el-table-column prop="name" label="订单信息">
                <template slot-scope="scope"
                  ><router-link
                    :to="{ name: 'shopInfo', params: { id: scope.row.id } }"
                    ><img
                      :src="scope.row.imgurl"
                      width="60"
                      height="60"
                      alt=""
                    />
                    <div>{{ scope.row.name }}</div></router-link
                  ></template
                >
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建日期"
                width="160"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="ordernum"
                label="订单号"
                align="center"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="price"
                label="金额"
                align="center"
                width="120"
                :formatter="
                  (value) => {
                    return `￥${value.price}`;
                  }
                "
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                align="center"
                width="120"
                :filters="[
                  { text: '已完成', value: '已完成' },
                  { text: '待付款', value: '待付款' },
                  { text: '待收货', value: '待收货' },
                ]"
                :filter-method="filterHandler"
              >
                <template slot-scope="scope"
                  ><p style="color: rgb(170, 170, 170)">
                    {{ scope.row.status }}
                  </p>
                  <a href="javascript:;">查看订单详情</a></template
                >
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                align="center"
                width="150"
                ><a href="javascript:;">删除</a></el-table-column
              >
            </el-table>
          </div>
          <div class="page">
            <el-pagination background layout="prev, pager, next,jumper" :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
    </main>
    <footer><Footer></Footer></footer>
  </div>
</template>

<script>
import Header from "@/components/Shop-Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      searchText:"",
      tableData: [
        {
          imgurl:
            "https://img14.360buyimg.com/n1/jfs/t1/115912/7/19734/103753/5f81a091E9e6aa2a0/2baec75362bd45a6.jpg",
          id: "1",
          name: "雅鹿 男士棉衣 2021冬季男士青年时尚简约百搭纯色宽松保暖立领棉衣 19781012 黑色 175/XL",
          date: "2022-03-17 22:53:34",
          ordernum: "240697318671",
          price: "46.82",
          status: "已完成",
        },
      ],
    };
  },
  methods: {
    //筛选状态
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //切换状态
    change(e){
      var a = e.target;
      document.querySelector(".mt .extra .curr").classList.remove("curr");
      a.className = "curr";
    }
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 1300px;
  height: 520px;
  margin: 0.8rem auto;
  // padding: 10px 0;
  border: 3px solid gray;
  border-radius: 10px;
  box-shadow: 3px 3px 3px gray;
  position: relative;
}
.mod-main {
  width: 100%;
  position: relative;
}
ul,
li {
  list-style: none;
}
/* 左侧栏 */
.mt {
  float: left;
  padding: 50px 20px;
  width: 150px;
  text-align: center;
}
.mt .extra .curr{
  color: red;
}
.mt .extra li > a {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
/* 右侧表 */
.mc {
  margin-left: 100px;
  overflow: hidden;
  position: relative;
  height: 500px;
}

/* 搜索栏 */
.mc .search {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
.mc .search .el-input {
  width: 300px;
  margin-right: 5px;
}

/* 订单信息 */
.mc .el-table .cell a img {
  // display: inline-block;
  float: left;
  margin-right: 10px;
}
.mc .el-table .cell a:hover {
  color: red;
}

/* 分页 */
.mc .page{
  position: absolute;
  bottom: 0;
  right: 5px;
}
</style>