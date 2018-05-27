 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.config.productionTip = false

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyLoad,{
	loading: "/static/loading-svg/loading-bars.svg"
});

Vue.filter('currency',currency);

const store = new Vuex.Store({
	state: {
		nickName:'',
		cartCount:0	
	},
	mutations: {
		updateUserInfo (state, nickName) {
			state.nickName = nickName;
		},
		updateCartCount (state, cartCount) {
			state.cartCount += cartCount;
		},
		initCartCount (state, cartCount) {
			state.cartCount = cartCount;
		},
		finshCartCount (state, cartCount) {
			state.cartCount = 0;
		}
	}
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
