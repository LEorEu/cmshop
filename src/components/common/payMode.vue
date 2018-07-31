<template>
    <div class="pay-mode">
        <div class="pay-mode-box" v-show="show">
            <div class="pay-mode-header">
                <van-icon name="arrow-left" @click="payBoxShow()" />
                <h2>{{ title }}</h2>
            </div>

            <div v-show="!showKeyboard">
                <div class="pay-amount">
                    <h3>支付金额：<i>￥</i><span> {{ parseFloat(amount/100).toFixed(2) }}</span></h3>
                </div>
                <div class="pay-mode-select">
                    <van-radio-group v-model="payMode">
                        <van-cell-group>
                            <van-cell title="微信支付" icon="wechat" clickable @click="payMode = '1'">
                                <van-radio name="1" />
                            </van-cell>
                            <van-cell title="会员卡支付" icon="credit-pay" clickable @click="payMode = '2'">
                                <p class="balance">(余额：<i>￥ {{ parseFloat(vipAmount/100).toFixed(2) }}</i>)</p>
                                <van-radio name="2" />
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </div>
                <div class="next">
                    <van-button type="primary" class="next-btn" @click="next()">下一步</van-button>
                </div>
            </div>

            <!-- VIP购买 -->
            <div class="vip-mode" v-show="showKeyboard">
                <div class="pay-mode-content">
                    <!-- 密码输入框 -->
                    <van-password-input
                    :value="pwd"
                    />
                    <div class="pay-mode-tips">{{ tips }}</div>
                </div>
                <div class="pay-mode-keyboard">
                    <!-- 数字键盘 -->
                    <van-number-keyboard
                    @input="onInput"
                    @delete="onDelete"
                    v-show="showKeyboard"
                    />
                </div>
            </div>
        </div>
        <success-pay v-show="!show"></success-pay>
    </div>            
</template>

<script>
import axios from 'axios'

import successVipPay from './successVipPay'

export default {
    props: ['childTotal'],
    components: {
        'success-pay': successVipPay
    },
    data() {
        return {
            title: '支付方式',
            amount: this.childTotal,
            vipAmount: 99999,
            payMode: '1',
            pwd: '',
            showKeyboard: false,
            tips: '',
            show: true
        }
    },
    watch: {
        // 监听数据完整度
        pwd(val){
            if(this.pwd.length == 6){
                this.showKeyboard = false
                this.show = false
                this.$emit('childMaskTo',true)
            }
        },
        // 监听总价变化
        childTotal(val){
            this.amount = val
        },
    },
    methods: {
        // 下一步
        next(){
            if(this.payMode == '1'){
                this.$emit('wxPay',true)
            }else if(this.payMode == '2'){
                this.title = '请输入支付密码'
                this.showKeyboard = true
            }
        },
        // 弹窗显示及返回
        payBoxShow(){
            if(!this.showKeyboard){
                this.$emit('close',true)
            }else{
                this.showKeyboard = false
                this.pwd = ''
            }
        },
        // 点击键盘
        onInput(key) {
            this.pwd += key
        },
        // 键盘删除
        onDelete() {
            this.pwd = this.pwd.slice(0, this.pwd.length - 1)
        }
    }
}
</script>

<style lang="less" scoped>
.pay-mode{
    height: 375px;
    .pay-mode-box{
        position: relative;
        background-color: #fff;
        .pay-mode-header{
            position: relative;
            padding: 15px;
            border-bottom: 1px solid #e5e5e5;
            .van-icon{
                position: absolute;
                top: 15px;
                left: 15px;
                font-size: 20px;
                color: #666;
            }
            h2{
                text-align: center;
                font-size: 16px;
                color: #333;
            }
        }
        .pay-amount{
            h3{
                padding: 25px 0;
                text-align: center;
                font-size: 16px;
                font-weight: normal;
                color: #333;
                i{
                    color: #ff8334;
                }
                span{
                    font-size: 24px;
                    font-weight: bold;
                    color: #ff8334;
                }
            }
        }
        .pay-mode-select{
            .balance{
                position: absolute;
                left: 0;
                top: 5px;
                display: inline-block;
                letter-spacing: 0px;
                font-size: 12px;
                color: #333;
                i{
                    font-size: 14px;
                    color: #ff8334;
                }
            }
        }
        .next{
            margin: 30px 0px;
            text-align: center;
            .van-button{
                padding: 0 20px;
                width: 90%;
                background-color: #ff8334;
                border: 1px solid #ff8334;
                border-radius: 20px;
            }
        }
        .vip-mode{
            .pay-mode-content{
                padding-top: 25px;
                .pay-mode-tips{
                    padding-left: 30px;
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    color: #ff5155;
                }
            }
            .pay-mode-keyboard{
                width: 100%;
                height: 216px;
                text-align: center;
                background-color: #fff;
            }
        }
    }
}
.van-cell{
    padding: 20px;
    width: auto;
    height: 70px;
}
</style>
