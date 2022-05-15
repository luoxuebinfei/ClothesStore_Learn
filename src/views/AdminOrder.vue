<template>
  <div style="overflow: hidden;">
    <header><AdminHeader></AdminHeader></header>
    <aside><Sidebar></Sidebar></aside>
    <main>
      <div class="search">
        <!-- 搜索与添加区域 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              v-model="queryIofo.query"
              clearable
              @clear="getOrderList()"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getOrderList()"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="a-table">
        <!-- 商品列表区域 -->
        <!-- 表格区域 -->
        <el-table :data="orderList" border stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.children"
                style="width: 90%; padding-left: 10px"
              >
                <el-table-column
                  prop="skuID"
                  label="商品ID"
                  width="100"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="title"
                  label="商品标题"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="price"
                  label="商品单价"
                  width="100"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="skuID"
                  label="商品数量"
                  width="100"
                  align="center"
                ></el-table-column>

                <!-- <el-table-column prop="stock" label="商品库存"></el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
          <!-- 在这里绑定表格的数据goodsList -->
          <el-table-column type="index" align="center"> </el-table-column>
          <!-- 添加索引列 -->
          <el-table-column
            prop="order_sn"
            label="订单编号"
            width="200px"
            align="center"
          >
          </el-table-column>
          <!-- prop是取得userList中每一个对象中的对应属性值 -->
          <el-table-column
            prop="pay_money"
            label="订单价格"
            width="95px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="订单状态" width="95px" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.order_status == '0'"
                >已删除</el-tag
              >
              <el-tag type="success" v-else-if="scope.row.order_status == '1'">
                已完成</el-tag
              >
              <el-tag type="warning" v-else-if="scope.row.order_status == '2'">
                未付款</el-tag
              >
              <el-tag type="info" v-else-if="scope.row.order_status == '3'">
                待发货</el-tag
              >
              <el-tag v-else-if="scope.row.order_status == '4'"> 待收货</el-tag>
              <el-tag type="info" v-else-if="scope.row.order_status == '5'">
                已取消</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="下单时间" width="200px" align="center">
            <template slot-scope="scope">
              {{ scope.row.created_time }}
            </template>
          </el-table-column>
          <el-table-column label="收货信息" width="220px" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.address_name }}</p>
              <p>{{ scope.row.address_phone }}</p>
              <p>{{ scope.row.address_info }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="settings">
            <template slot-scope="scope">
              <div
                v-if="
                  scope.row.order_status == '2' || scope.row.order_status == '3'
                "
              >
                <el-button @click="up_address(scope.row)"
                  >更改收货地址</el-button
                >
              </div>
              <div v-if="scope.row.order_status == '3'">
                <el-button @click="fahuo(scope.row)">发货</el-button>
              </div>
              <div><el-button>更多操作</el-button></div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryIofo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryIofo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination> -->
      </div>
    </main>
    <div class="thickdiv" @click="hiddenThick"></div>
    <!-- 更改收货地址 -->
    <div class="thickbox">
      <el-form ref="addressForm" :model="addressForm" label-width="80px">
        <el-form-item label="收货人" prop="name">
          <el-input v-model="addressForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addressForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="info">
          <el-input v-model="addressForm.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="updatebtn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 填入快递单号 -->
    <div class="thickbox-1">
      <el-form ref="shipping" :model="shipping" label-width="80px">
        <el-form-item label="快递单号" prop="sn">
          <el-input v-model="shipping.sn"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="up_shipping">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Sidebar from "../components/AdminSidebar.vue";
export default {
  name: "AdminOrder",
  components: { AdminHeader, Sidebar },
  data() {
    return {
      queryIofo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      orderList: [],
      total: 0,
      addressForm: {
        order_sn: "",
        name: "",
        phone: "",
        info: "",
      },
      shipping:{
        sn:"",
        order_sn:"",
      },
    };
  },
  methods: {
    getOrderList() {
      const _this = this;
      this.$axios
        .get("/admin/order", {
          params: this.queryIofo,
        })
        .then((res) => {
          var data = res.data.data;
          _this.orderList = data;
        });
    },
    //隐藏界面
    hiddenThick() {
      document.querySelector(".thickdiv").style.display = "none";
      document.querySelector(".thickbox").style.display = "none";
      document.querySelector(".thickbox-1").style.display = "none";
    },
    //更改收货地址
    up_address(row) {
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox").style.display = "block";
      this.addressForm.order_sn = row.order_sn;
      this.addressForm.name = row.address_name;
      this.addressForm.phone = row.address_phone;
      this.addressForm.info = row.address_info;
    },
    //提交修改后的收货地址
    updatebtn(){
      const _this = this;
      this.$axios.post("/admin/order_update_address",this.addressForm).then((res)=>{
        var msg = res.data.msg;
        _this.$message({
          message: msg,
          type: 'success'
        });
        _this.hiddenThick();
        _this.getOrderList();
      })
    },
    //发货按钮
    fahuo(row){
      document.querySelector(".thickdiv").style.display = "block";
      document.querySelector(".thickbox-1").style.display = "block";
      this.shipping.order_sn = row.order_sn;
    },
    //提交发货数据
    up_shipping(){
      const _this = this;
      this.$axios.post("/admin/order_update_shipping",this.shipping).then(res=>{
        var msg = res.data.msg;
        _this.$message({
          message: msg,
          type: 'success'
        });
        _this.getOrderList();
        _this.hiddenThick();
      })
    }
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  left: 260px;
  width: calc(100% - 260px);
}
main .search {
  padding-top: 10px;
  margin-bottom: 10px;
}

.a-table /deep/ .el-table td.settings .cell div {
  display: inline-block;
  margin: 0 2px;
}

.thickdiv {
  display: none;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background-color: rgba(230, 230, 230, 0.6);
  position: fixed;
  left: 0;
  top: 0;
}
.thickbox,.thickbox-1 {
  display: none;
  z-index: 10001;
  width: 500px;
  height: 300px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}
</style>