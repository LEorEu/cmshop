<template>
    <div class="success-pwd">
        <div class="success-img">
            <img src="../../../static/images/success.png" alt="">
        </div>
        <p>密码设置成功!</p>
        <router-link to="/vip/recharge">
            <van-button type="primary">返回</van-button>
        </router-link>
        <div class="tips">
            <span>您可以在<i>个人中心-我的会员卡</i>中修改密码</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.success-pwd{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
    text-align: center;
    .success-img{
        margin: 0 auto;
        margin-top: 60px;
        width: 40%;
    }
    p{
        margin-top: 20px;
        text-align: center;
        font-size: 28px;
        color: #666;
    }
    .van-button{
        margin-top: 100px;
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
