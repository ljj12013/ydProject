<template>
    <div class="com">
        <div class="comBox">
            <span :style='style' @click="getIn(buyerReviews.all, 0)">全部评价</span>
            <span :class="num ==2 ?'acitve':''" @click="getIn(buyerReviews.bad, 1)">好评</span>
            <span :class="num ==3?'acitve':''" @click="getIn(buyerReviews.good, 2)">差评</span>
            <span :class="num ==4?'acitve':''" @click="getIn(buyerReviews.postForm, 3)">晒单</span>
        </div>
        <div class="comitem"  v-for='(item) in list' :key="item.postDescribe" v-show='!flag'>
            <div class="item-header">
                <p class="userName">{{item.buyerName}}</p>
                <span class="comTime">{{item.createTime | toTime}}</span>
            </div>
            <div class="imgBox">
                <img v-for='(i,index) in item.postImg' :key="index" :src="i" alt="">
            </div>
                
            <p class="comInfo">{{item.postDescribe}}</p>
            <p class="mangerRes">
                {{item.adminReviews}}
            </p>
           
        </div>
        <div class="comitem"  v-for='(item,i) in buyerReviews.all' :key="i" v-show='flag'>
            <div class="item-header">
                <p class="userName">{{item.buyerName}}</p>
                <span class="comTime">{{item.createTime | toTime}}</span>
            </div>
            <div class="imgBox">
                <img v-for='(i,index) in item.postImg' :key="index" :src="i" alt="">
            </div>
                
            <p class="comInfo">{{item.postDescribe}}</p>
            <p class="mangerRes">
                {{item.adminReviews}}
            </p>
           
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list: [],
            flag:true,
            num: 1,
            style:{
                'background-color':'#ff9900'
            }
        }
    },
    props: ['buyerReviews'],
    methods: {
        getIn(list,n){
            this.flag= false
            this.list = list
            let combox = document.querySelector('.comBox')
            let spans = combox.querySelectorAll('span')
            spans.forEach((item,i)=>{
                if(i===n){
                    item.style.backgroundColor = '#ff9900'
                }else{
                    item.style.backgroundColor = ''
                }
            })
        }
    },
    
}
</script>
<style lang="stylus" scoped>
.com
    margin-bottom 1rem
    
.comBox
    width 100%
    height 1rem
    display flex
    justify-content space-between
    align-items center
    padding 0.15rem 0
    border-top 1px solid #ccc
    border-bottom 1px solid #ccc
    span 
        width 1.5rem
        height 0.5rem
        line-height 0.5rem
        color #ffffff
        background-color #bbbbbb
        border-radius 0.15rem
        text-align center
    .active
        background-color #ff9900

.comitem
    display flex
    flex-direction column
    padding 0.3rem 0
    border-bottom 1px solid #ccc
    .imgBox
        display flex
        img 
            width 1.5rem
            height 1.5rem
    .mangerRes
        border-radius 0.15rem
        padding 0.15rem
        background-color #999
        color #333333
    .comInfo
        color #666666
        margin 0.15rem 0
    .item-header
        height 0.6rem
        display flex
        justify-content space-between
        align-items center
        p
            color #ff9900
        span 
            color #cccccc
      


</style>