<template>
    <div class="set-pwd">
        <div class="set-pwd-box">
            <div class="set-pwd-header">
                <van-icon name="close" @click="pwdBoxShow()" v-show="btnShow(1)" />
                <van-icon name="arrow-left" @click="pwdBoxReturn()" v-show="btnShow(2)" />
                <h2>{{ title }}</h2>
            </div>
            <div class="set-pwd-content">
                <!-- 密码输入框 -->
                <van-password-input
                :value="pwd"
                v-show="onShow1"
                />
                <!-- 密码确认框 -->
                <van-password-input
                :value="qrpwd"
                v-show="onShow2"
                />
                <!-- 绑定手机号 -->
                <van-field
                v-model="tel"
                readonly
                v-show="onShow3"
                type="number"
                label="手机号："
                placeholder="请输入您的手机号"
                />
                <div class="set-pwd-tips">{{ tips }}</div>
            </div>
        </div>
        <div class="set-pwd-keyboard">
            <van-button type="primary" class="next-btn" @click="next(1)" v-show="onShow1">下一步</van-button>
            <van-button type="primary" class="next-btn" @click="next(2)" v-show="onShow2">下一步</van-button>
            <van-button type="primary" class="next-btn" @click="next(3)" v-show="onShow3">下一步</van-button>
            <!-- 数字键盘 -->
            <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: '请设置支付密码',
            focusNum: '1',
            pwd: '',
            qrpwd: '',
            tel: '',
            onShow1: true,
            onShow2: false,
            onShow3: false,
            showKeyboard: true,
            tips: ''
        }
    },
    watch: {
        // 监听数据完整度
        pwd(val){
            if(this.pwd.length == 6){
                this.showKeyboard = false
            }
        },
        qrpwd(val){
            if(this.qrpwd.length == 6){
                if(this.qrpwd == this.pwd){
                    this.showKeyboard = false
                }else{
                    this.tips = '与首次设置的密码不同'
                }
            }
        },
        tel(val){
            if(this.tel.length == 11){
                this.showKeyboard = false
            }
        }
    },
    mounted(){

    },
    methods: {
        // 返回按钮显示
        btnShow(){
            return false
        },
        // 下一步
        next(num){
            if(num == 1){
                this.onShow1 = false
                this.onShow2 = true
                this.showKeyboard = true
                this.focusNum = '2'
                this.title = '请再次输入密码'
            }else if(num == 2){
                this.onShow2 = false
                this.onShow3 = true
                this.showKeyboard = true
                this.focusNum = '3'
                this.tips = '注：为了您账户的安全，请绑定您的手机号'
                this.title = '绑定手机号'
            }else if(3){
                this.$dialog.confirm({
                    title: '提示',
                    message: `请检查您的手机号${this.tel}无误后点击确认`
                }).then(() => {
                    this.addTel()
                }).catch(() => {
                    this.showKeyboard = true    
                    this.focusNum = '3'
                })
            }
        },
        // 添加手机号
        addTel(){
            let url = '/convenience/api/v1/bmsc/card/add'
            let data = {
                'userId': this.$store.state.userId,
                'mobilePhone': this.tel
            }
            axios.post(url,data).then((response) => {
                if(response.data.status == 200){
                    let url = '/convenience/api/v1/bmsc/card/setPassword'
                    let data = {
                        'userId': this.$store.state.userId,
                        'password': this.pwd
                    }
                    axios.post(url,data).then((response) => {
                        if(response.data.status == 200){
                            this.$emit('childPay',true)
                        }else{
                            this.$toast.fail('绑定手机号失败')
                        }
                    })
                }else{
                    this.$toast.fail('绑定手机号失败')
                }
            })
        },
        // 点击键盘
        onInput(key) {
            if(this.focusNum == '1'){
                this.pwd += key
            }else if(this.focusNum == '2'){
                this.qrpwd += key
            }else if(this.focusNum == '3'){
                if(this.tel.length < 11){
                    this.tel += key
                }
            }
        },
        // 键盘删除
        onDelete() {
            if(this.focusNum == '1'){
                this.pwd = this.pwd.slice(0, this.pwd.length - 1)
            }else if(this.focusNum == '2'){
                this.qrpwd = this.qrpwd.slice(0, this.qrpwd.length - 1)
                this.tips = ''
            }else if(this.focusNum == '3'){
                this.tel = this.tel.slice(0, this.tel.length - 1)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.set-pwd{
    .set-pwd-box{
        position: relative;
        top: -216px;
        background-color: #fff;
        .set-pwd-header{
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
        .set-pwd-content{
            padding-top: 25px;
            .set-pwd-tips{
                padding-left: 30px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #ff5155;
            }
        }
    }

    .set-pwd-keyboard{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 216px;
        text-align: center;
        background-color: #fff;
        .next-btn{
            width: 90%;
            height: 40px;
            border: 0;
            border-radius: 20px;
            font-size: 16px;
            color: #fff;
        }
    }
}
.van-button{
    padding: 0 20px;
    background-color: #ff8334;
    border: 1px solid #ff8334;
    border-radius: 20px;
}
.van-password-input{
    top: 0;
}
.van-cell{
    margin: 0 15px;
    padding: 0;
    width: auto;
    height: 50px;
}
.van-dialog__message--has-title{
    text-align: center;
}
</style>
