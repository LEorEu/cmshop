<template>
    <div class="vip-pwd">
        <div class="tel-box">
            <van-cell-group>
                <van-field
                    v-model="phone"
                    readonly
                    type="number"
                    label="手机号"
                    placeholder="请输入您的手机号"
                    @blur="onBlur"
                    @click="onFocus(1)"
                />
                <van-field
                    v-model="sms"
                    readonly
                    center
                    label="验证码"
                    placeholder="请输入短信验证码"
                    @blur="onBlur"
                    @click="onFocus(2)"
                >
                    <van-button slot="button" size="small" type="primary" :disabled="isDisabled" @click="getSms">{{ time }}</van-button>
                </van-field>
                <van-field
                    v-model="pwd"
                    readonly
                    type="password"
                    label="重置密码"
                    placeholder="请输入6位数字密码"
                    @blur="onBlur"
                    @click="onFocus(3)"
                />
                <van-field
                    v-model="qrpwd"
                    readonly
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入密码"
                    @blur="onBlur"
                    @click="onFocus(4)"
                />
            </van-cell-group>
        </div>
        <div class="next">
            <van-button type="primary" class="next-btn" :disabled="nextDisabled" @click="nextPwd">下一步</van-button>
        </div>
        <van-number-keyboard
            :show="show"
            @input="onInput"
            @delete="onDelete"
        />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            show: false,
            phone: '',
            sms: '',
            pwd: '',
            qrpwd: '',
            focusNum: '',
            time: '验证码',
            isDisabled: false,
            nextDisabled: true
        }
    },
    watch: {
        'phone': 'listenStatus',
        'sms': 'listenStatus',
        'pwd': 'listenStatus',
        'qrpwd': 'listenStatus'
    },
    methods: {
        // 点击获取验证码
        getSms(){
            let url = '/convenience/api/v1/bmsc/user/phone'
            let userId = this.$store.state.userId
            let formData = new FormData()
                formData.append('id',userId)
                formData.append('mobilePhone', this.phone)
            axios.post(url,formData).then((response) => {
                if(response.data.msg == '手机号码正确'){
                    let url = '/convenience/api/v1/bmsc/card/message'
                    let formData = new FormData()
                        formData.append('userId',userId)
                        formData.append('mobilePhone', this.phone)
                    axios.post(url,formData).then((response) => {
                        if(response.data.msg == 'OK'){
                            this.$toast('发送验证码成功！')
                            this.daojishi()
                        }else{
                            this.$toast.fail('未知错误')
                        }
                    })
                }else{
                    this.$toast.fail('请填写正确的手机号码！')
                }
            })
        },
        // 倒计时
        daojishi(){
            let time = 60
            let interval = window.setInterval(function() {
                this.time = `${time}秒重发`
                this.isDisabled = true
                if ((time--) <= 0) {
                    this.time = `重新发送`
                    this.isDisabled = false
                    window.clearInterval(interval)
                }
            }.bind(this), 1000)
        },
        // 监听数据完整度
        listenStatus(){
            if(this.phone.length == 11 && this.sms.length == 4 && this.pwd.length == 6 && this.qrpwd.length == 6){
                console.log(this.pwd,this.qrpwd)
                if(this.pwd == this.qrpwd){
                    this.nextDisabled = false
                }
            }else{
                this.nextDisabled = true
            }
        },
        // 下一步跳转到修改密码
        nextPwd(){
            if(this.phone && this.sms){
                let url = '/convenience/api/v1/bmsc/card/modify'
                let userId = this.$store.state.userId
                let formData = new FormData()
                    formData.append('userId',userId)
                    formData.append('verification', this.sms)
                    formData.append('password', this.pwd)
                axios.post(url,formData).then((response) => {
                    if(response.data.status == 200){
                        this.$router.push('/vip/successPwd')
                    }else if(response.data.status == 50){
                        this.$toast.fail('请填写正确信息！')
                    }else{
                        this.$toast.fail('系统错误')
                    }
                })
            }else{
                this.$toast.fail('请填写正确信息！')
            }
        },
        // 获取输入框焦点
        onFocus(num){
            this.show = true
            this.focusNum = num
        },
        // 隐藏键盘
        onBlur(){
            this.show = false
        },
        // 点击键盘
        onInput(value) {
            if(this.focusNum == '1'){
                if(this.phone.length < 11){
                    this.phone += value
                }
            }else if(this.focusNum == '2'){
                if(this.sms.length < 4){
                    this.sms += value
                }
            }else if(this.focusNum == '3'){
                if(this.pwd.length < 6){
                    this.pwd += value
                }
            }else if(this.focusNum == '4'){
                if(this.qrpwd.length < 6){
                    this.qrpwd += value
                }
            }
        },
        // 键盘删除
        onDelete() {
            if(this.focusNum == '1'){
                this.phone = this.phone.slice(0, this.phone.length - 1)
            }else if(this.focusNum == '2'){
                this.sms = this.sms.slice(0, this.sms.length - 1)
            }else if(this.focusNum == '3'){
                this.pwd = this.pwd.slice(0, this.pwd.length - 1)
            }else if(this.focusNum == '4'){
                this.qrpwd = this.qrpwd.slice(0, this.qrpwd.length - 1)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.next{
    padding: 60px 0;
    text-align: center;
    .next-btn{
        width: 90%;
        height: 40px;
        border: 0;
        border-radius: 20px;
        font-size: 16px;
        color: #fff;
    }
}
.van-button{
    padding: 0 20px;
    background-color: #ff8334;
    border: 1px solid #ff8334;
    border-radius: 20px;
}
.van-button--disabled{
    background-color: #eaeaea;
    border: 1px solid #eaeaea;
}
</style>
