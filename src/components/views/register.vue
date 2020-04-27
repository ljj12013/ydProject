<template>
  <div id="login">
    <van-nav-bar
      title="注册"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="lg-main">
      <div class="phone">
        <span>手机号：</span>
        <input type="text" v-model="userInfo.phone" />
      </div>
      <div class="pwd">
        <span>密&nbsp;&nbsp;&nbsp;码：</span>
        <input type="password" v-model="userInfo.password" />
      </div>
      <div class="name">
        <span>昵&nbsp;&nbsp;&nbsp;称：</span>
        <input type="text" v-model="userInfo.nickname" />
      </div>
      <div class="check">
        <div>
          <span>验证码：</span>
          <input type="text" v-model="userInfo.captcha" ref="code" />
        </div>
        <i @click="sendcode" >点击获取( {{ num }} )</i>
      </div>
      <button @click="toregister">注册</button>
      <div class="agreement">
        <input type="checkbox" checked="checked" @change="check" />
        <p class="agree">我已阅读并同意使用<span>条款和隐私协议</span></p>
      </div>
      <div v-if="!checked" class="aa"></div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import url from "../../util/api";
export default {
  data() {
    return {
      num: 30,
      userInfo: {
        phone: "",
        password: "",
        captcha: "",
        nickname: ""
      },
      checked: true,
      timer:''
    };
  },
  methods: {
    check() {
      this.checked = !this.checked;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/login");
    },
    // 发送验证码
    sendcode() {
      this.timer = setInterval(() => {
        this.num--;
        if (this.num == 0) {
          this.$refs.code.disabled = true;
          clearTimeout(this.timer);
        } else {
          this.$refs.code.disabled = false;
        }
      }, 1000);
      url
        .toCode({
          phone: this.userInfo.phone
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 检测是否已注册
    tocheck() {
      url
        .ischeck({
          phone: this.userInfo.name
        })
        .then(res => {
          if(res.data.data == 400){
            Toast('该手机号已注册')
          }else{
            Toast('注册成功')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 验证验证码
    isCode() {
      url
        .isCode({
          phone: this.userInfo.phone,
          captcha: this.userInfo.captcha
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$nextTick(() => {
              this.tocheck();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
    // 注册
    toregister() {
      // 手机号验证
      if(!(/^1[3456789]\d{9}$/).test(this.userInfo.phone) ){
        Toast('请输入正确的手机号')
        return
      }
      if(!(/^[a-zA-Z\d_]{8,}$/).test(this.userInfo.password)){
        Toast('请输入8-20个字符')
        return
      }
      if(this.userInfo.nickname==''){
        Toast('请输入昵称')
        return
      }
      console.log(this.checked);
      this.info = "";
      if (!this.checked) {
        this.info = "请先同意此协议";
        return;
      }
      this.isCode();
      url
        .toregister(this.userInfo)
        .then(res => {
          if(res.data.code == 200){
            Toast('注册成功');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
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
.check
.name
  width 100%
  height 1.3rem
  line-height 1.3rem
  border-bottom 1px solid #a3a3a3
input
  width 70%
  height 0.8rem
  margin-bottom 0.1rem
.check
  display flex
  justify-content space-between
  align-items center
  div
    width 65%
  input
    width 40%
  i
    color #fe4475
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
  margin 0.5rem 0
  background-color #ff9900
.agreement
  display flex
  align-items center
  justify-content flex-start
  input
    width 15px
    height 15px
    vertical-align bottom
    margin-right 0.15rem
  p
    span
      color #000000
.aa
  color red
</style>
