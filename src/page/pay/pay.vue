<template>
    <div class="pay">
        <!-- <div class="pay-address section">
            <div class="address-null" v-if="payAddressShow">
                <a class="add-address" @click="addressBox()">+ 添加收货地址</a>
            </div>
            <div class="address-focus" v-if="!payAddressShow">
                <div class="location-ring">
                    <van-icon name="location" />
                </div>
                <div class="van-address-list__name">{{ payAddress.userName }}&nbsp;&nbsp;{{ payAddress.mobilePhone }}</div>
                <div class="van-address-list__address">收货地址：{{ payAddress.address }}</div>
                <van-icon name="arrow" />
            </div>
        </div> -->
        <div class="pay-order section">
            <div class="section-title">
                <h2>【订单信息】</h2>
            </div>
            <div class="section-main">
                <ul class="goods-list">
                    <li class="goods-item flex" v-for="(item, index) in cartInfo" :key="index">
                        <div class="goods-img">
                            <img :src="utils.testImgUrl(item.goodImage.replace(/\\/g,'/'))" alt="">
                        </div>
                        <div class="goods-text clearfix">
                            <p class="goods-title">{{ item.goodName }}</p>
                            <p class="goods-price fl-l">￥{{ parseFloat(item.price/100).toFixed(2) }}</p>
                            <p class="goods-count fl-r">x {{ item.count }}</p>
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
                <p class="fl-r">￥{{ parseFloat(cartTotal/100).toFixed(2) }}</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">快递费</p>
                <p class="fl-r">+￥0.00</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">优惠券</p>
                <p class="fl-r">-￥0.00</p>
            </div>
        </div>
        <van-submit-bar
            :price="cartTotal"
            label="实付款："
            button-text="去付款"
            @submit="onSubmit"
        />
    <van-loading color="black" v-show="loadingShow" />
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
            goodsInfo: '',              //订单信息
            loadingShow: false,         //
            cartInfo: []                //购物车传递过来的数据
        }
    },
    mounted(){
        this.initData()
    },
    computed: {
        // 计算总价
        cartTotal(){
            let total = 0
            let len = this.cartInfo.length
            for(var i = 0; i < len; i++){
                total += parseInt(this.cartInfo[i].count * this.cartInfo[i].price)
            }
            return total
        }
    },
    methods:{
        // 数据初始化
        initData(){
            this.cartInfo = this.$store.state.creatOrderInfo
            if(this.cartInfo.length == 0){
                this.$dialog.alert({
                    message: '没有订单数据'
                }).then(() => {
                    this.$router.push('/cart')
                })
            }
        },
        // 地址显示
        addressBox(){

        },
        // 提交数据
        onSubmit(){
            this.loadingShow = true
            let arr = []
            for (let i = 0; i < this.cartInfo.length; i++) {
                arr.push(this.cartInfo[i].goodId)
            }
            let userId = this.$store.state.userId
            let url = '/convenience/api/v1/pay/toPayInit'
            let formData = new FormData()
                formData.append('userId',userId)
                formData.append('array',arr)
            axios.post(url,formData).then((response) => {
                this.loadingShow = false
                let data = response.data
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
                    }
                }else{
                    this.onBridgeReady(data)
                }
            })
        },
        //调用微信支付页面
        onBridgeReady(data) {
            let _this=this
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.unifiedOrderRequest.appid,     //公众号名称，由商户传入     
                    "timeStamp": data.timestamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": data.noncestr, //随机串     
                    "package": `prepay_id=${data.prepay_id}`,
                    "signType": 'MD5',         //微信签名方式：     
                    "paySign": data.paySign, //微信签名
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        _this.$toast.success('支付成功！')
                        _this.$router.push('/order')
                    }else{     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        _this.$toast.fail('支付失败！')
                    }
                }
            )
        }
    }
}
</script>            

<style lang="less" scoped>
.pay{
    background-color: #f3f3f3;
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
            .location-ring{
                position: absolute;
                left: 10px;
                top: calc(50% - 12px);
                width: 24px;
                height: 24px;
                line-height: 28px;
                text-align: center;
                border-radius: 100%;
                background-color: #ff8334;
            }
            .van-icon-location{
                font-size: 14px;
                color: #fff;
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
                margin-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #f8f8f8;
                .goods-img{
                    overflow: hidden;
                    width: 62px;
                    height: 62px;
                    border: 1px solid #f8f8f8;
                    display: flex;
                    justify-content:center;
                    align-items:Center;
                }
                .goods-text{
                    margin-left: 20px;
                    width: calc(100% - 82px);
                    .goods-title{
                        margin-top: 5px;
                        font-size: 16px;
                        color: #333;
                    }
                    .goods-price{
                        margin-top: 10px;
                        font-size: 14px;
                        color: #999;
                    }
                    .goods-count{
                        margin-top: 10px;
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
            .goods-item:nth-child(1){
                margin-top: 0;
            }
            .goods-item:nth-last-child(1){
                border-bottom: 0;
                padding-bottom: 0;
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
