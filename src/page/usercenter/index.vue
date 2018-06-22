<template>
    <div class="usercenter">
        <div class="ucenter-header">
            <div class="my-header-main">
                <div class="my-header-avatar">
                    <div class="my-header-avatar-img">
                        <router-link to="">
                            <img src="" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="my-header-msg">

                </div>
                <router-link to="/ucenter/setting">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon"></use>
                    </svg>
                    <p>账号管理</p>
                </router-link>
            </div>
        </div>
        <div class="ucenter-main">
            <div class="my-order">
                <van-cell-group>
                    <van-cell title="我的订单" is-link />
                </van-cell-group>
            </div>
            <div class="my-cate">
                <div class="my-over my-cate-item">
                    <van-cell-group>
                        <van-cell title="单元格" value="内容" is-link />
                    </van-cell-group>
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

        }
    }
}
</script>

<style lang="less" scoped>

</style>
