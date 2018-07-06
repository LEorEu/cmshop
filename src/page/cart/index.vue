<template>
  <div class="cart">
    <div class="cart-header clearfix">
      <p class="fl-l">【购物车信息】</p>
      <van-icon class="fl-r" name="delete" @click="deleteCart()" />
    </div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox class="card-goods__item"
        v-for="item in goods"
        :key="item.id"
        :name="item.id"
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
      :price="totalPrice"
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
      goods: []
    }
  },
  computed: {
    // 计算总价
    totalPrice() {
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0)
    }
  },
  mounted(){
    this.getCartInfo()
  },
  methods: {
    // 获取购物车详情
    getCartInfo(){
        let userId = '51'
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
        let userId = '51'
        let url = `convenience/api/v1/bmsc/cart/${userId}/clear`
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
      this.$toast('点击结算')
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