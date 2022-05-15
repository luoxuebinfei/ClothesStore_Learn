<template>
  <div class="relative">
    <header><Header></Header></header>
    <main>
      <div class="mod-main clearfix">
        <div class="mt">
          <ul class="extra" @click="change">
            <li><a href="javascript:;" class="curr" id="All">全部订单</a></li>
            <li><a href="javascript:;" id="2">待付款</a></li>
            <li><a href="javascript:;" id="3">待收货</a></li>
            <li><a href="javascript:;" id="1">已完成</a></li>
          </ul>
        </div>
        <div class="mc">
          <div class="search">
            <el-input
              v-model="searchText"
              placeholder="商品名称/订单号"
            ></el-input>
            <el-button @click="search">搜索</el-button>
          </div>
          <div class="td-void">
            <el-table :data="tableData" style="width: 100%" max-height="400">
              <el-table-column prop="name" label="订单信息">
                <template slot-scope="scope"
                  ><div
                    v-for="(i, index) in scope.row.id"
                    :key="i"
                    class="clearfix info"
                  >
                    <router-link
                      :to="{
                        name: 'shopInfo',
                        params: { id: scope.row.id[index] },
                      }"
                      ><img
                        :src="scope.row.imgurls[index]"
                        width="60"
                        height="60"
                        alt=""
                      />
                      <div>{{ scope.row.name[index] }}</div></router-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建日期"
                width="160"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="order_sn"
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
                  { text: '待发货', value: '待发货' },
                  { text: '待收货', value: '待收货' },
                ]"
                :filter-method="filterHandler"
              >
                <template slot-scope="scope"
                  ><div>
                    <el-tag type="success" v-if="scope.row.status == '已完成'">
                      已完成</el-tag
                    >
                    <el-tag
                      type="warning"
                      v-else-if="scope.row.status == '未付款'"
                    >
                      未付款</el-tag
                    >
                    <el-tag
                      type="info"
                      v-else-if="scope.row.status == '待发货'"
                    >
                      待发货</el-tag
                    >
                    <el-tag v-else-if="scope.row.status == '已发货'">
                      已发货</el-tag
                    >
                    <el-tag
                      type="info"
                      v-else-if="scope.row.status == '已取消'"
                    >
                      已取消</el-tag
                    >
                  </div>
                  <a href="javascript:;" @click="lookinfo(scope.row)"
                    >查看订单详情</a
                  ></template
                >
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <div class="cz">
                    <a href="javascript:;" @click="getPay(scope.row)" v-if="scope.row.status=='未付款'" style="margin-right: 5px;"
                      >去付款</a
                    >
                    <a href="javascript:;" @click="deleteOrder(scope.row)"
                      >删除</a
                    >
                  </div>
                </template></el-table-column
              >
            </el-table>
          </div>
          <!-- 页码部分 -->
          <!-- <div class="page">
            <el-pagination
              background
              layout="prev, pager, next,jumper"
              :total="1000"
            >
            </el-pagination>
          </div> -->
          <!--  -->
        </div>
      </div>
    </main>
    <div class="details" @click="closeinfo">
      <!-- 订单详细信息 -->
      <div class="info-box">
        <div class="box-1">
          <ul>
            <li
              v-for="(i, index) in checkData.id"
              :key="i"
              class="mb-2 grid grid-cols-8"
            >
              <router-link
                :to="{ name: 'shopInfo', params: { id: i } }"
                class="col-span-6 clearfix"
                ><img
                  :src="checkData.imgurls[index]"
                  alt=""
                  width="60"
                  height="60"
                  class="float-left mr-3"
                /><span class="float-left truncate">{{
                  checkData.name[index]
                }}</span></router-link
              >
              <span class="text-center"
                >￥{{ checkData.unitprice[index] }}</span
              >
              <span class="text-center">x{{ checkData.shopnums[index] }}</span>
            </li>
          </ul>
        </div>
        <div class="box-2">
          <div class="left">
            <!-- 物流信息 -->
          </div>
          <div class="right">
            <div class="address-info">
              <ul>
                <li>收货人：{{ checkData.address.name }}</li>
                <li>地址：{{ checkData.address.info }}</li>
                <li>电话：{{ checkData.address.phone }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      searchText: "",
      tableData: [],
      checkData: { address: { name: "", phone: "", info: "" } },
    };
  },
  methods: {
    //筛选状态
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //切换状态
    change(e) {
      var a = e.target;
      document.querySelector(".mt .extra .curr").classList.remove("curr");
      a.className = "curr";
      var state = { title: "", url: window.location.href };
      if (a.id == "All") {
        history.pushState(state, "", "order?code=All");
      } else if (a.id == "2") {
        history.pushState(state, "", "order?code=2");
      } else if (a.id == "3") {
        history.pushState(state, "", "order?code=3");
      } else if (a.id == "1") {
        history.pushState(state, "", "order?code=1");
      }
      this.getAllOrder();
    },
    //api获取全部订单
    getAllOrder() {
      const _this = this;
      var url = window.location.search;
      var code;
      var re = /code=(\d)/;
      var list = url.match(re);
      if (list != null) {
        code = list[1];
      } else {
        code = "All";
        var state = { title: "", url: window.location.href };
        history.pushState(state, "", "order");
      }
      this.$axios.get(`/get_all_order?code=${code}`).then((res) => {
        _this.tableData = res.data.data;
      });
    },
    //搜索
    search() {
      var s = this.searchText;
      this.$axios.get(`/query_order?search=${s}`).then(() => {});
    },
    //点击订单详情
    lookinfo(row) {
      this.checkData = row;
      document.querySelector(".details").style.display = "block";
    },
    //关闭订单详情
    closeinfo(e) {
      var a = e.target;
      if (a.className != "info-box") {
        document.querySelector(".details").style.display = "none";
      }
    },
    // 删除订单
    deleteOrder(row) {
      const _this = this;
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.$axios
            .get(`/delete_order?orderSn=${row.order_sn}`)
            .then((res) => {
              var msg = res.data.msg;
              _this.$message({
                message: msg,
                type: "success",
              });
              _this.getAllOrder();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 去付款
    getPay(row){
      const _this = this;
      this.$axios.get(`/pay?orderSn=${row.order_sn}`).then(res=>{
        var data = res.data.data;
        window.open(data,'_self');
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.getAllOrder();
    });
    this.$nextTick(() => {
      var url = window.location.search;
      var code;
      var re = /code=(\d)/;
      var list = url.match(re);
      if (list != null) {
        code = list[1];
      } else {
        code = "All";
        var state = { title: "", url: window.location.href };
        history.pushState(state, "", "order");
      }
      document.querySelector(".mt .extra .curr").classList.remove("curr");
      document.querySelector(`.mt .extra [id="${code}"]`).className = "curr";
    });
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
.mt .extra .curr {
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
.mc .el-table .cell .info:nth-child(n + 2) {
  margin-top: 0.3rem;
}

/* 分页 */
.mc .page {
  position: absolute;
  bottom: 0;
  right: 5px;
}

/* 订单详细信息 */
.details {
  z-index: 9999;
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.5);
}
.details .info-box {
  width: 1000px;
  height: 500px;
  background: rgb(255, 255, 255);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  border-radius: 10px;
}
.details .info-box .box-1 > ul > li {
  position: relative;
}
.details .info-box .box-2 .right .address-info {
  text-align: right;
  display: grid;
}

/*操作列样式*/
// .cz a{
//   margin-right: 5px;
// }
</style>