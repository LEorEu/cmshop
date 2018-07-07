<template>
    <footer class="footer-cart">
        <div class="add-cart-main clearfix" @click="cartDetails(1)">
            <div class="cart-img">
                <div class="ring">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gouwuche"></use>
                    </svg>
                    <span class="total-num" v-if="cartTotal.num != 0">{{ cartTotal.num }}</span>
                </div>
            </div>
            <div class="cart-total fl-l">
                <p>合计：<span>￥{{ parseFloat(cartTotal.price/100).toFixed(2) }}</span></p>
            </div>
            <div class="cart-btn fl-r">
                <button class="settle-accounts" @click="settlement()">去结算</button>
            </div>
        </div>
        <van-popup class="cart-box" v-model="boxShow" position="bottom" :overlay="true">
            <div class="cartview">
                <div class="cartview-header clearfix">
                    <div class="delete-cart fl-l clearfix" @click="deleteCart()">
                        <van-icon class="fl-l" name="delete" />
                        <p class="fl-l">清空购物车</p>
                    </div>
                    <van-icon class="fl-r" name="close" @click="cartDetails(0)" />
                </div>
                <div class="cartview-main">
                    <ul class="cartview-list">
                        <li class="cartview-item clearfix" v-for="(item, index) in footerCartInfo" :key="index">
                            <h5 class="name fl-l">{{ item.goodName }}</h5>
                            <p class="price fl-l">总计：<span>￥{{ parseFloat((item.price*item.count)/100).toFixed(2) }}</span></p>
                            <el-input-number class="fl-r" v-model="item.count" @change="footerHandleChange(item.goodId,item.goodName,item.count,item.price)" :min="0" label="描述文字"></el-input-number>
                        </li>
                    </ul>
                </div>
            </div>
        </van-popup>
    </footer>
</template>

<script>
import axios from 'axios'

export default {
    props: ['listAddCart','detailsAddCart'],
    data(){
        return{
            footerCartInfo: [],     //购物车详情
            boxShow: false,         //购物车弹窗
        }
    },
    mounted(){
        this.getCartInfo()
    },
    computed:{
        // 购物车计算总价
		cartTotal(){
            let total = {
                num: 0,
                price: 0
            }
            let len = this.footerCartInfo.length
            for(var i = 0; i < len; i++){
                total.num += parseInt(this.footerCartInfo[i].count)
                total.price += parseInt(this.footerCartInfo[i].count * this.footerCartInfo[i].price)
            }
            return total
		}
    },
    watch:{
        // 监听商品数量变化
        listAddCart(val){
            this.getCartInfo()
        },
        detailsAddCart(val){
            this.getCartInfo()
        },
    },
    methods:{
        // 获取购物车详情
        getCartInfo(){
            let userId = '51'
            let url = `/convenience/api/v1/bmsc/cart/${userId}/list`
            axios.post(url).then((response) => {
               this.footerCartInfo = response.data.result
            })
        },
        // 底部购物车详情弹出
        cartDetails(num){
            if(this.cartTotal.num != 0){
                if( num == 1 ){
                    if(this.boxShow == true){
                        this.boxShow = false
                        return false
                    }else{
                        this.boxShow = true
                        return false
                    }
                }else if( num == 0){
                    this.boxShow = false
                }
            }
        },
        // 监听商品添加到购物车
        footerHandleChange(id,name,num,gp) {
            let data = {
                goodId: id,
                goodName: name,
                count: num,
                price: gp
            }
            let userId = '51'
            let url = `/convenience/api/v1/bmsc/cart/${userId}/insert`
            let formData = new FormData()
                formData.append('goodId',data.goodId)
                formData.append('count',data.count)
            axios.post(url,formData).then((response) => {
                this.getCartInfo()
                this.$emit('cartStatus',1)
                if(this.cartTotal.num == 0){
                    this.boxShow = false
                }
            })
        },
        // 清空购物车
        deleteCart(){
            let userId = '51'
            let url = `/convenience/api/v1/bmsc/cart/${userId}/clear`
            axios.post(url).then((response) => {
                this.getCartInfo()
                this.$emit('cartStatus',1)
                this.boxShow = false
            })
        },
        // 结算
        settlement(){
            this.$store.state.creatOrderInfo = this.footerCartInfo
            this.$router.push('/pay')
        }
    }
}
</script>


<style lang="less" scoped>
.footer-cart{
    position: fixed;
    margin: 0 auto;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    max-width: 750px;
    z-index: 101;
    .add-cart-main{
        position: relative;
        padding-left: 100px;
        width: 100%;
        height: 50px;
        background-color: #fff;
        -webkit-box-shadow: 0 -2px 10px rgba(51, 51, 51, 0.1);
        box-shadow: 0 -2px 10px rgba(51, 51, 51, 0.1);
        z-index: 9999;
        .cart-img{
            position: absolute;
            padding: 2px;
            width: 62px;
            height: 62px;
            left: 15px;
            bottom: 10px;
            border-radius: 100%;
            border: 2px solid #ff8134;
            .ring{
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background-color: #ff8134;
                text-align: center;
                .icon{
                    margin-top: 10px;
                    font-size: 32px;
                    color: #fff;
                }
                .total-num{
                    position: absolute;
                    right: -5px;
                    top: -5px;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    font-size: 12px;
                    line-height: 20px;
                    text-align: center;
                    background-color: #60c5ff;
                    color: #fff;
                }
            }
        }
        .cart-total{
            margin-top: 15px;
            p{
                font-size: 16px;
                color: #333;
                span{
                    font-size: 18px;
                    color: #ff8134;
                }
            }
        }
        .cart-btn{
            width: 100px;
            height: 50px;
            .settle-accounts{
                width: 100px;
                height: 50px;
                border: 0;
                font-size: 16px;
                background-color: #ff8334;
                color: #fff;
            }
        }
    }
}
.van-popup{
    background-color: transparent;
}
.cart-box{
    width: 100%;
    bottom: 50px;
    .cartview{
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding-bottom: 40px;
        width: 100%;
        border-bottom: 1px solid #f4f4f4;
        background-color: #fff;
        z-index: 2002;
        .cartview-header{
            padding: 8px;
            border-bottom: 1px solid #f4f4f4;
            .delete-cart{
                .van-icon{
                    margin-top: 2px;
                    font-size: 14px;
                    color: #000;
                }
                p{
                    margin-left: 5px;
                    font-size: 14px;
                    color: #333;
                }
            }
            .van-icon-close{
                margin-top: 3px;
                font-size: 16px;
                color: #333;
            }
        }
        .cartview-main{
            padding: 10px 10px 0;
            .cartview-item{
                padding: 5px 0;
                width: 100%;
                .name{
                    width: 40%;
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 24px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #333;
                }
                .price{
                    margin-left: 10px;
                    font-size: 14px;
                    line-height: 24px;
                    color: #666;
                    span{
                        font-size: 16px;
                        color: #ff8134;
                    }
                }
            }
        }
    }
}
</style>
