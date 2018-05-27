<template>
	<div>
		<nav-header></nav-header>
		 <div>
		  <div class="container">
		    <div class="page-title-normal">
		      <h2 class="page-title-h2"><span>结账</span></h2>
		    </div>
		    <!-- 进度条 -->
		    <div class="check-step">
		      <ul>
		        <li class="cur"><span>确认地址</span></li>
		        <li class="cur"><span>查看订单</span></li>
		        <li class="cur"><span>完成支付</span></li>
		        <li class="cur"><span>订单确认</span> </li>
		      </ul>
		    </div>

		    <div class="order-create">
		      <div class="order-create-pic"><img src="./../../static/ok-2.png" alt=""></div>
		      <div class="order-create-main">
		        <h3>恭喜您<br>已经完成订单！</h3>
		        <p>
		          <span>订单号：{{orderId}}</span>
		          <span>总金额： {{orderTotal|currency('$')}}</span>
		        </p>
		        <div class="order-create-btn-wrap">
		          <div class="btn-l-wrap">
		            <router-link class="btn btn--m" to='/cart'>返回购物车</router-link>
		          </div>
		          <div class="btn-r-wrap">
		            <router-link class="btn btn--m" to="/">返回商品列表</router-link>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import NavHeader from './../components/NavHeader.vue'
	import NavFooter from '@/components/NavFooter'
	import {currency} from './../util/currency.js'
	import axios from 'axios'
	export default {

	  name: 'OrderSuccess',

	  data () {
	    return {
	    	orderId:'',
	    	orderTotal:0
	    }
	  },
	  components: {
	  	NavHeader,
	  	NavFooter
	  },
	  filters: {
	  	currency:currency
	  },
	  mounted() {
	  	var orderId = this.$route.query.orderId;
	  	// if (!orderId) {
	  	// 	return;
	  	// }
	  	axios.get('/users/orderDetail',{
	  		params:{
	  			orderId:orderId
	  		}
	  	}).then((response)=>{
	  		let res = response.data;
	  		if (res.status == 0) {
	  			this.orderId = orderId;
	  			this.orderTotal = res.result.orderTotal;
	  		}
	  	});
	  }
	}
</script>

<style lang="css" scoped>
</style>

