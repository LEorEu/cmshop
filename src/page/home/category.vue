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
                <div class="goods-main">
                    <ul class="items-list">
                        <li class="goods-item" v-for="(item, index) in items" :key="index">
                            <router-link :to="`/shop/item?id=${item.id}`" class="flex">
                                <div class="item-img">
                                    <img :src="testImgUrl(item.goodImage.replace(/\\/g,'/'))" />
                                    <!-- <img :src="item.goodImage" alt=""> -->
                                </div>
                                <div class="item-info">
                                    <h2 class="item-title">{{ item.goodName }}</h2>
                                    <p class="item-sales">销量：{{ item.sales }}</p>
                                    <p class="item-price"><i>￥</i>{{ parseFloat(item.price/100).toFixed(2) }}<span>/{{ common.unitConvert(item.unit) }}</span></p>
                                </div>
                            </router-link>
                            <div class="number-wrap">
                                <el-input-number v-model="item.remark1" @change="handleChange(item.id,item.goodName,item.remark1,item.price)" :min="0" label="描述文字"></el-input-number>
                            </div>
                        </li>
                    </ul>
                </div>
                <footer-cart></footer-cart>
            </div>
        </div>
        <shop-footer></shop-footer>
    </div>
</template>

<script>
import axios from 'axios'
import common from '../../components/common'

import shopFooter from '../../components/footer/footer'

export default {
    components: {
        'shop-footer': shopFooter
    },
    data(){
        return{
            navs: '',           //导航菜单
            tabFocus: 0,        //切换焦点索引
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
            })
        },
        // 切换分类
        tabNav(index,id){
            this.tabFocus = index
            console.log(id)
        }   
    }
}
</script>

<style lang="less" scoped>
.category{
    .category-nav{
        position: fixed;
        left: 0;
        top: 0;
        width: 86px;
        height: 100%;
        overflow-y: scroll;
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
        .goods-list{
            margin-bottom: 70px;
            .goods-main{
                .goods-item{
                    position: relative;
                    padding: 10px;
                    border-bottom: 2px solid #fafafa;
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
                            margin-top: 5px;
                            font-size: 18px;
                            color: #333;
                        }
                        .item-sales{
                            margin-top: 10px;
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
                        bottom: 0px;
                        right: 0px;
                        width: 120px;
                        height: 60px;
                        display: flex;
                        justify-content:center;
                        align-items:Center;
                        z-index: 99;
                    }
                }
            }
        }
    }
}

</style>
