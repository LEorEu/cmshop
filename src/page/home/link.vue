<template>
    <van-loading type="spinner" color="white" />
</template>

<script>
export default {
    mounted(){
        this.$store.state.userId = this.$route.query.userId
        this.$router.push('/home')
    }
}
</script>
