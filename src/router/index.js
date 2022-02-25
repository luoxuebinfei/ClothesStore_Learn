import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../views/login";
import Register from "../views/register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component:login
  },
  {
    path: '/login',
    name: 'login',
    component:login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]
  
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
  
  export default router