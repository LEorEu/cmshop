<template>
    <div class="coupon-receive">
        <ul>
            <li class="coupon-item flex" v-for="(item, index) in items" :key="index">
                <div class="item-left">
                    <h2 class="coupon-title">{{ item.couponName }}</h2>
                    <h4 class="coupon-desc">全场通用</h4>
                    <p class="coupon-time">有效期：{{ item.createTime.substring(0,10) }}-{{ item.useTime.substring(0,10) }}</p>
                </div>
                <div class="item-right">
                    <h2 class="coupon-price">{{ item.price/100 }}<span>元</span></h2>
                    <router-link class="coupon-btn" to="/category">立即使用</router-link>
                </div>
            </li>
        </ul>
             </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            items: []
        }
    },
    mounted(){
        this.getCouponList()
    },
    methods:{
        // 获取领取优惠券列表
        getCouponList(){
            let url = '/convenience/api/v1/bmsc/couponperson/query'
            let formData = new FormData()
                formData.append('userId',this.$store.state.userId)
            axios.post(url,formData).then((response) => {
                this.items = response.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.coupon-receive{
    padding: 10px;
    background-color: #f3f3f3;
    .coupon-item{
        padding: 10px 20px;
        margin-bottom: 10px;
        width: 100%;
        background-image: url('../../../static/images/coupon-bg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        .item-left{
            width: 70%;
            .coupon-title{
                font-size: 20px;
                color: #3a97ff;
            }
            .coupon-desc{
                margin-top: 5px;
                font-size: 16px;
                color: #79c3ff;
            }
            .coupon-time{
                margin-top: 5px;
                font-size: 12px;
                color: #666;
            }
        }
        .item-right{
            padding-left: 10px;
            width: 30%;
            .coupon-price{
                margin-top: 5px;
                font-size: 30px;
                text-align: center;
                color: #fff;
                span{
                    font-size: 16px;
                }
            }
            .coupon-btn{
                display: block;
                margin: 10px auto;
                width: 80px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                background-color: #fff;
                border-radius: 8px;
                color: #3e99ff;
            }
        }
    }
}
</style>
