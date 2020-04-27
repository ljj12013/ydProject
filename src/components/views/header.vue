<template>
  <div>
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-nav-bar
    background-color: #ff9900
.van-nav-bar
.van-icon
    color #fff 
.van-nav-bar__title
    color #fff
.van-nav-bar__text
    color #fff
</style>
