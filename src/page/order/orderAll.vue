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
                        <p class="fl-r">合计：¥</p>
                        <p class="fl-r">共计件商品</p>
                    </div>
                    <div class="item-btn">
                        <!-- 待付款 -->
                        <div class="status-pendingPayment" v-if="orderStatus(order.goods[0].status)">
                            <a href="#">取消订单</a>
                            <a href="#">去付款</a>
                        </div>
                        <!-- 待发货 -->
                        <div class="status-sendItem">

                        </div>
                        <!-- 待收货 -->
                        <div class="status-acceptItem" v-if="orderStatus(order.goods[0].status)">
                            <a href="#">确认收货</a>
                        </div>
                        <!-- 待评价 -->
                        <div class="status-commentItem" v-if="orderStatus(order.goods[0].status)">
                            <a href="#">立即评价</a>
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
            orderList: [
                {
                    "orderNo": "0001201806021039432232",
                    "goods": [
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "京觅 烟台红富士苹果 1大的",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        },
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "打算结婚大事件号地块",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        }
                    ]
                },
                {
                    "orderNo": "0001201806021039432232",
                    "goods": [
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "的撒谎健康大数据库打不开",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        },
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "保护科权威，打算",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        }
                    ]
                },
                {
                    "orderNo": "0001201806021039432232",
                    "goods": [
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "武器哦哦衣服比较暗",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        }
                    ]
                },
                {
                    "orderNo": "0001201806021039432232",
                    "goods": [
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "武器哦哦衣服比较暗",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        }
                    ]
                },
                {
                    "orderNo": "0001201806021039432232",
                    "goods": [
                        {
                            "id": 6,
                            "userId": 48,
                            "userName": "张鑫",
                            "orderNo": "0001201806021039432232",
                            "total_fee": null,
                            "goodId": 152781751525238,
                            "goodName": "武器哦哦衣服比较暗",
                            "status": "0008",
                            "orderTime": "2018-06-02 10:39:43",
                            "paymode": "0003",
                            "payTime": "2018-06-02 10:43:05",
                            "count": 2,
                            "price": 4590,
                            "source": "0001",
                            "couponId": 0,
                            "couponName": null,
                            "dispatchPrice": 300,
                            "addressId": 48,
                            "goodImage": "\\pic\\upload\\20180611\\1528685230088329.jpg",
                            "statusName": "待发货",
                            "paymodeName": "会员卡",
                            "payStatus": null,
                            "sign": null,
                            "result_code": null,
                            "coupon_fee": null,
                            "bank_type": null,
                            "settlement_total_fee": null,
                            "time_end": null,
                            "err_code": null,
                            "err_code_des": null
                        }
                    ]
                }
            ]
        }
    },
    mounted(){
        // 获取订单列表
        this.getOrderList()
    },
    computed:{

    },
    methods:{
        // 获取订单列表
        getOrderList(){
            console.log(this.orderList)
            this.orderList
        },
        orderStatus(){

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
</style>
