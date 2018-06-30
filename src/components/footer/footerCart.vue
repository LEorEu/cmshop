<template>
    <footer class="footer-cart">
        <div class="add-cart-main clearfix">
            <div class="cart-img">
                <div class="ring">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gouwuche"></use>
                    </svg>
                </div>
            </div>
            <div class="cart-total fl-l">
                <p>合计：<span>￥0.00</span></p>
            </div>
            <div class="cart-btn fl-r">
                <button class="settle-accounts">去结算</button>
            </div>
        </div>
    </footer>
</template>

<style lang="less" scoped>
.footer-cart{
    position: fixed;
    margin: 0 auto;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    max-width: 750px;
    box-shadow: 0 -2px 10px rgba(51,51,51,.1);
    background-color: #fff;
    z-index: 100;
    .add-cart-main{
        padding-left: 100px;
        width: 100%;
        height: 50px;
        .cart-img{
            position: absolute;
            padding: 2px;
            width: 62px;
            height: 62px;
            left: 15px;
            bottom: 10px;
            border-radius: 100%;
            border: 2px solid #ff8134;
            .ring{
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background-color: #ff8134;
                text-align: center;
                .icon{
                    margin-top: 10px;
                    font-size: 32px;
                    color: #fff;
                }
            }
        }
        .cart-total{
            margin-top: 15px;
            p{
                font-size: 16px;
                color: #333;
                span{
                    font-size: 18px;
                    color: #ff8134;
                }
            }
        }
        .cart-btn{
            width: 100px;
            height: 50px;
            .settle-accounts{
                width: 100px;
                height: 50px;
                border: 0;
                font-size: 16px;
                background-color: #ff8334;
                color: #fff;
            }
        }
    }
}
</style>
