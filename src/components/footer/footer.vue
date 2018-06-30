<template>
    <footer class="footer">
        <div class="footer-main">
            <ul class="footer-nav">
                <li class="nav-home nav-item">
                    <router-link to="/home" active-class="router-link-active">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye1"></use>
                        </svg>
                        <p>首页</p>
                    </router-link>
                </li>
                <li class="nav-sort nav-item">
                    <router-link to="/fenlei" active-class="router-link-active">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-fenlei"></use>
                        </svg>
                        <p>分类</p>
                    </router-link>
                </li>
                <li class="nav-cart nav-item">
                    <router-link to="/cart" active-class="router-link-active">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gouwuche"></use>
                        </svg>
                        <p>购物车</p>
                    </router-link>
                </li>
                <li class="nav-ucenter nav-item">
                    <router-link to="/ucenter" active-class="router-link-active">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon"></use>
                        </svg>
                        <p>个人中心</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="less" scoped>
.footer{
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
    .footer-main{
        width: 100%;
        .footer-nav{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            width: 100%;
            height: 60px;
            .nav-item{
                position: relative;
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                text-align: center;
                font-size: 10px;
                color: #999;
                line-height: 1;
                a{
                    display: block;
                }
                .router-link-active{
                    .icon{
                        color: #ff8334;
                    }
                    p{
                        color: #ff8334;
                    }
                }
                .icon{
                    margin-top: 10px;
                    font-size: 22px;
                    color: #333;
                }
                p{
                    margin-top: 5px;
                    font-size: 12px;
                    text-align: center;
                    color: #333;
                }
            }
        }
    }
}
</style>
