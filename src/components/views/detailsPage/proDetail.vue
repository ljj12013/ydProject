<template>
    <div>
        <div v-for="item in shopDes" :key="item.id" class="img">
            <img :src="item" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:['shopDes'],
    
}
</script>
<style lang="stylus" scoped>
.img
    width 100%
    height 4.3rem
    margin-bottom 0.2rem
    img 
        width 100%
        margin 0 auto
</style>