<template>
    <div class="recharge">
        <div class="recharge-banner">
            <img src="../../../static/images/vip-banner.jpg" alt="">
        </div>
        <div class="recharge-over">
            <h2 class="over">{{ over/100 }} <p>元</p></h2>
            <span>账户余额</span>
            <router-link class="pwd" to="/vip/pwd" v-show="vipStatus">修改密码</router-link>
        </div>
        <div class="recharge-main">
            <div class="recharge-list">
                <ul class="card-list clearfix">
                    <li class="cart-item fl-l" :class="{ 'focus' : card.id == focusId }" v-for="(card, index) in cardList" :key="index" @click="cardFocus(card.id,card.discount)">
                        <h2>{{ card.denomination/100 }}元</h2>
                        <span>售价：{{ card.discount/100 }}元</span>
                    </li>
                </ul>
            </div>
            <div class="recharge-btns">
                <button class="submit-btn" :disabled="disabled" :class="{ 'disable' : disabled }" @click="onSubmit(focusId)">立即充值</button>
                <span class="submit-tips">点击立即充值代表您已阅读并同意<router-link to="/vip/tips">《购卡须知》</router-link> </span>
            </div>
            <div class="recharge-tips">
                <h2>温馨提示：</h2>
                <p>1.账户余额可以购买本平台的任何商品；</p>
                <p>2.一旦充值成功，将不能退款；</p>
                <p>3.若充值长时间未到账，请及时联系客服：0355-624152；</p>
            </div>
        </div>
        <van-popup v-model="show" position="bottom">
            <set-pwd></set-pwd>
        </van-popup>
        <shop-footer></shop-footer>
    </div>
</template>

<script>
import axios from 'axios'

import setPwd from '../../components/common/setPwd'
import shopFooter from '../../components/footer/footer'

export default {
    components: {
        'shop-footer': shopFooter,
        'set-pwd': setPwd
    },
    data(){
        return{
            over: '',           //会员卡余额
            vipStatus: false,   //会员卡状态
            cardList: [],       //会员卡充值价格列表
            focusId: '',        //焦点充值卡ID
            disabled: true,    //submit控制
            show: true          //设置密码弹窗
        }
    },
    mounted(){
        this.getCardList()
    },
    methods:{
        // 获取会员卡充值价格列表
        getCardList(){
            let url = '/convenience/api/v1/bmsc/recharge/list'
            let userId = this.$store.state.userId
            let formData = new FormData()
                formData.append('userId',userId)
            axios.post(url,formData).then((response) => {
                this.cardList = response.data.result
                if(response.data.list[0] == null){
                    this.over = '0'
                }else{
                    this.over = response.data.list[0].balance
                    this.vipStatus = true
                }
            })
        },
        // 提交数据
        onSubmit(id){
            let userId = this.$store.state.userId
            let url = '/convenience/api/v1/pay/toPayInit2'
            let formData = new FormData()
                formData.append('userId',userId)
                formData.append('id', this.focusId)
            axios.post(url,formData).then((response) => {
                let data = response.data
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
                    }
                }else{
                    this.onBridgeReady(data,id)
                }
            })
        },
        //调用微信支付页面
        onBridgeReady(data,id) {
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
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        _this.cardRecharge(id)
                    }else{     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        _this.$toast.fail('支付失败！')
                    }
                }
            )
        },
        //充值
        cardRecharge(id){
            let url = '/convenience/api/v1/bmsc/card/recharge'
            let userId = this.$store.state.userId
            let formData = new FormData()
                formData.append('id',id)
                formData.append('userId',userId)
            axios.post(url,formData).then((response) => {
                console.log(response)
                if(response.data.status == 200){
                    this.$toast.success('充值成功！')
                    this.getCardList()
                }else{
                    this.$toast.fail('充值失败！请联系客服')
                }
            })
        },
        // 焦点切换
        cardFocus(id){
            this.focusId = id
            this.disabled = false
        },
    }
}
</script>

<style lang="less" scoped>
.recharge{
    background-color: #f3f3f3;
    .recharge-over{
        position: relative;
        margin-top: 5px;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        .over{
            margin-top: 5px;
            text-align: center;
            font-size: 30px;
            color: #ff8235;
            p{
                display: inline-block;
                font-size: 14px;
            }
        }
        span{
            display: block;
            margin-top: 5px;
            text-align: center;
            font-size: 14px;
            color: #333;
        }
        .pwd{
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 14px;
            color: #666;
        }
    }
    .recharge-main{
        padding: 10px;
        margin-top: 5px;
        background-color: #fff;
        .recharge-list{
            padding-top: 10px;
            .cart-item{
                padding: 12px 10px;
                margin-bottom: 10px;
                margin-right: 10px;
                width: calc((100% - 20px) /3 );
                border: 1px solid #dedede;
                border-radius: 5px;
                h2{
                    text-align: center;
                    font-size: 22px;
                    color: #333;
                }
                span{
                    display: block;
                    margin-top: 3px;
                    text-align: center;
                    font-size: 14px;
                    color: #666;
                }
            }
            .focus{
                border: 1px solid #ff8532;
                box-shadow: inset 0px 0px 0px 1px #ff8532;
                h2{
                    color: #ff8532;
                }
            }
            .cart-item:nth-child(3n){
                margin-right: 0;
            }
        }
        .recharge-btns{
            margin: 20px 0;
            text-align: center;
            .submit-btn{
                width: 80%;
                height: 40px;
                font-size: 16px;
                font-weight: bold;
                background: linear-gradient(to right, #ff2b57 , #ff7749);
                border: 0;
                border-radius: 20px;
                color: #fff;
            }
            .disable{
                background: #999;
            }
            .submit-tips{
                margin-top: 5px;
                display: block;
                font-size: 12px;
                color: #666;
                a{
                    color: #456cff;
                }
            }
        }
        .recharge-tips{
            padding-top: 20px;
            border-top: 1px solid #e3e3e3;
            h2{
                margin-bottom: 10px;
                font-size: 16px;
                color: #333;
            }
            p{
                margin-bottom: 5px;
                font-size: 12px;
                color: #666;
            }
        }
    }
}
</style>
