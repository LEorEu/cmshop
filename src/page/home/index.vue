<template>
    <div class="shops">
        <!-- 头部搜索栏和用户中心 -->
        <div class="home-header">
            <div class="head-main flex">
                <div class="head-user">
                    <van-icon name="contact" />
                </div>
                <div class="head-search">
                    <div class="search-box flex">
                        <van-icon name="search" />
                        <input type="text" class="search-input" placeholder="搜索您想要的内容" @click="searchShow(0)">
                    </div>
                </div>
            </div>
        </div>
        <!-- 展开搜索栏 -->
        <div class="search-mask" v-if="searchBoxShow">
            <div class="mask-head flex">
                <div class="mask-close" @click="searchShow(1)">
                    <van-icon name="arrow-left" />
                </div>
                <div class="mask-search">
                    <div class="search-main flex">
                        <van-icon name="search" />
                        <input type="text" class="search-input" v-focus placeholder="搜索您想要的内容">
                    </div>
                </div>
                <div class="search-btn" @click="shopSearch()">搜索</div>
            </div>
        </div>
        <!-- banner -->
        <div class="home-banner section">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="banner in bannerList" :key="banner.index">
                    <!-- 开发环境下需执行testImgUrl方法 -->
                    <img :src="utils.testImgUrl(banner.imageAddr.replace(/\\/g,'/'))" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 导航菜单分类 -->
        <div class="home-nav-wrap section">
            <div class="home-nav" :class="{ 's-more' : navMoreShow }">
                <ul class="nav-list">
                    <li class="nav-item" v-for="navItem in navs" :key="navItem.index">
                        <router-link :to="`/shop/list?id=${navItem.id}`">
                            <img :src="utils.testImgUrl(navItem.iconCls.replace(/\\/g,'/'))">
                            <span>{{ navItem.categoryName }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="nav-more" @click="navMore()" v-show="!navMoreShow">
                <p>更多分类<span>▼</span></p>
            </div>
        </div>
        <!-- 公告信息和优惠券充值入口 -->
        <div class="home-feature-hot section" :class="{ 'top-style' : navMoreShow }">
            <div class="home-topic clearfix">
                <div class="topic-title fl-l">
                    <i></i>
                    <span></span>
                </div>
                <div class="topic-desc fl-l">
                    <van-swipe :autoplay="3000" :show-indicators="false" :vertical="true">
                        <van-swipe-item v-for="news in newList" :key="news.index">
                            <router-link :to="`/news/details?id=${news.id}`">{{ news.title }}</router-link>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="topic-more fl-r">
                    <router-link to="/news">更多</router-link>
                </div>
            </div>
            <div class="home-favorable flex">
                <div class="member-card">
                    <router-link to="">
                        <img src="../../../static/images/member-card.png" alt="member-card">
                    </router-link>
                    
                </div>
                <div class="coupon">
                    <router-link to="">
                        <img src="../../../static/images/coupon.png" alt="coupon">
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 活动栏 新人专享 -->
        <div class="home-activity section">
            <div class="activity-title">
                <i class="line"></i>
                <h3 class="fl-l">新人专享</h3>
            </div>
            <div class="activity-main newuser-exclusive">
                <router-link to="">
                    <img src="../../../static/images/activity-img01.png">
                </router-link>
            </div>
        </div>
        <!-- 活动栏 今日特惠 -->
        <div class="home-activity section">
            <div class="activity-title">
                <i class="line"></i>
                <h3 class="fl-l">今日特惠</h3>
                <!-- <p class="fl-r">更多 ></p> -->
            </div>
            <div class="activity-main index-offer">
                <ul class="shop-offer-list clearfix">
                    <li v-for="shopOffer in shopOfferList" :key="shopOffer.index">
                        <router-link :to="`/shop/item?id=${shopOffer.id}`">
                            <h2>{{ shopOffer.goodIndexTitle }}</h2>
                            <div class="shop-info clearfix">
                                <div class="shop-text">
                                    <p class="desc">{{ shopOffer.indexRemark }}</p>
                                    <div class="price">
                                        <p>仅{{ shopOffer.offerPrice/100 }}元<span>/斤</span></p>
                                    </div>
                                </div>
                                <div class="shop-img">
                                    <img :src="utils.testImgUrl(shopOffer.goodIndexImage.replace(/\\/g,'/'))">
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 活动栏 新鲜来袭 -->
        <div class="home-activity section">
            <div class="activity-title">
                <i class="line"></i>
                <h3 class="fl-l">新鲜来袭</h3>
            </div>
            <div class="activity-main index-new">
                <van-swipe :autoplay="6000">
                    <van-swipe-item v-for="indexNew in shopNewList" :key="indexNew.index">
                        <ul class="shop-new-list clearfix">
                            <li v-for="(item, index) in indexNew" :key="index">
                                <router-link :to="`/shop/item?id=${item.id}`" class="item-box">
                                    <div class="shop-img">
                                        <img :src="utils.testImgUrl(item.goodIndexImage.replace(/\\/g,'/'))">
                                    </div>
                                    <div class="shop-info">
                                        <h2>{{ item.goodName }}</h2>
                                        <p><i>￥</i>{{ parseFloat(item.userPrice/100).toFixed(2) }}<span>/斤</span></p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <!-- 活动栏 推广招商 -->
        <div class="home-activity section">
            <div class="activity-title">
                <i class="line"></i>
                <h3 class="fl-l">推广招商</h3>
            </div>
            <div class="activity-main zhaoshang">
                <div class="zhaoshang">
                    <router-link to="">
                        <img src="../../../static/images/zhaoshang01.png">
                    </router-link>
                    <router-link to="">
                        <img src="../../../static/images/zhaoshang02.png">
                    </router-link>
                </div>
            </div>
        </div>
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
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el,binding) {
            el.focus()
            }
        }
    },
    data(){
        return{
            searchValue: '',    //顶部搜索栏Value
            searchBoxShow: false,  //搜索显示
            bannerList: '',     //banner列表
            navs: '',           //导航菜单
            navMoreShow: false, //更多菜单显示
            newList: '',        //新闻公告
            shopOfferList: '',  //天天特惠
            shopNewList: '',    //新鲜来袭
        }
    },
    mounted(){
        this.getBanner()
        this.getNavItem()
        this.getNewList()
        this.getIndexOffer()
        this.getIndexNew()
    },
    directives: {
        // 自定义获取焦点
        focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
        }
    },
    methods:{
        // 搜索显示
        searchShow(num){
            if(num == 0){
                this.searchBoxShow = true
            }else if(num == 1){
                this.searchBoxShow = false
            }
        },
        // 获取banner
        getBanner(){
            let url = '/convenience/api/v1/bmsc/headImg/list'
            axios.get(url).then((response) => {
               this.bannerList = response.data.result
            })
        },
        // 获取导航菜单
        getNavItem(){
            let url = '/convenience/api/v1/bmsc/cat/index/list'
            axios.get(url).then((response) => {
               this.navs = response.data.result
            })
        },
        // 点击展开导航菜单
        navMore(){
            this.navMoreShow = true
        },
        // 新闻公告
        getNewList(){
            let url = '/convenience/api/v1/bmsc/notice/list'
            axios.get(url).then((response) => {
               this.newList = response.data.result
            })
        },
        // 天天特惠
        getIndexOffer(){
            let url = '/convenience//api/v1/bmsc/good/indexOffer/list'
            axios.get(url).then((response) => {
               this.shopOfferList = response.data.result
            })
        },
        // 新鲜来袭
        getIndexNew(){
            let url = '/convenience//api/v1/bmsc/good/indexNew/list'
            axios.get(url).then((response) => {
                this.shopNewList = this.splitArray(response.data.result,3)
            })
        },
        // 新鲜来袭数据拆分
        splitArray(arr, size) {
            let result = []  //处理后的新数组
            for(let i = 0; i < Math.ceil(arr.length / size); i++){  //方法
                result[i] = arr.slice(i * size, i * size + size);
            }
            return result
        }
    }
}
</script>

<style lang="less" scoped>
.shops{
    background-color: #f3f3f3;
    padding-bottom: 50px;
    .section{
        background-color: #fff;
    }
    .home-header{
        width: 100%;
        height: 42px;
        .head-main{
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            margin: 0 auto;
            padding: 6px 12px 6px;
            max-width: 750px;
            background-color: #fff;
            z-index: 100;
            .head-user{
                width: 30px;
                height: 30px;
                padding: 4px;
                .van-icon-contact{
                    font-size: 22px;
                }
            }
            .head-search{
                margin-left: 10px;
                width: 85%;
                .search-box{
                    position: relative;
                    height: 30px;
                    border: 2px solid #f0f0f0;
                    border-radius: 6px;
                    background-color: #fafafa;
                }
                .van-icon-search{
                    position: absolute;
                    top: 6px;
                    left: 6px;
                    font-size: 14px;
                    color: #909090;
                }
                .search-input{
                    position: absolute;
                    top: 6px;
                    left: 30px;
                    width: 85%;
                    border: 0;
                    font-size: 12px;
                    background-color: transparent;
                    color: #909090;
                }
            }
        }
    }
    .search-mask{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #eee;
        z-index: 101;
            .mask-head{
                padding: 6px 8px 6px;
                background-color: #fff;
                .mask-close{
                    width: 30px;
                    height: 30px;
                    padding: 7px;
                    .van-icon-arrow-left{
                        font-size: 16px;
                    }
                }
                .mask-search{
                    margin-left: 10px;
                    width: 75%;
                    .search-main{
                        position: relative;
                        height: 30px;
                        border: 2px solid #f0f0f0;
                        border-radius: 6px;
                        background-color: #fafafa;
                    }
                    .van-icon-search{
                        position: absolute;
                        top: 6px;
                        left: 6px;
                        font-size: 14px;
                        color: #909090;
                    }
                    .search-input{
                        position: absolute;
                        top: 6px;
                        left: 30px;
                        border: 0;
                        font-size: 12px;
                        background-color: transparent;
                        color: #909090;
                    }
                }
                .search-btn{
                    width: calc(25% - 50px);
                    margin-left: 10px;
                    line-height: 30px;
                    text-align: center;
                    color: #333;
                }
            }
    }
    .home-banner{
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
    }
    .home-nav-wrap{
        position: relative;
        padding: 0 0 15px;
        .home-nav{
            overflow: hidden;
            padding: 0px 12px;
            height: 170px;
            .nav-item{
                display: inline-block;
                margin-right: 4%;
                margin-top: 15px;
                width: 22%;
                height: 70px;
                text-align: center;
                img{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    background-color: #bd8f41;
                    border-radius: 100%;
                }
                span{
                    display: inline-block;
                    margin-top: 5px;
                    font-size: 14px;
                    color: #333;
                }
            }
            .nav-item:nth-child(4n){
                margin-right: 0;
            }
        }
        .s-more{
            height: auto;
        }
        .nav-more{
            position: absolute;
            bottom: -23px;
            left: calc(50% - 50px);
            width: 100px;
            height: 24px;
            text-align: center;
            background-image: url('../../../static/images/home_nav-more_bg.png');
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            p{
                padding-left: 5px;
                display: inline-block;
                line-height: 24px;
                font-size: 12px;
                color: #666;
                span{
                    font-size: 12px;
                }
            }
        }
    }
    .home-feature-hot{
        margin-top: 35px;
        .home-topic{
            padding: 10px 12px 5px;
            width: 100%;
            height: 55px;
            border-bottom: 1px solid #f3f3f3;
            .topic-title{
                width: 50px;
                height: 40px;
                i{
                    float: left;
                    display: inline-block;
                    width: 36px;
                    height: 40px;
                    background-image: url('../../../static/images/topic-title.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                span{
                    float: right;
                    display: inline-block;
                    width: 2px;
                    margin-top: 10px;
                    height: 20px;
                    background-color: #ff8334;
                }
            }
            .topic-desc{
                padding-left: 10px;
                padding-right: 10px;
                width: calc(100% - 90px);
                height: 40px;
                .van-swipe{
                    width: 100%;
                    height: 40px;
                    .van-swipe-item{
                        height: 40px;
                        line-height: 40px;
                        overflow:hidden;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .topic-more{
                width: 30px;
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                color: #666;
            }
        }
        .home-favorable{
            padding: 10px 12px 15px;
            .member-card{
                padding-right: 4%;
                width: 50%;
            }
            .coupon{
                padding-left: 4%;
                width: 50%;
            }
        }
    }
    .top-style{
        margin-top: 10px;
    }
    .home-activity{
        margin-top: 10px;
        .activity-title{
            position: relative;
            padding: 10px 12px;
            height: 40px;
            .line{
                position: absolute;
                display: inline-block;
                top: 14px;
                left: 12px;
                width: 2px;
                height: 12px;
                background-color: #ff8334;
            }
            h3{
                display: inline-block;
                margin-left: 8px;
                font-size: 14px;
                line-height: 20px;
                color: #333;
            }
            p{
                line-height: 20px;
                font-size: 12px;
                color: #666;
            }
        }
        .activity-main{
            padding: 0px 12px;
            img{
                width: 100%;
            }
            .shop-offer-list{
                li{
                    position: relative;
                    float: left;
                    overflow: hidden;
                    width: calc(100%/2 - 5px);
                    height: 120px;
                    padding: 10px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    background-color: #f7f8fc;
                    h2{
                        font-size: 16px;
                    }
                    .shop-text{
                        position: relative;
                        z-index: 99;
                    }
                    .shop-img{
                        position: absolute;
                        bottom: 5px;
                        right: 0px;
                        width: 55%;
                        height: 70px;
                        overflow: hidden;
                        z-index: 9;
                    }
                    .desc{
                        margin-top: 10px;
                        font-size: 12px;
                        color: #626262;
                    }
                    .price{
                        margin-top: 20px;
                        width: 80px;
                        height: 20px;
                        line-height: 18px;
                        border: 1px solid #ff8334;
                        border-radius: 10px;
                        text-align: center;
                        p{
                            display: inline-block;
                            font-size: 12px;
                            color: #ff8334;
                        }
                    }
                }
                li:nth-child(2n){
                    margin-right: 0px;
                }
            }
            .shop-new-list{
                margin-bottom: 10px;
                padding-bottom: 20px;
                width: 100%;
                li{
                    float: left;
                    padding-right: 10px;
                    width: calc(100% / 3);
                    .item-box{
                        display: block;
                        border: 2px solid #f7f8fc;
                        border-radius: 8px;
                        .shop-img{
                            overflow: hidden;
                            width: 100%;
                            height: 80px;
                            background-color: #f7f8fc;
                            border-bottom: 1px solid #e7e8ec;
                        }
                        .shop-info{
                            margin-top: 10px;
                            padding-bottom: 10px;
                            box-shadow: 0px 4px 6px #eee;
                            h2{
                                text-align: center;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                font-size: 16px;
                                color: #333;
                            }
                            p{
                                margin-top: 5px;
                                text-align: center;
                                font-size: 16px;
                                font-weight: 600;
                                color: #ff8334;
                                i{
                                    font-size: 12px;
                                    font-weight: normal;
                                }
                                span{
                                    font-size: 12px;
                                    font-weight: normal;
                                    color: #666;
                                }
                            }
                        }
                    }
                }
                li:nth-child(3){
                    padding-right: 0px;
                }
            }
            .zhaoshang{
                padding-bottom: 10px;
                a{
                    margin-bottom: 10px;
                } 
            }
        }
        .newuser-exclusive{
            padding-top: 10px;
            border-top: 1px solid #eaeaea;
        }
    }
}
</style>
