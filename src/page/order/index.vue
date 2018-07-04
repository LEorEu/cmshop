<template>
    <div class="order">
        <div class="order-header">
            <van-tabs v-model="active" @click="onClick" :swipe-threshold="4">
                <van-tab v-for="nav in orderNav" :key="nav.index" :title="nav"></van-tab>
            </van-tabs>
        </div>
        <div class="order-main">
            <router-view></router-view>
        </div>
        <shop-footer></shop-footer>
    </div>
</template>

<script>
import shopFooter from '../../components/footer/footer'

export default {
    components: {
        'shop-footer': shopFooter
    },
    data(){
        return{
            active: 0,      // 顶部导航焦点
            orderNav: ['全部','待发货','待收货','待评价'],  //导航列表
        }
    },
    mounted(){
        this.routerNavFocus()
    },
    methods:{
        // 切换导航
        onClick(index, title) {
            // this.$toast(title);
            if(index == 0){
                this.$router.push('orderAll')
            }else if(index == 1){
                this.$router.push('sendItem')
            }else if(index == 2){
                this.$router.push('acceptItem')
            }else if(index == 3){
                this.$router.push('commentItem')
            }
        },
        // 导航焦点
        routerNavFocus(){
            let path = this.$route.path
            if(path == '/order/sendItem'){
                this.active = 1
            }else if(path == '/order/acceptItem'){
                this.active = 2
            }else if(path == '/order/commentItem'){
                this.active = 3
            }
        }
    }
}
</script>


<style lang="less" scoped>
.order{
    position: relative;
    background-color: #f8f8f8;
    .order-header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99;
    }
    .order-main{
        margin-top: 54px;
    }
}
</style>
