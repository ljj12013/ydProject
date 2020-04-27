<template>
  <div id="login">
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="lg-main">
      <div class="phone">
        <span>手机号：</span>
        <input type="text" v-model="userinfo.phone" />
      </div>
      <div class="pwd">
        <span>密&nbsp;&nbsp;&nbsp;码：</span>
        <input type="password" v-model="userinfo.password" />
      </div>
      <p>忘记密码</p>
      <button @click="getLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { Toast } from "vant";
import url from "../../util/api";
export default {
  data() {
    return {
      userinfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["Login"]),
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/register");
    },
    // 点击登录
    getLogin() {
      this.$store.dispatch("login", this.userinfo);
      
      if (localStorage.getItem("token")) {
        Toast("登陆成功");
        this.$router.push("/index");
      }
    }
  },
  mounted() {
    
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
.lg-main
  width 100%
  padding 1.9rem 0.75rem 0
.phone
.pwd
  width 100%
  height 1.3rem
  line-height 1.3rem
  border-bottom 1px solid #a3a3a3
input
  width 70%
  height 0.8rem
  margin-bottom 0.1rem
span
  color #929292
  display inline-block
p
  margin 0.4rem 0
  text-align right
  color #929292
button
  width 100%
  height 1rem
  color #ffffff
  font-size 0.36rem
  background-color #ff9900
</style>
