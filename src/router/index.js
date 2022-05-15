import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import Login from "../views/Login";
import Register from "../views/register";
import UserHome from "../views/UserHome";
import Cart_index from "../views/Cart_index";
import ShopInfo from "../views/ShopInfo";
import Mall from "../views/Mall";
import Search from "../views/Search";
import Order from "../views/Order";
import OrderClient from "../views/OrderClient";
import Return from "../views/Return";
import NotFound from "../views/404";
import AdminShop from "../views/AdminShop";
import AdminOrder from "../views/AdminOrder";
import AdminUser from "../views/AdminUser";
import AdminHome from "../views/AdminHome";


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: UserHome
  },
  {
    path: '/cart_index',
    name: 'cart_index',
    component:Cart_index
  },
  {
    path: '/shopinfo/:id',
    name: 'shopInfo',
    component:ShopInfo
  },
  {
    path: '/mall/:id',
    name: 'mall',
    component:Mall
  },
  {
    path: '/search',
    name: 'search',
    component:Search
  },
  {
    path: '/order',
    name: 'order',
    component:Order
  },
  {
    path: '/order_client',
    name: 'orderClient',
    component:OrderClient
  },
  {
    path: '/return',
    name: 'return',
    component:Return
  },
  //下面是管理员路由
  {
    path: '/admin/login',
    name: 'adminLogin',
    component:Login,
  },
  {
    path: '/admin/shop',
    name: 'adminShop',
    component:AdminShop,
  },
  {
    path: '/admin/order',
    name: 'adminOrder',
    component:AdminOrder,
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    component:AdminUser,
  },
  {
    path: '/admin/home',
    name: 'adminHome',
    component:AdminHome,
  },
  {
    path: '*',
    name: 'notfound',
    component:NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
})

export default router