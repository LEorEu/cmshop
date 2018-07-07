<template>
    <div class="address">
        <h2 class="address-title">地址管理</h2>
        <div class="van-address-list">
            <ul class="van-cell-group van-hairline--top-bottom">
                <li class="van-cell van-cell--clickable van-hairline" v-for="(item, index) in items" :key="index">
                    <div class="van-cell__value van-cell__value--alone">
                        <div class="van-radio">
                            <div class="van-radio__label">
                                <div class="van-address-list__name">{{ item.userName }}&nbsp;&nbsp;{{ item.mobilePhone }}</div>
                                <div class="van-address-list__address">收货地址：{{ item.address }}</div>
                            </div>
                        </div>
                    </div>
                    <van-tag class="focus" v-if="item.visible == true">默认</van-tag>
                    <van-icon class="van-address-list__edit" name="edit" @click="showEdit(item)" />
                </li>
            </ul>
        </div>
        <div class="address-add">
            <a class="add-btn" @click="addShow = true">新增收货地址</a>
        </div>
        <!-- 编辑收货地址 -->
        <van-popup class="edit-box" v-model="editShow" position="right" :overlay="false">
            <div class="address-box">
                <van-cell-group>
                    <van-field
                        v-model="formDataEdit.userName"
                        clearable
                        label="收货人"
                        placeholder="请输入姓名"
                    />
                    <van-field
                        v-model="formDataEdit.mobilePhone"
                        clearable
                        label="联系方式"
                        placeholder="请输入手机号码"
                    />
                    <van-field
                        v-model="formDataEdit.address"
                        clearable
                        label="详细地址"
                        placeholder="详细地址需填写楼栋楼层或房间号信息"
                    />
                    <van-cell-group>
                        <van-switch-cell v-model="formDataEdit.visible" title="设为默认地址" />
                    </van-cell-group>
                </van-cell-group>
                <div class="mod_btns">
                    <van-button class="update-btn" size="large" @click="updateAddress()">确认</van-button>
                </div>
                <div class="mod_btns">
                    <van-button class="delete-btn" size="large" @click="deleteAddress()">删除收货地址</van-button>
                </div>
            </div>
        </van-popup>
        <!-- 新增收货地址 -->
        <van-popup class="add-box" v-model="addShow" position="bottom" :overlay="false">
            <van-cell-group>
                <van-field
                    v-model="formDataAdd.userName"
                    clearable
                    label="收货人"
                    placeholder="请输入姓名"
                />
                <van-field
                    v-model="formDataAdd.mobilePhone"
                    clearable
                    label="联系方式"
                    placeholder="请输入手机号码"
                />
                <van-field
                    v-model="formDataAdd.address"
                    clearable
                    label="详细地址"
                    placeholder="详细地址需填写楼栋楼层或房间号信息"
                />
                <van-cell-group>
                    <van-switch-cell v-model="formDataAdd.visible" title="设为默认地址" />
                </van-cell-group>
            </van-cell-group>
            <div class="mod_btns">
                <van-button class="save-btn" size="large" @click="saveAddress()">确认</van-button>
            </div>
            <div class="mod_btns">
                <van-button class="delete-btn" size="large" @click="addShow = false">返回</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            editShow: false,    //编辑地址弹窗
            addShow: false,     //新增地址弹窗
            items: '',          //后台地址列表数据
            formDataAdd: {
                userName: '',
                mobilePhone: '',
                address: '',
                visible: false
            },    //新增地址
            formDataEdit: {
                userName: '',
                mobilePhone: '',
                address: '',
                visible: ''
            },    //编辑地址
        }
    },
    mounted(){
        this.getAddressList()
    },
    methods:{
        // 获取地址列表
        getAddressList(){
            let url = '/convenience/api/v1/address/list'
            let formData = new FormData()
            formData.append('userId', this.$store.state.userId);
            axios.post(url,formData).then((response) => {
                this.items = response.data.result
            })
        },
        // 编辑地址弹窗显示
        showEdit(obj){
            this.editShow = true
            this.formDataEdit = obj
        },
        // 新增地址
        saveAddress(){
            if(this.formDataAdd.userName && this.formDataAdd.mobilePhone && this.formDataAdd.address){
                let url = '/convenience/api/v1/address/update'
                let formData = new FormData()
                formData.append('id', '')
                formData.append('userId', this.$store.state.userId)
                formData.append('userName', this.formDataAdd.userName)
                formData.append('mobilePhone', this.formDataAdd.mobilePhone)
                formData.append('address', this.formDataAdd.address)
                formData.append('visible', this.formDataAdd.visible)
                axios.post(url,formData).then((response) => {
                    if(response.data.status == 200){
                        this.$toast('新增成功')
                        this.getAddressList()
                        this.addShow = false
                    }else{
                        this.$toast('网络错误')
                    }
                })
            }else{
                this.$toast('请输入完整的地址信息')
            }
        },
        // 更新地址
        updateAddress(){
            if(this.formDataEdit.userName && this.formDataEdit.mobilePhone && this.formDataEdit.address){
                let url = '/convenience/api/v1/address/update'
                let formData = new FormData()
                formData.append('id', this.formDataEdit.id)
                formData.append('userId', this.$store.state.userId)
                formData.append('userName', this.formDataEdit.userName)
                formData.append('mobilePhone', this.formDataEdit.mobilePhone)
                formData.append('address', this.formDataEdit.address)
                formData.append('visible', this.formDataEdit.visible)
                axios.post(url,formData).then((response) => {
                    if(response.data.status == 200){
                        this.$toast('保存成功')
                        this.getAddressList()
                        this.editShow = false
                    }else{
                        this.$toast('网络错误')
                    }
                })
            }else{
                this.$toast('请输入完整的地址信息')
            }
        },
        // 删除地址
        deleteAddress(){
            this.$dialog.confirm({
                message: '确认删除该地址吗?'
            }).then(() => {
                let url = '/convenience/api/v1/address/deleteById'
                let formData = new FormData()
                formData.append('addressId', this.formDataEdit.id);
                axios.post(url,formData).then((response) => {
                    if(response.data.status == 200){
                        this.$toast(response.data.msg)
                        this.getAddressList()
                        this.editShow = false
                    }else{
                        this.$toast('网络错误')
                    }
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
.address{
    padding-bottom: 60px;
    background-color: #f8f8f8;
    .address-title{
        padding: 10px 15px;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        color: rgba(69,90,100,.6);
    }
    .focus{
        position: absolute;
        top: 30px;
        left: 10px;
    }
    .edit-box{
        width: 100%;
        height: 100%;
    }
    .add-box{
        width: 100%;
        height: 100%;
    }
    .mod_btns{
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        overflow: hidden;
        margin: 20px 10px;
        .save-btn{
            background-color: #ff8334;
            border: 0;
            color: #fff;
        }
        .update-btn{
            background-color: #ff8334;
            border: 0;
            color: #fff;
        }
        .delete-btn{
            background-color: #f3f3f3;
            border: 0;
            color: #333;
        }
    }
}
.address-add{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 540px;
    margin: 0 auto;
    background-color: #fff;
    z-index: 101;
    .add-btn{
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: 16px;
        position: relative;
        background: #ff8334;
        color: #fff;
    }
}
.van-address-list{
    .van-cell{
        padding: 20px 15px;
    }
}
.van-address-list .van-radio__label {
    margin-left: 40px;
}
</style>
