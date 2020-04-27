<template>
  <div class="yd-mine">
    <div class="mine-main" v-if="flag">
      <!-- 头部 -->
      <van-nav-bar title="个人中心" left-text="返回" left-arrow>
        <div slot="left">
          <van-icon name="setting-o" size="25" color="#ffffff" />
        </div>
        <div slot="right">
          <van-icon name="comment-o" size="25" dot color="#ffffff" />
        </div>
      </van-nav-bar>
      <!-- 头像 -->
      <div class="headshot" @click="nologin">
        <van-image
          round
          width="2.1rem"
          height="2.1rem"
          src="../../../static/tx.jpg"
        />
      </div>
      <div class="collect">
        <p>晶晶吖</p>
        <div class="collect2">
          <van-icon name="like-o" color="#f3a8a5" size="0.45rem" />
          <span>我的收藏 (5)</span>
        </div>
      </div>
      <div class="order">
        <p>我的订单</p>
        <p>查看所有订单</p>
      </div>
      <div class="order-detail">
        <div class="order-item">
          <van-icon name="pending-payment" info="9" />
          <p>待付款</p>
        </div>
        <div class="order-item">
          <van-icon name="pending-payment" info="9" />
          <p>待发货</p>
        </div>

        <div class="order-item">
          <van-icon name="logistics" info="9" />
          <p>待收获</p>
        </div>

        <div class="order-item">
          <van-icon name="pending-payment" info="9" />
          <p>待评价</p>
        </div>

        <div class="order-item">
          <van-icon name="after-sale" info="9" />
          <p>退款/售后</p>
        </div>
      </div>
      <div class="adress">
        <p>管理你的收货地址</p>
      </div>
    </div>
    <div class="mine-none" v-if="!flag">
      <!-- 头部 -->
      <van-nav-bar title="个人中心" left-text="返回" left-arrow>
        <div slot="left">
          <van-icon name="setting-o" size="25" color="#ffffff" />
        </div>
        <div slot="right">
          <van-icon name="comment-o" size="25" color="#ffffff" />
        </div>
      </van-nav-bar>
      <!-- 头像 -->
      <div class="headshot">
        <van-image
          round
          width="2.1rem"
          height="2.1rem"
          src="../../../static/lazy.jpg"
        />
      </div>
      <div class="collect">
        <p @click="login">点击登录</p>
        <div class="collect2">
          <van-icon name="like-o" color="#f3a8a5" size="0.45rem" />
          <span>我的收藏</span>
        </div>
      </div>
      <div class="order">
        <p>我的订单</p>
        <p>查看所有订单</p>
      </div>
      <div class="order-detail">
        <div class="order-item">
          <van-icon name="pending-payment" />
          <p>待付款</p>
        </div>
        <div class="order-item">
          <van-icon name="pending-payment" />
          <p>待发货</p>
        </div>

        <div class="order-item">
          <van-icon name="logistics" />
          <p>待收获</p>
        </div>

        <div class="order-item">
          <van-icon name="pending-payment" />
          <p>待评价</p>
        </div>

        <div class="order-item">
          <van-icon name="after-sale" />
          <p>退款/售后</p>
        </div>
      </div>
      <div class="adress">
        <p>管理你的收货地址</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import { Dialog } from "vant";
export default {
  data() {
    return {
      flag :false
    };
  },
  computed: {
    ...mapGetters(['user','isLogin','userInfo']),
    
  },
  methods: {
    ...mapActions(['getUInfo']),
    ...mapMutations(['Login']),
    
    // 登录
    login() {
      this.$router.push("/login");
    },
    // 退出登录
    nologin() {
      function beforeClose(action, done) {
        if (action === "confirm") {
          setTimeout(done, 500);
        } else {
          console.log(222)
          done();
        }
      }
      Dialog.confirm({
        message: "确定要退出登录吗？",
        beforeClose
      })
        .then(() => {
          // 点击确定回调
          localStorage.removeItem('token')
          localStorage.removeItem('isLogin')
          this.$store.commit('Login')
          this.$router.push('/mine')
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  
  components: {
    [Dialog.Component.name]: Dialog.Component
  },

  mounted() {
    console.log(this.userInfo.nickname)
    if(localStorage.getItem("isLogin")){
      this.flag = true
    }else{
      this.flag = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.yd-mine
  width 100%
  height 100%
  position fixed
  background-color #efeeee
.van-nav-bar
  background-color #ff9900
.van-nav-bar__title
  color #fff
.van-nav-bar__title
  font-size 0.36rem
// 头像
.headshot
  height 2.5rem
  width 100%
  background-color #ff9900
  position relative
  top -1px
  z-index 999
.van-image
  position absolute
  left 50%
  bottom -40%
  transform translateX(-50%)
  border 0.1rem solid #fff
.collect
  background-color #fff
  padding-top 1.05rem
  margin-bottom 0.2rem
  p
    width 100%
    height 0.4rem
    margin-bottom 0.2rem
    line-height 0.4rem
    font-size 0.36rem
    text-align center
    color #686868
  .collect2
    width 100%
    padding-left 0.2rem
    height 0.8rem
    font-size 0.36rem
    display flex
    justify-content flex-start
    align-items center
    span
      margin-left 0.2rem
      color #686868
.order
  height 1.25rem
  padding 0 0.1rem 0 0.65rem
  border-bottom 1px solid #ccc
  display flex
  justify-content space-between
  align-items center
  background-color #ffffff
  p
    font-size 0.36rem
    color #686868
    &:nth-child(2)
      color #b1b1b1
.order-detail
  width 100%
  background-color #fff
  padding 0 0.15rem
  height 1.9rem
  display flex
  justify-content space-between
  align-items center
  margin-bottom 0.15rem
  .van-icon
    font-size 0.65rem
    color #b1b1b1
    margin-bottom 0.2rem
    // &:nth-child(5)
    //   flex 1
.order-item
  width 20%
  display flex
  flex-direction column
  justify-content center
  align-items center
  p
    font-size 0.32rem
    color #ababab
.adress
  height 1.3rem
  display flex
  justify-content flex-start
  align-items center
  padding-left 0.2rem
  background-color #fff
  p
    font-size 0.36rem
    color #ababab
</style>
