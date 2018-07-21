<template>
    <div class="goods-list">
        <div class="goods-main">
            <ul class="items-list">
                <li class="goods-item" v-for="(item, index) in items" :key="index">
                    <router-link :to="`/shop/item?id=${item.id}`" class="flex">
                        <div class="item-img">
                            <img :src="utils.testImgUrl(item.goodImage.replace(/\\/g,'/'))" />
                        </div>
                        <div class="item-info">
                            <h2 class="item-title">{{ item.goodName }}</h2>
                            <p class="item-sales">销量：{{ item.sales }}</p>
                            <p class="item-price"><i>￥</i>{{ parseFloat(item.price/100).toFixed(2) }}<span>/{{ utils.unitConvert(item.unit) }}</span></p>
                        </div>
                    </router-link>
                    <div class="number-wrap">
                        <el-input-number v-model="item.count" @change="handleChange(item.id,item.goodName,item.count,item.price)" :min="0" label="描述文字"></el-input-number>
                    </div>
                </li>
            </ul>
        </div>
        <footer-cart @cartStatus="cartChange" :list-add-cart="listAddCart"></footer-cart>
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
            items: {},      //商品列表数据
            listAddCart: [],   //添加到购物车数组
        }
    },
    mounted(){
        // 获取商品列表
        this.getGoodsList()
    },
    methods:{
        // 获取商品列表
        getGoodsList(){
            let userId = this.$store.state.userId
            let url = '/convenience/api/v1/bmsc/good/listid'
            const categoryId = this.$route.query.id
            let formData = new FormData()
                formData.append('categoryId',categoryId)
                formData.append('userId',userId)
            axios.post(url,formData).then((response) => {
               this.items = response.data.result.cResult
            })
        },
        // 监听商品添加到购物车
        handleChange(id,name,num,gp) {
            let data = {
                goodId: id,
                goodName: name,
                count: num,
                price: gp
            }

            let userId = this.$store.state.userId
            let url = `/convenience/api/v1/bmsc/cart/${userId}/insert`
            let formData = new FormData()
                formData.append('goodId',data.goodId)
                formData.append('count',data.count)
            axios.post(url,formData).then((response) => {
                this.listAddCart.push(1)
            })
        },
        // 监听商品数量变化
        cartChange(val){
            this.getGoodsList()
        },
    }
}
</script>

<style lang="less" scoped>
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
</style>
