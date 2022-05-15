<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="defaultActive"
      @select="handleSelect"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: window.localStorage.getItem("activePath") || "/admin/shop", // 对应路由激活导航栏导航，默认/admin/shop路由
      items: [
        {
          icon: "el-icon-s-goods",
          index: "/admin/shop",
          title: "商品管理",
        },
        {
          icon: "el-icon-s-order",
          index: "/admin/order",
          title: "订单管理",
        },
        {
          icon: "el-icon-user-solid",
          index: "/admin/user",
          title: "用户管理",
          subs: [
            {
              icon: "el-icon-user-solid",
              index: "/admin/user?u=1",
              title: "普通用户",
            },
            {
              icon: "el-icon-user-solid",
              index: "/admin/user?u=2",
              title: "管理员用户",
            },
          ],
        },
        {
          icon: "el-icon-s-home",
          index: "/admin/home",
          title: "首页管理",
        },
      ],
    };
  },
  methods: {
    handleSelect(key, path) {
      // console.log(key, path);
      window.localStorage.setItem("activePath", key); // 用于记录激活的导航
    },
    setSelect(){
      var url = location.pathname + location.search;
      this.defaultActive = url;
    },
  },
  created(){
    this.setSelect();
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  width: 250px;
  height: calc(100vh - 70px);
  background-color: #324157;
  overflow-y: scroll;
}
</style>