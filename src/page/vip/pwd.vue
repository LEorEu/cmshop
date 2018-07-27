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
                    <van-button slot="button" size="small" type="primary">验证码</van-button>
                </van-field>
            </van-cell-group>
        </div>
        <van-number-keyboard
            :show="show"
            @input="onInput"
            @delete="onDelete"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            phone: '',
            sms: '',
            focusNum: ''
        }
    },
    methods: {
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
            this.$toast(value);
            if(this.focusNum == '1'){
                this.phone += value
            }else if(this.focusNum == '2'){
                this.sms += value
            }
        },
        // 键盘删除
        onDelete() {
            this.$toast('delete');
            if(this.focusNum == '1'){
                this.phone = this.phone.slice(0, this.phone.length - 1)
            }else if(this.focusNum == '2'){
                this.sms = this.sms.slice(0, this.sms.length - 1)
            }
            
        }
    }
}
</script>
