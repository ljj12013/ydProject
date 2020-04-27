<template>
  <div id="yd_center">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      background="transparent"
      placeholder="请输入搜索关键词"
    />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品内容 -->
    <div class="yd-main">
      <!-- 今日推荐 -->
      <div class="day-recom" v-for='(item) in dataList' :key="item.name">
        <div class="day-header">
          <img src="../../../static/mipmap-xxhdpi/hot.png.png" alt="" />
          <span>{{item.name}}</span>
        </div>
        <div class="day-box">
          <ul >
            <li v-for="list in item.list" :key="list.id" @click="toDetail(list.id,item.stock)">
              <img v-lazy="list.thumbnail" alt="" />
              <div class="price">
                <span>￥{{list.reduct_price | toNum}}</span><span>￥{{list.original_price |toNum }}</span>
              </div>
              <p>{{list.name}}</p>
            </li>
           
          </ul>
        </div>
      </div>
     
      
    </div>
  </div>
</template>

<script>
import {mapActions,mapMutations,mapGetters} from 'vuex'
import url from '../../util/api'
export default {
  data() {
    return {
      value: "",
      images: [
        require("../../assets/images/banner2.png"),
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
    };
  },
  methods: {
    toDetail(id){
      console.log(id)
      this.$router.push(`/detail/${id}`)
    },
    ...mapMutations(['getIndexData'])
  },
  computed: {
    ...mapGetters(['dataList'])
  },
  mounted(){
    this.$store.dispatch('getIndexData')
  }
};
</script>

<style lang="stylus" scoped>
body
  position fixed
  top 0
  left 0
  background-color #e7e7e7
#yd_center
  position relative
  background-color #e7e7e7
img
  width 100%
  height 4.8rem
.van-search
  position absolute
  top 0
  left 0
  z-index 999
  width 100%

.van-field__control
    text-align center
// 商品内容
// 今日推荐
.yd-main
  width 100%
  padding 0 0.35rem
  margin-bottom 1.5rem
.day-header
  display flex
  justify-content flex-start
  align-items center
  height 0.95rem
.day-header
  img
    width 0.3rem
    height 0.4rem
    margin-right 0.2rem
  span
    color #333333
.day-box
  width 100%
  height 5rem
  overflow hidden
ul
  display flex
  justify-content flex-start
  height 100%
  li
    width 3.25rem
    // height 4.7rem
    margin-right 0.3rem
    float left
    background-color #fff
    img 
      width 3.25rem
      height 3.25rem
    p
      height 0.8rem
      line-height 0.4rem
      font-size 0.32rem
      color #8f8f8f
      overflow hidden
      text-overflow ellipsis
      display --webkit-box
      --webkit-line-clamp 2
      -webkit-box-orient vertical
.price
  width 3.25rem
  height 0.4rem
  display flex
  justify-content space-between
  align-items center
  margin 0.2rem 0
  span 
    &:nth-child(1)
      font-size 0.32rem
      color #e81122
    &:nth-child(2)
      font-size 0.32rem
      color #8f8f8f
      text-decoration: line-through
      margin-right 0.1rem
.mather-son
  ul
      li
        p 
          margin 0.2rem 0
.mather-son-box
  .price
    margin 0.15rem 0
    span 
      font-size 0.32rem
      &:nth-child(1)
        color #ff9900
      &:nth-child(2)
        text-decoration: none

</style>
