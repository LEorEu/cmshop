<template>
    <div class="details">
        <div class="goods-silder">
            <van-swipe :autoplay="3000">
                <van-swipe-item>
                    <!-- 开发环境下需执行testImgUrl方法 -->
                    <!-- <img :src="testImgUrl(img.replace(/\\/g,'/'))" /> -->
                    <img src="../../../static/images/goods-test-img.jpg" />
                </van-swipe-item>
            </van-swipe>
            <div class="other-btn">
                <div class="collection-btn">
                    <van-icon name="like-o" />
                </div>
            </div>
        </div>
        <div class="goods-main">
            <div class="goods-buy flex">
                <div class="buy-info">
                    <div class="module-wrap clearfix">
                        <div class="price fl-l">
                            <span>￥</span>{{ parseFloat(details.price/100).toFixed(2) }}<i> /{{ utils.unitConvert(details.unit) }}</i>
                        </div>
                        <div class="sales fl-l">
                            <p>销量：{{ details.sales }}</p>
                        </div>
                    </div>
                    <div class="module-wrap clearfix">
                        <h2 class="title fl-l">{{ details.goodName }}</h2>
                        <!-- <span class="desc fl-l">(1斤约20个)</span> -->
                    </div>
                </div>
                <div class="number-wrap">
                    <van-stepper v-model="number" :min="0" :default-value="0"/>
                </div>
            </div>
            <div class="goods-service">
                <div class="transfer-time service-item clearfix">
                    <p class="title fl-l">时间</p>
                    <div class="desc fl-l">
                        <p>现在下单，预计一小时到达</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="transfer-service service-item clearfix">
                    <p class="title fl-l">服务</p>
                    <div class="desc fl-l">
                        <p><i class="icon-duihao"></i><span>免运费</span></p>
                        <p><i class="icon-duihao"></i><span>10:00 - 21:00 可配送</span></p>
                    </div>
                </div>
            </div>
            <div class="goods-info">
                <div class="goods-info-nav flex">
                    <div class="nav-item" :class="{ 'focus' : showFocus }" @click="tabNav(0)">
                        <p>图文详情</p>
                    </div>
                    <div class="nav-item" :class="{ 'focus' : !showFocus }" @click="tabNav(1)">
                        <p>评价(0)</p>
                    </div>
                </div>
                <div class="goods-details"></div>
                <div class="goods-evaluation"></div>
            </div>
        </div>
        <footer-cart></footer-cart>
    </div>
</template>

<script>
import axios from 'axios'

import footerCart from '../../components/footer/footerCart'

export default {
    components: {
        'footer-cart': footerCart
    },
    data(){
        return{
            details: '',          //商品详情
            number: '',         //计算器
            showFocus: true,    //标签切换焦点
        }
    },
    mounted(){
        // 获取商品详情
        this.getGoodsInfo()
    },
    methods:{
        // 切换详情评价
        tabNav(index){
            if( index == 1 ){
                this.showFocus = false
            }else if( index == 0 ){
                this.showFocus = true
            }
        },
        // 获取商品详情
        getGoodsInfo(){
            let url = '/convenience/api/v1/address/queryGood'
            const goodId = this.$route.query.id
            let formData = new FormData()
                formData.append('goodId',goodId)
            axios.post(url,formData).then((response) => {
               this.details = response.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
.details{
    padding-bottom: 70px;
    background-color: #f3f3f3;
    .goods-silder{
        position: relative;
        width: 100%;
        height: 135px;
        .van-swipe{
            height: 135px;
            .van-swipe-item{
                max-height: 135px;
                text-align: center;
                font-size: 18px;
                background: #fff;
                display: -webkit-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                align-items: center;
            }
        }
        .other-btn{
            position: absolute;
            top: 5px;
            right: 10px;
            .collection-btn{
                width: 32px;
                height: 32px;
                background-color: rgba(0, 0, 0, .7);
                text-align: center;
                border-radius: 100%;
                .van-icon{
                    line-height: 34px;
                    font-size: 18px;
                    color: #fff;
                }
            }
        }
    }
    .goods-main{
        width: 100%;
        .goods-buy{
            padding: 10px;
            background-color: #fff;
            .buy-info{
                width: calc(100% - 100px);
                .module-wrap{
                    margin-bottom: 3px;
                    .price{
                        font-size: 22px;
                        font-weight: bold;
                        line-height: 24px;
                        color: #ff8334;
                        span{
                            font-size: 14px;
                            font-weight: normal;
                        }
                        i{
                            font-size: 14px;
                            font-weight: normal;
                            color: #828282;
                        }
                    }
                    .sales{
                        margin-left: 10px;
                        p{
                            margin-top: 4px;
                            font-size: 14px;
                            color: #333;
                        }
                    }
                    .title{
                        margin-right: 5px;
                        font-size: 16px;
                        font-weight: 500;
                        color: #333;
                    }
                    .desc{
                        margin-top: 2px;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .number-wrap{
                width: 100px;
                display: flex;
                justify-content:center;
                align-items:Center;
            }
        }
        .goods-service{
            margin-top: 10px;
            padding: 10px;
            background-color: #fff;
            .service-item{
                .title{
                    font-size: 14px;
                    color: #666;
                }
                .desc{
                    margin-left: 15px;
                    p{
                        position: relative;
                        padding-left: 20px;
                        margin-right: 20px;
                        display: inline-block;
                        font-size: 14px;
                        line-height: 22px;
                        color: #333;
                        .icon-duihao{
                            position: absolute;
                            top: 4px;
                            left: 0px;
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            background-image: url('../../../static/images/icon-duihao.png');
                            background-position: center;
                            background-size: 100%;
                        }
                    }
                }
            }
            .transfer-time{
                .desc{
                    p{
                        padding-left: 0px;
                    }
                }
            }
            .line{
                margin: 8px 0;
                width: 100%;
                height: 1px;
                background-color: #f6f6f6;
            }
        }
        .goods-info{
            margin-top: 10px;
            padding: 10px;
            background-color: #fff;
            .goods-info-nav{
                border-bottom: 2px solid #f6f6f6;
                .nav-item{
                    position: relative;
                    top: 2px;
                    width: 40%;
                    margin: 0 5%;
                    padding-bottom: 5px;
                    p{
                        font-size: 16px;
                        text-align: center;
                        color: #333;
                    }
                }
                .focus{
                    border-bottom: 2px solid #ff8334;
                    p{
                        color: #ff8334;
                    }
                }
            }
            .goods-details{
                height: 50px;
            }
            .goods-evaluation{
                height: 50px;
            }
        }
    }
}
</style>
