<template>
    <div class="order-all" id="orderAll">
        <ul>
            <li class="order-item" v-for="(order, index) in orderList" :key="index">
                <div class="item-header clearfix">
                    <p class="item-orderno fl-l">订单号：{{ order.orderNo }}</p>
                    <span class="item-status fl-r">{{ utils.unitStatus(order.goods[0].status) }}</span>
                </div>
                <ul class="goods-list">
                    <li class="item-info clearfix" v-for="(item, index) in order.goods" :key="index">
                        <div class="item-img fl-l">
                            <img :src="utils.testImgUrl(item.goodImage.replace(/\\/g,'/'))" alt="">
                        </div>
                        <div class="item-text fl-l cleafix">
                            <h3 class="item-title">{{ item.goodName }}<!-- <span>{{ item.desc }}</span> --></h3>
                            <p class="item-price fl-l"><i>¥</i>{{ parseFloat(item.price/100).toFixed(2) }}</p>
                            <span class="item-num fl-r">x {{ item.count }}</span>
                        </div>
                    </li>
                </ul>
                <div class="item-footer">
                    <div class="item-total clearfix">
                        <p class="fl-r">合计：¥{{ parseFloat(order.total/100).toFixed(2) }}</p>
                        <p class="fl-r">共计{{order.amount}}件商品</p>
                    </div>
                    <div class="item-btn">
                        <!-- 待收货 -->
                        <div class="status-acceptItem clearfix" v-if="order.goods[0].status == '0009'">
                            <van-button class="fl-r" size="small">确认收货</van-button>
                        </div>
                        <!-- 待评价 -->
                        <div class="status-commentItem clearfix" v-if="order.goods[0].status == '0010'">
                            <van-button class="fl-r" size="small">立即评价</van-button>
                        </div> 
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            orderList: {}
        }
    },
    computed:{
    },
    mounted(){
        // 获取订单列表
        this.getOrderList();        
    },
    methods:{
        // 获取订单列表
        getOrderList(){
            let userId = this.$store.state.userId
            let url = `/convenience/api/v1/bmsc/order/${userId}/0000/list`
            axios.get(url).then((response) => {
                this.orderList = this.dataTreating(response.data.result)
                console.log(this.orderList)
            })
        },
        //数据处理
        dataTreating(data={}){
            let newData=[]
            return  newData=data.map((item)=>{
                if(item.goods){
                    item.amount=0;
                    item.total=0;
                    item.goods.map((i)=>{
                        item.amount+=i.count
                        item.total+=i.count*i.price
                    })
                 }
                return item
            })
        }
    }
}
</script>

<style lang="less" scoped>
.order-all{
    padding-bottom: 60px;
    .order-item{
        margin-bottom: 10px;
        background-color: #fff;
        .item-header{
            padding: 10px 12px;
            border-bottom: 1px solid #f6f6f6;
            .item-orderno{
                display: inline-block;
                font-weight: bold;
                font-size: 14px;
                line-height: 20px;
                color: #333;
            }
            .item-status{
                display: inline-block;
                font-size: 14px;
                line-height: 20px;
                color: #666;
            }
        }
        .goods-list{
            padding: 0 10px;
            .item-info{
                padding: 10px 0;
                border-bottom: 1px solid #f6f6f6;
                .item-img{
                    width: 60px;
                    height: 60px;
                    border: 1px solid #f6f6f6;
                }
                .item-text{
                    margin-left: 20px;
                    width: calc(100% - 80px);
                    .item-title{
                        margin-top: 5px;
                        margin-bottom: 10px;
                        font-size: 14px;
                        line-height: 24px;
                        font-weight: normal;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        color: #333;
                    }
                    .item-price{
                        font-size: 14px;
                        color: #999;
                        i{
                            font-size: 12px;
                        }
                    }
                    .item-num{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .item-footer{
            padding: 10px;
            .item-total{
                p{
                    margin-left: 20px;
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }
}
.van-button--default{
    margin-top: 5px;
    min-width: 80px;
    color: #ff8334;
    border: 1px solid #ff8334;
}
</style>
