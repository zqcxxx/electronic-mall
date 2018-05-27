<template>
	<div>
  <nav-header></nav-header>
  <nav-bread>
    <span>商品</span>
  </nav-bread>
  <div class="accessory-result-page accessory-page">
    <div class="container">
      <div class="filter-nav">
        <span class="sortby">排序 &nbsp:</span>
        <a href="javascript:void(0)" class="default cur">默认</a>
        <a href="javascript:void(0)" class="price" @click="sortGoods">价格
          <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
          </svg>
        </a>
        <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">筛选</a>
      </div>
      <div class="accessory-result">
        <!-- filter -->
        <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
          <dl class="filter-price">
            <dt>价格区间</dt>
            <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">所有</a></dd>
            <dd v-for="(price,index) in priceFilter">
              <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
            </dd>
          </dl>
        </div>
        <!-- search result accessories list -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="(item,index) in goodslist">
                <div class="pic">
                  <a href="#"><img v-lazy ="'/static/'+item.productImage" alt=""></a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
    <p slot="message">
      请先登录，否则无法加入购物车
    </p>
    <div slot="btnGroup">
      <a class="btn btn--m" href="javascript:;" @click="closeModal">关闭</a>
    </div>
  </modal>
  <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
    <p slot="message">
      <svg class="icon-status-ok">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
      </svg>
      <span>加入购物车成功</span>
    </p>
    <div slot="btnGroup">
      <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
      <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
    </div>
  </modal>
  <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
  <nav-footer></nav-footer>
	</div>
</template>

<script>
	import '../assets/css/base.css'
	import '../assets/css/product.css'
  import NavHeader from '../components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
  export default {

    name: 'GoodsList',

    data () {
      return {
           goodslist: [],
           sortFlag: true,
           priceFilter:[
              {
                 startPrice:'0.00',
                 endPrice:'100.00'
             },
             {
               startPrice:'100.00',
               endPrice:'500.00'
             },
             {
               startPrice:'500.00',
               endPrice:'1000.00'
             },
             {
               startPrice:'1000.00',
               endPrice:'5000.00'
             }
           ],
          priceChecked:'all',
          filterBy: false,
          overLayFlag: false,
          page:1,
          pageSize:8,
          busy:true,
          priceLevel:this.priceChecked,
          loading:false,
          mdShow:false,
          mdShowCart:false
      }
    },
    mounted() {
        this.getGoodsList ();
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    }, 
    methods: {
      showFilterPop () {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      closePop () {
        this.filterBy = false;
        this.overLayFlag = false;
      },
      getGoodsList (flag) {
        var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceChecked
        }
        this.loading = true;
        axios.get("/goods/list", {
          params:param
        }).then((response)=>{
          let res = response.data;
          this.loading = false;
          if(res.status == "0") {
            if (flag) {
              this.goodslist = this.goodslist.concat(res.result.list);
              if (res.result.count < 8) {
                this.busy = true;
              }else {
                this.busy = false;
              }
            }else {
              this.goodslist = res.result.list;
              this.busy = false;
            }
          }else {
            this.goodslist = [];
          }
       });
      },
      sortGoods () {
        this.sortFlag = ! this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      setPriceFilter (index) {
        this.priceChecked = index;
        this.page = 1;
        this.getGoodsList();
        this.closePop(); 
      },
      loadMore () { 
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true) ;
        }, 500);
      },
      addCart (productId) {
        axios.post("/goods/addCart", {
          productId:productId
        }).then((res)=>{
          if(res.data.status == 0){
            this.mdShowCart = true;
            this.$store.commit('updateCartCount',1);
          }else {
            this.mdShow = true;
          }
        });
      },
      closeModal () {
        this.mdShow = false;
      }
    }
  }
</script>
