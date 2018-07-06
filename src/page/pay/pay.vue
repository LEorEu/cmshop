<template>
    <div class="pay">
        <div class="pay-address section">
            <div class="address-null" v-if="payAddressShow">
                <a class="add-address" @click="addressBox()">+ 添加收货地址</a>
            </div>
            <div class="address-focus" v-if="!payAddressShow">
                <van-icon name="location" />
                <div class="van-address-list__name">{{ payAddress.userName }}&nbsp;&nbsp;{{ payAddress.mobilePhone }}</div>
                <div class="van-address-list__address">收货地址：{{ payAddress.address }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="pay-order section">
            <div class="section-title">
                <h2>【订单信息】</h2>
            </div>
            <div class="section-main">
                <ul class="goods-list">
                    <li class="goods-item flex">
                        <div class="goods-img">
                            <img src="" alt="">
                        </div>
                        <div class="goods-text">
                            <p class="goods-title">新鲜土豆</p>
                            <p class="goods-price">￥5.20</p>
                            <p>x 1</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pay-form section"> 
            <van-cell-group>
                <van-cell class="service-time" title="送达时间" value="预计60分钟左右送达" />
                <van-cell class="my-vip my-cate-item" title="优惠券" :value="coupon" is-link />
                <van-field
                    v-model="remark"
                    type="textarea"
                    rows="1"
                    autosize
                    label="备注："
                    placeholder="30字以内"
                />
            </van-cell-group>
        </div>
        <div class="pay-total section">
            <div class="total-text clearfix">
                <p class="fl-l">商品总价</p>
                <p class="fl-r">￥25.00</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">快递费</p>
                <p class="fl-r">+￥0.00</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">优惠券</p>
                <p class="fl-r">-￥2.00</p>
            </div>
        </div>
        <van-submit-bar
            :price="3050"
            label="实付款："
            button-text="去付款"
            @submit="onSubmit"
        />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            payAddress: {
                userName: '乔布斯',
                mobilePhone: '18835536886',
                address: '美国圣地亚哥，阿妹你看 上帝压狗'
            },             //地址
            payAddressShow: false,      //地址状态切换
            coupon: '(暂无可用)',       //优惠券
            remark: '',                 //备注
            goodsInfo: ''               //订单信息
        }
    },
    mounted(){
        
    },
    methods:{
        addressBox(){

        },
        onSubmit(){

        }
    }
}
</script>

<style lang="less" scoped>
.pay{
    background-color: #f0f0f0;
    padding-bottom: 60px;
    .pay-address{
        padding: 15px 10px;
        background-color: #fff;
        .address-null{
            text-align: center;
            .add-address{
                display: inline-block;
                width: 150px;
                height: 35px;
                font-size: 14px;
                line-height: 34px;
                border: 1px solid #ff8334;
                border-radius: 20px;
                color: #ff8334;
            }
        }
        .address-focus{
            position: relative;
            padding-left: 50px;
            .van-icon-location{
                position: absolute;
                left: 10px;
                top: calc(50% - 10px);
                font-size: 20px;
                color: #ff8334;
            }
            .van-icon-arrow{
                position: absolute;
                right: 10px;
                top: calc(50% - 8px);
                font-size: 16px;
                color: #adadad;
            }
        }
    }
    .pay-order{
        margin-top: 10px;
        background-color: #fff;
        .section-title{
            padding: 5px 10px;
            border: 1px solid #f6f6f6;
            h2{
                font-size: 14px;
                color: #333;
            }
        }
        .section-main{
            padding: 10px;
            .goods-item{
                
            }
        }
    }
    .pay-form{
        margin-top: 10px;
    }
    .pay-total{
        padding: 10px;
        margin-top: 10px;
        background-color: #fff;
        .total-text{
            margin-bottom: 5px;
        }
    }
}
.van-submit-bar{
    bottom: 0;
}
</style>
