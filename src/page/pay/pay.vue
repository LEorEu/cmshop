<template>
    <div class="pay">
        <!-- 收货地址 -->
        <div class="pay-address section">
            <div class="address-null" v-if="payAddressShow">
                <a class="add-address" @click="addressBox()">+ 添加收货地址</a>
            </div>
            <div class="address-focus" v-if="!payAddressShow" @click="addressBox()">
                <div class="location-ring">
                    <van-icon name="location" />
                </div>
                <div class="van-address-list__name">{{ payAddress.userName }}&nbsp;&nbsp;{{ payAddress.mobilePhone }}</div>
                <div class="van-address-list__address">收货地址：{{ payAddress.address }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 订单信息 -->
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
        <!-- 支付表单 -->
        <div class="pay-form section"> 
            <van-cell-group>
                <van-cell class="service-time" title="送达时间" value="预计60分钟左右送达" />
                <van-cell class="my-vip my-cate-item" title="优惠券" :value="couponText" is-link @click="couponBox()" />
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
        <!-- 订单统计 -->
        <div class="pay-total section">
            <div class="total-text clearfix">
                <p class="fl-l">商品总价</p>
                <p class="fl-r">￥{{ parseFloat(cartTotal.goodsTotal/100).toFixed(2) }}</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">快递费</p>
                <p class="fl-r">+￥0.00</p>
            </div>
            <div class="total-text clearfix">
                <p class="fl-l">优惠券</p>
                <p class="fl-r">-￥{{ parseFloat(couponPrice/100).toFixed(2) }}</p>
            </div>
        </div>
        <!-- 提交 -->
        <van-submit-bar
            :price="cartTotal.actualTotal"
            label="实付款："
            button-text="去付款"
            @submit="payShow"
        />
        <!-- 地址模块 -->
        <van-popup class="address-box" v-model="addressBoxShow" position="bottom" :overlay="false">
            <pay-address @addressId="selectAdd"></pay-address>
        </van-popup>
        <!-- 优惠券模块 -->
        <van-popup class="coupon-box" v-model="couponBoxShow" position="bottom" :overlay="false">
            <pay-coupon @couponId="selectCoupon"></pay-coupon>
        </van-popup>
        <!-- 付款方式 -->
        <van-popup class="paymode-box" v-model="paymodeBoxShow" position="bottom" :overlay="true">
            <pay-mode @wxPay="onSubmit" @close="paymodeBoxShow = false" :child-total="cartTotal.actualTotal"></pay-mode>
        </van-popup>
        <!-- loading -->
        <van-loading color="black" v-show="loadingShow" />
    </div>
</template>

<script>
import axios from 'axios'

import payAddress from '../../components/common/payAddress'
import payCoupon from '../../components/common/payCoupon'
import payMode from '../../components/common/payMode'

export default {
    components: {
        'pay-address': payAddress,
        'pay-coupon': payCoupon,
        'pay-mode': payMode
    },
    data(){
        return{
            payAddress: '',             //地址信息
            payAddressShow: false,      //地址状态切换
            addressBoxShow: false,      //地址弹窗显示
            coupon: '',                 //优惠券信息
            couponPrice: 0,            //优惠券价格
            couponText: '(暂无可用)',    //优惠券显示文字
            couponBoxShow: false,       //优惠券弹窗显示
            remark: '',                 //备注
            paymodeBoxShow: false,      //付款方式弹窗显示
            goodsInfo: '',              //订单信息
            loadingShow: false,         //
            cartInfo: []                //购物车传递过来的数据
        }
    },
    mounted(){
        this.initData()
        this.initAddress()
        this.initCoupon()
    },
    computed: {
        // 计算总价
        cartTotal(){
            let total = {}
            let goodsTotal = 0
            let actualTotal = 0
            let len = this.cartInfo.length
            for(var i = 0; i < len; i++){
                goodsTotal += parseInt(this.cartInfo[i].count * this.cartInfo[i].price)
            }
            total = {
                goodsTotal: goodsTotal,
                actualTotal: goodsTotal - this.couponPrice
            }
            if(total.actualTotal < 0){
                this.$dialog.alert({
                    message: '系统错误，请联系管理员'
                }).then(() => {
                    this.$router.push('/cart')
                })
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
        initAddress(){
            let userId = this.$store.state.userId
            let url = '/convenience/api/v1/address/list'
            let formData = new FormData()
            formData.append('userId', userId);
            axios.post(url,formData).then((response) => {
                if(response.data.result.length == 0){
                    this.payAddressShow = true
                }else{
                    this.payAddressShow = false
                    this.payAddress = response.data.result
                    for(let i in this.payAddress){
                        if(this.payAddress[i].visible == true){
                            this.payAddress = this.payAddress[i]
                            break
                        }else{
                            this.payAddress = this.payAddress[0]
                            break
                        }
                    }
                }
            })
        },
        // 更新地址信息
        selectAdd(msg){
            this.payAddress = msg
            this.initAddress()
            this.addressBoxShow = false
        },
        // 地址弹窗显示
        addressBox(){
            this.addressBoxShow = true
        },
        // 优惠券状态
        initCoupon(){
            let url = '/convenience/api/v1/bmsc/couponperson/query'
            let formData = new FormData()
                formData.append('userId',this.$store.state.userId)
            axios.post(url,formData).then((response) => {
                if(response.data.length > 0){
                    this.couponText = `${response.data.length}个可用`
                }else{
                    this.couponText = '(暂无可用)'
                }
            })
        },
        // 优惠券弹窗显示
        couponBox(){
            this.couponBoxShow = true
        },
        // 选择优惠券
        selectCoupon(msg){
            this.coupon = msg
            this.couponPrice = msg.price
            this.couponText = `- ￥ ${parseFloat(this.couponPrice/100).toFixed(2)}`
            this.couponBoxShow = false
        },
        // 提交数据
        payShow(){
            // 处理地址是否为空
            if(this.payAddress.id == undefined){
                this.$toast('请先添加地址')
            }else{
                this.paymodeBoxShow = true
            }
        },
        // 提交数据
        onSubmit(boolean){
            if(boolean == true){
                // 处理优惠券是否为空
                let couponId = ''
                if(this.coupon.couponId == undefined){
                    couponId = 0
                }else{
                    couponId = this.coupon.couponId
                }
                // 添加商品数组
                let arr = []
                for (let i = 0; i < this.cartInfo.length; i++) {
                    arr.push(this.cartInfo[i].goodId)
                }
                // ajax
                let userId = this.$store.state.userId
                let url = '/convenience/api/v1/pay/toPayInit'
                let formData = new FormData()
                    formData.append('userId', userId)
                    formData.append('array', arr)
                    formData.append('couponId', couponId)
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
            }
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
                        _this.createOrder()
                    }else{     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        _this.$toast.fail('支付失败！')
                    }
                }
            )
        },
        // 创建订单
        createOrder(){
            let userId = this.$store.state.userId
            let goods= []
            for(let i in this.cartInfo){
                goods.push(this.cartInfo[i].goodId)
            }
            let url = '/convenience/api/v1/bmsc/order/create'
            let formData = new FormData()
                formData.append('couponId', this.coupon.id)
                formData.append('dispatchPrice', 0)
                formData.append('addressId', this.payAddress.id)
                formData.append('payMode', '')
                formData.append('userId', userId)
                formData.append('goodIds', goods)
            axios.post(url,formData).then((response) => {
                if(response.data.msg == 'OK'){
                    this.$router.push('/order')
                }else{
                    this.$toast.fail('创建订单失败请联系管理员！')
                }
            })
        }
    }
}
</script>            

<style lang="less" scoped>
.pay{
    background-color: #f3f3f3;
    padding-bottom: 60px;
    .pay-address{
        padding: 15px 10px 25px;
        background-color: #fff;
        background-image: url('../../../static/images/address-bg.png');
        background-position: bottom;
        background-repeat: repeat-x;
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
.address-box{
    width: 100%;
    height: 100%;
}
.coupon-box{
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
}
.van-submit-bar{
    bottom: 0;
}
</style>
