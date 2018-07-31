<template>
  <div class="cart">
    <div class="cart-header clearfix">
      <p class="fl-l">【购物车信息】</p>
      <van-icon class="fl-r" name="delete" @click="deleteCart()" />
    </div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods" :change="checkedStatus()">
      <van-checkbox class="card-goods__item"
        v-for="item in goods"
        :key="item.goodId"
        :name="item"
      >
        <van-card
          :title="item.goodName"
          :desc="item.desc"
          :num="item.count"
          :price="formatPrice(item.price)"
          :thumb="utils.testImgUrl(item.goodImage.replace(/\\/g,'/'))"
        />
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="cartTotal.price"
      :disabled="!checkedGoods.length"
      button-text="结算"
      @submit="onSubmit"
    />
    <shop-footer></shop-footer>
  </div>
</template>

<script>
import axios from 'axios'

import shopFooter from '../../components/footer/footer'

export default {
  components: {
    'shop-footer': shopFooter
  },
  data() {
    return {
      checkedGoods: [],
      goods: [],
    }
  },
  computed: {
    // 购物车计算总价
		cartTotal(){
      let total = {
          num: 0,
          price: 0
      }
      let arr = []
      let len = this.checkedGoods.length
      for(var i = 0; i < len; i++){
          arr.push(this.checkedGoods[i].goodId)
          total.num += parseInt(this.checkedGoods[i].count)
          total.price += parseInt(this.checkedGoods[i].count * this.checkedGoods[i].price)
      }
      return total
		}
  },
  mounted(){
    this.getCartInfo()
  },
  methods: {
    // 选中状态
    checkedStatus(){
      let arr= []
      for(let i in this.checkedGoods){
        arr.push(this.checkedGoods[i].goodId)
      }
    },
    // 获取购物车详情
    getCartInfo(){
        let userId = this.$store.state.userId
        let url = `/convenience/api/v1/bmsc/cart/${userId}/list`
        axios.post(url).then((response) => {
            this.goods = response.data.result
        })
    },
    // 清空购物车
    deleteCart(){
      this.$dialog.confirm({
        title: '您确定要清空购物车吗',
      }).then(() => {
        let userId = this.$store.state.userId
        let url = `/convenience/api/v1/bmsc/cart/${userId}/clear`
        axios.post(url).then((response) => {
            this.getCartInfo()
        })
        // on confirm
      }).catch(() => {
        // on cancel
      })
    },
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },
    onSubmit() {
      this.$store.state.creatOrderInfo = this.checkedGoods
      this.$router.push('/pay')
    }
  }
}
</script>



<style lang="less" scoped>
.cart{
  margin-top: 10px;
  margin-bottom: 110px;
  -webkit-box-shadow: 0 0 10px rgba(51, 51, 51, 0.1);
  box-shadow: 0 0 10px rgba(51, 51, 51, 0.1);
  .cart-header{
    padding: 10px;
    p{
      font-size: 16px;
      color: #333;
    }
    .van-icon{
      font-size: 16px;
      color: #333;
    }
  }
}

.van-submit-bar{
    bottom: 61px;
    z-index: 101;
}
</style>