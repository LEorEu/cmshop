<template>
    <div class="coupon">
        <div class="coupon-nav flex">
            <div class="nav-item" :class="{ 'focus' : showFocus }" @click="tabNav(0)">
                <p>领取优惠券</p>
            </div>
            <i class="line"></i>
            <div class="nav-item" :class="{ 'focus' : !showFocus }" @click="tabNav(1)">
                <p>我的优惠券</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showFocus: true,
        }
    },
    mounted(){
        this.routerNavFocus()
    },
    methods:{
        // 切换状态
        tabNav(index){
            if( index == 1 ){
                this.showFocus = false
                this.$router.push('receive')
            }else if( index == 0 ){
                this.showFocus = true
                this.$router.push('list')
            }
        },
        // 导航焦点
        routerNavFocus(){
            let path = this.$route.path
            if(path == '/coupon/list'){
                this.showFocus = true
            }else if(path == '/coupon/receive'){
                this.showFocus = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.coupon-nav{
    position: relative;
    border-bottom: 2px solid #f6f6f6;
    .nav-item{
        position: relative;
        width: 40%;
        margin: 0 5%;
        padding: 8px 0;
        p{
            font-size: 16px;
            text-align: center;
            color: #333;
        }
    }
    .focus{
        border-bottom: 2px solid #ff8334;
        p{
            color: #ff8334;
        }
    }
    .line{
        display: inline-block;
        position: absolute;
        top: 50% - 14px;
        left: 50%;
        width: 2px;
        height: 14px;
        background-color: #dedede;
    }
}
</style>
