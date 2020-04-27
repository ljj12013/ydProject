<template>
  <div>
    <!-- <router-link to="/center">主页</router-link>
    <router-link to="/category">分类</router-link>
    <router-link to="/car">购物车</router-link>
    <router-link to="/mine">个人中心</router-link>
    <router-view></router-view> -->
    <!-- 路由滚动行为 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar route>
      <van-tabbar-item replace to="/center" icon="home-o">
        主页
      </van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">
        分类
      </van-tabbar-item>
      <van-tabbar-item replace to="/car" icon="shopping-cart-o">
        购物车
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped>
.van-tabbar-item--active
  color #ff9900
  
</style>
