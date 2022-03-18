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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
})

export default router