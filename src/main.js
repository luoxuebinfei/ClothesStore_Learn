import Vue from 'vue';

import App from './App.vue'
import router from './router/index'
// import store from './store'
// import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/CSS/tailwind.css'
import './assets/CSS/global.css'
//引入图标样式
import './assets/icon/icon1/iconfont.css'



Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
