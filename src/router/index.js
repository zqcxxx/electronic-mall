import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import OrderAddress from './../views/OrderConfirm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path:'/address',
      component: Address
    },
    {
      path:'/orderConfirm',
      component: OrderAddress
    }
  ]
})
