<template>
    <div class="coupon-list">
        <ul>
            <li class="coupon-item" v-for="(item, index) in items" :key="index">
                <div class="coupon-img">
                    <img :src="utils.testImgUrl(item.couponImage.replace(/\\/g,'/'))" alt="">
                    <div class="coupon-header">
                        <p>{{ item.couponName }}</p>
                    </div>
                </div>
                <div class="coupon-main flex">
                    <div class="coupon-text">
                        <p class="price">{{ item.price/100 }}元优惠券<span class="type">全场通用</span></p>
                        <p class="time">使用截止日：{{ item.beginTime.substring(0,10) }}</p>
                    </div>
                    <div class="coupon-receive">
                        <button class="coupon-btn" @click="receiveCoupon(item.id)">领 券</button>
                    </div>
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
            let url = '/convenience/api/v1/bmsc/coupon/list'
            let formData = new FormData()
                formData.append('userId',this.$store.state.userId)
            axios.post(url,formData).then((response) => {
                this.items = response.data.rows
            })
        },
        // 领取优惠券
        receiveCoupon(id){
            let url = '/convenience/api/v1/bmsc/couponperson/update'
            let formData = new FormData()
                formData.append('userId',this.$store.state.userId)
                formData.append('couponId',id)
            axios.post(url,formData).then((response) => {
                if(response.data.msg == 'OK'){
                    this.$toast('领取优惠券成功！')
                    this.getCouponList()
                }else{
                    this.$toast('领取优惠券失败！')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.coupon-list{
    padding: 10px;
    padding-bottom: 60px;
    background-color: #f3f3f3;
    .coupon-item{
        margin-bottom: 20px;
        width: 100%;
        background-color: #fff;
        box-shadow: 0px 0px 10px 2px #dadada;
        .coupon-img{
            position: relative;
            width: 100%;
            height: 200px;
            background-color: #eee;
            .coupon-header{
                position: absolute;
                top: 10px;
                left: 8%;
                padding: 5px 10px 0px 10px;
                width: 84%;
                height: 25px;
                background-image: url('../../../static/images/coupon-title-bg.png');
                background-repeat: repeat-x;
                p{
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
        .coupon-main{
            padding: 15px;
            .coupon-text{
                width: calc(100% - 100px);
                .price{
                    font-size: 16px;
                    color: #ff5067;
                    span{
                        margin-left: 10px;
                        font-size: 14px;
                        color: #666;
                    }
                }
                .time{
                    margin-top: 5px;
                    font-size: 14px;
                    color: #666;
                }
            }
            .coupon-receive{
                width: 100px;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: Center;
                -ms-flex-align: Center;
                align-items: Center;
                .coupon-btn{
                    width: 100px;
                    height: 30px;
                    background: linear-gradient(to right, #ff6f89 , #ff4b62);
                    border: 1px solid #fff;
                    border-radius: 15px;
                    box-shadow: 0px 0px 2px 1px #dcdcdc;
                    color: #fff;
                }
            }
        }
    }
}
</style>
