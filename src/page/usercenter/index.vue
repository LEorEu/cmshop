<template>
    <div class="usercenter">
        <div class="ucenter-header">
            <div class="my-header-main">
                <div class="my-header-avatar">
                    <router-link class="my-header-avatar-img" to="/ucenter/setting">
                        <img :src="userInfo.headImage" alt="">
                    </router-link>
                </div>
                <div class="my-header-msg">
                    <h3 class="my-name">{{ userInfo.nickName }}</h3>
                    <span class="status-info"></span>
                </div>
                <!-- <router-link class="my-header-settings" to="/ucenter/setting">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shezhi"></use>
                    </svg>
                </router-link> -->
            </div>
            <div class="my-header-features flex">
                <router-link class="my-header-collection item-features" to="/vip">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huiyuanqia"></use>
                    </svg>
                    <p>我的会员</p>
                </router-link>
                <router-link class="my-header-coupon item-features" to="/coupon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youhuiquan"></use>
                    </svg>
                    <p>优惠券</p>
                </router-link>
            </div>
        </div>
        <div class="ucenter-main">
            <van-cell-group class="order-main">
                <van-cell class="my-order my-cate-item" title="我的订单" to="/order" is-link />
                <div class="order-nav flex">
                    <router-link to="/order" class="my-order-entrances">
                        <svg class="icon" id="order" aria-hidden="true">
                            <use xlink:href="#icon-order"></use>
                        </svg>
                        <p>全部订单</p>
                    </router-link>
                    <router-link to="/order/sendItem" class="my-order-entrances">
                        <svg class="icon" id="sendItem" aria-hidden="true">
                            <use xlink:href="#icon-z-clothes"></use>
                        </svg>
                        <p>待发货</p>
                    </router-link>
                    <router-link to="/order/acceptItem" class="my-order-entrances">
                        <svg class="icon" id="acceptItem" aria-hidden="true">
                            <use xlink:href="#icon-truckfuzhi"></use>
                        </svg>
                        <p>待收货</p>
                    </router-link>
                    <router-link to="/order/commentItem" class="my-order-entrances">
                        <svg class="icon" id="commentItem" aria-hidden="true">
                            <use xlink:href="#icon-pingjia"></use>
                        </svg>
                        <p>待评价</p>
                    </router-link>
                </div>
            </van-cell-group>

            <van-cell-group class="my-cate">
                <van-cell class="my-over my-cate-item" title="我的余额" value="￥0" />
                <!-- <van-cell class="my-vip my-cate-item" title="我的会员" to="/vip" is-link /> -->
                <van-cell class="my-address my-cate-item" title="地址管理" to="/ucenter/address" is-link />
                <van-cell class="feedback my-cate-item" title="意见反馈" is-link @click="feedback()" />
                <van-cell class="about-us my-cate-item" title="关于我们" @click="aboutUs()" />
            </van-cell-group>
        </div>
        <van-actionsheet v-model="feedbackShow" title="意见反馈">
            <van-cell-group>
                <van-field
                    v-model="message"
                    label="留言"
                    type="textarea"
                    placeholder="请输入留言"
                    rows="1"
                    autosize
                />
            </van-cell-group>
        </van-actionsheet>
        <shop-footer></shop-footer>
    </div>
</template>

<script>
import axios from 'axios'

import shopFooter from '../../components/footer/footer'

export default {
    components: {
        'shop-footer': shopFooter
    },
    data(){
        return{
            userInfo: '',    //个人信息数据
            feedbackText: '',
            feedbackShow: false,
            message: ''
        }
    },
    mounted(){
        // 获取个人信息
        this.getUserInfo()
    },
    methods:{
        // 获取个人信息
        getUserInfo(){
            let userId = this.$store.state.userId
            let url = '/convenience/api/v1/bmsc/user/query'
            let formData = new FormData()
                formData.append('id', userId)
            axios.post(url,formData).then((response) => {
                this.userInfo = response.data.result
            })
        },
        feedback(){
            this.feedbackShow = true
        },
        aboutUs(){
            window.location.href = 'http://xy.czzhdc.com/cmweb/#/marketdetails'
        }
    }
}
</script>

<style lang="less" scoped>
.usercenter{
    background-color: #f3f3f3;
    .ucenter-header{
        width: 100%;
        background-image: url('../../../static/images/usercenter-bg.jpg');
        background-size: 100%;
        background-repeat: repeat-y;
        .my-header-main{
            position: relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            padding: 25px 15px;
            .my-header-avatar{
                position: relative;
                margin-right: 10px;
                width: 60px;
                height: 60px;
                border: 1px solid hsla(0,0%,100%,.4);
                border-radius: 60px;
                box-shadow: 0 2px 10px rgba(0,0,0,.15);
                .my-header-avatar-img{
                    display: block;
                    overflow: hidden;
                    border-radius: 60px;
                    padding-top: 100%;
                    img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 60px;
                    }
                }
            }
            .my-header-msg{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                min-width: 0;
                .my-name{
                    margin-top: 10px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #fff;
                }
                .status-info{
                    display: block;
                    margin-top: 5px;
                    width: 74px;
                    height: 18px;
                    background-image: url('../../../static/images/icon-usercenter-vip.png');
                    background-position: center;
                    background-size: 100%;
                }
            }
            .my-header-settings{
                position: absolute;
                top: 15px;
                right: 15px;
                .icon{
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .my-header-features{
            background-color: rgba(255,255,255,.2);
            .item-features{
                display: flex;
                margin: 10px 0px;
                width:50%;
                justify-content:center;
                .icon{
                    font-size: 26px;
                    color: #fff;
                }
                p{
                    margin-top: 3px;
                    margin-left: 5px;
                    font-size: 14px;
                    color: #fff;
                }
            }
            .my-header-collection{
                border-right: 1px solid #ffc2b1;
            }
            .my-header-coupon{
                border-left: 1px solid #ffc2b1;
            }
        }
    }
    .ucenter-main{
        .order-main{
                .my-order-entrances{
                    padding: 10px 0;
                    width: 25%;
                    text-align: center;
                    .icon{
                        height: 20px;
                        font-size: 24px;
                        color: #999;
                    }
                    p{
                        margin-top: 5px;
                        text-align: center;
                        font-size: 12px;
                        color: #333;
                    }
                    #order{
                        font-size: 20px;
                    }
                    #commentItem{
                        font-size: 26px;
                    }
                }
        }
        .my-cate{
            margin-top: 10px;
        }
    }
}
</style>
