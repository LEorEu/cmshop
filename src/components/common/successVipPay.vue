<template>
    <div class="success-pay">
        <div class="success-img">
            <img src="../../../static/images/success.png" alt="">
        </div>
        <p>支付成功 !</p>
        <router-link to="/home">
            <van-button type="primary">返回首页</van-button>
        </router-link>
        <div class="tips">
            <span>您可以在<i>个人中心-我的订单</i>中查看订单</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.success-pay{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    .success-img{
        margin: 0 auto;
        margin-top: 40px;
        width: 40%;
    }
    p{
        margin-top: 20px;
        text-align: center;
        font-size: 28px;
        color: #666;
    }
    .van-button{
        margin-top: 30px;
        width: 90%;
        padding: 0 20px;
        background-color: #ff8334;
        border: 1px solid #ff8334;
        border-radius: 20px;
    }
    .tips{
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        span{
            font-size: 12px;
            i{
                color: #2975ff;
            }
        }
    }
}
</style>
