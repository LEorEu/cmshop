<template>
    <div class="category">
        <div class="category-nav">
            <ul class="nav-list">
                <li class="nav-item" v-for="(nav, index) in navs" :key="index" @click="tabNav(index,nav.id)" :class="{ 'focus':index == tabFocus }">
                    <p>{{ nav.categoryName }}</p>
                </li>
            </ul>
        </div>
        <div class="category-main">
            <div class="goods-list">
                <div class="yx-banner">
                    <img :src="utils.testImgUrl(yxBanner.replace(/\\/g,'/'))" />
                </div>
                <div class="goods-main">
                    <ul class="items-list">
                        <li class="goods-item" v-for="(item, index) in items" :key="index">
                            <router-link :to="`/shop/item?id=${item.id}`" class="flex">
                                <div class="item-img">
                                    <img :src="utils.testImgUrl(item.goodImage.replace(/\\/g,'/'))" />
                                    <!-- <img :src="item.goodImage" alt=""> -->
                                </div>
                                <div class="item-info">
                                    <h2 class="item-title">{{ item.goodName }}</h2>
                                    <p class="item-sales">销量：{{ item.sales }}</p>
                                    <p class="item-price"><i>￥</i>{{ parseFloat(item.price/100).toFixed(2) }}<span>/{{ utils.unitConvert(item.unit) }}</span></p>
                                </div>
                            </router-link>
                            <div class="number-wrap" @click="addCart(item.id)">
                                <van-icon name="shopping-cart" />
                            </div>
                        </li>
                    </ul>
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
    data(){
        return{
            navs: '',           //导航菜单
            tabFocus: 0,        //切换焦点索引
            items: '',          //商品列表数据
            yxBanner: '',       //banner
        }
    },
    mounted(){
        this.getNavItem()
    },
    methods:{
        // 获取导航菜单
        getNavItem(){
            let url = '/convenience/api/v1/bmsc/cat/index/list'
            axios.get(url).then((response) => {
               this.navs = response.data.result
               this.getGoodsList(this.navs[0].id)
            })
        },
        // 获取商品列表
        getGoodsList(id){
            let url = '/convenience/api/v1/bmsc/good/listid'
            let formData = new FormData()
                formData.append('categoryId',id)
            axios.post(url,formData).then((response) => {
                this.yxBanner = response.data.result.banner[0]
                this.items = response.data.result.cResult
            })
        },
        // 切换分类
        tabNav(index,id){
            this.tabFocus = index
            this.getGoodsList(id)
        },
        addCart(goodsid){
            let data = {
				goodsId: id,
				goodscount: num,
            }
            // 循环添加相同商品到同一对象
            for(let i in this.cartInfo){
				if(this.cartInfo[i].goodsId == id){
					this.cartInfo.splice(i,1)
					break
				}
            }
            // 添加商品到数组
            if(num!==0){
				this.cartInfo.push(data);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.category{
    background-color: #f8f8f8;
    .category-nav{
        position: fixed;
        left: 0;
        top: 0;
        width: 86px;
        height: 100%;
        overflow-y: auto;
        .nav-list{
            .nav-item{
                padding: 18px 0;
                background-color: #fff;
                border-bottom: 1px solid #f5f5f5;
                color: #333;
                p{
                    font-size: 14px;
                    text-align: center;
                }
            }
            .focus{
                background-color: #ff8334;
                color: #fff;
            }
        }
    }
    .category-main{
        margin-left: 96px;
        .goods-list{
            margin-bottom: 70px;
            background-color: #fff;
            .yx-banner{
                overflow: hidden;
                padding: 10px;
                width: 100%;
                height: 100px;
                img{
                    width: 100%;
                    height: 80px;
                }
            }
            .goods-main{
                padding-top: 10px;
                .goods-item{
                    position: relative;
                    padding: 10px;
                    border-top: 2px solid #fafafa;
                    background-color: #fff;
                    .item-img{
                        width: 90px;
                        height: 90px;
                        border: 1px solid #fafafa;
                        display: flex;
                        justify-content:center;
                        align-items:Center;
                    }
                    .item-info{
                        margin-left: 15px;
                        width: calc(100% - 105px);
                        .item-title{
                            font-size: 14px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            color: #333;
                        }
                        .item-sales{
                            margin-top: 5px;
                            font-size: 14px;
                            color: #666;
                        }
                        .item-price{
                            font-size: 18px;
                            font-weight: bold;
                            color: #ff8334;
                            i{
                                font-size: 14px;
                                font-weight: normal;
                                color: #ff8334;
                            }
                            span{
                                font-size: 14px;
                                font-weight: normal;
                                color: #828282;
                            }
                        }
                    }
                    .number-wrap{
                        position: absolute;
                        bottom: 5px;
                        right: 0px;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        justify-content:center;
                        align-items:Center;
                        z-index: 99;
                        .van-icon{
                            font-size: 16px;
                            color: #f23232;
                        }
                    }
                }
            }
        }
    }
}

</style>
