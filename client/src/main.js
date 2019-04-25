import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale })

import router from './router';
import axios from 'axios';
import D3 from '@antv/f2'; // 测试 可能以后需要删除

import G2 from '@antv/g2';


Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$D3 = D3;
Vue.prototype.$G2 = G2;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
