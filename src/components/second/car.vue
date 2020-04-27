<template>
  <div class="yd-car">
    <div>
      <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft" />
      <!-- 内容 -->
      <div class="car-none" v-if="!flag">
        <van-icon name="cart-o" />
        <p>购物车还是空的</p>
        <p>快去逛逛吧~</p>
      </div>
      <div class="car-main" v-if="flag">
        <div class="car-item" v-for="(item, i) in carList" :key="item.id">
          <div class="car-header">
            <van-icon name="shop-o" /><span>{{ item.title }}</span>
          </div>
          <!-- 单选 -->
          <van-swipe-cell :before-close="del">
            <div class="car">
              <div class="car-left">
                <van-checkbox
                  v-model="item.checked"
                  checked-color="#ff9900"
                  @click="singerChange(i)"
                ></van-checkbox>
              </div>
              <div class="car-center">
                <div class="centerL" @click="toDetail">
                  <van-image
                    width="75"
                    height="75"
                    :src="item.img"
                  />
                </div>

                <div class="centerR">
                  <p>{{ item.dd }}</p>
                  <div class="mm">
                    <p class="info" @click="toDetail">{{ item.info }}</p>
                    <span>{{ item.tip }}</span>
                  </div>

                  <van-stepper v-model="item.value" />
                </div>
              </div>
              <div class="car-right">
                <p>￥{{ item.price | toNum }}</p>
              </div>
            </div>
            <van-button
              slot="right"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </van-swipe-cell>
        </div>
        <!-- 结算 -->
        <div class="aggregate">
          <van-submit-bar
            :price="allPrice ? allPrice : 0"
            button-text="去结算"
            @submit="onSubmit"
          >
            <van-checkbox
              v-model="allChecked"
              checked-color="#ff9900"
              @click="all"
              >全选</van-checkbox
            >
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      allChecked: false,
      // 是否显示购物车
      flag: false,
      carList: []
    };
  },
  computed: {
    // ...mapGetters(['isLogin'])
  },
  methods: {
    // 点击复选框
    singerChange(i) {
      if (this.carList[i].checked) {
        this.carList[i].checked = false;
      } else {
        this.carList[i].checked = true;
      }
      let newArr = this.carList.filter(item => {
        return item.checked == false;
      });
      if (newArr.length != 0) {
        this.allChecked = false;
      } else {
        this.allChecked = true;
      }
    },
    // 回退
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {},
    // 点击跳转详情
    toDetail() {
      this.$router.push("/detail");
    },
    // 删除行为
    del({ position, instance, i }) {
      switch (position) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          this.$dialog
            .confirm({
              message: "确定删除吗？"
            })
            .then(() => {
              instance.close();
              this.$nextTick(() => {
                this.delItem();
              });
            });
          break;
      }

      // console.log(position)
    },
    delItem(i) {
      console.log(i);
      this.carList.splice(i, 1);
    },
    // 全选
    all() {
      if (this.allChecked) {
        this.carList.map(item => {
          item.checked = false;
        });
      } else {
        this.carList.map(item => {
          item.checked = true;
        });
      }
    }
  },
  computed: {
    allPrice() {
      return this.carList.reduce((prv, item) => {
        if (item.checked) {
          return (prv += item.price * 100 * item.value);
        } else {
          return prv;
        }
      }, 0);
    }
  },
  mounted() {
    let arr = []
    if(localStorage.getItem('arr')){
      arr =  JSON.parse(localStorage.getItem('arr'))
      this.flag = true
    }else{
      this.flag = false
    }
    this.carList = arr.map((item,i)=>{
      return {
          id: i+1,
          checked: false,
          value: 1,
          img: item.img,
          title: "郑州保税区仓",
          dd: item.name,
          info: item.s1,
          price: item.price,
          tip: item.s2
        
      }
    })
    // if(localStorage.getItem("isLogin")){
    //   this.flag = true
    // }else{
    //   this.flag = false
    // }
  }
};
</script>

<style lang="stylus" scoped>
.yd-car
  width 100%
  height 100%
  position fixed
  background-color #fafafa
  margin-bottom 1rem
  overflow auto
// 导航

.van-nav-bar
  width 100%
  position fixed
  top 0
  left 0
  background-color #ff9900
.van-nav-bar__title
  color #fff
  font-size 0.32rem
.van-nav-bar .van-icon
  color #fff
.van-nav-bar__arrow
  font-size 0.36rem
// 内容
.car-none

  width 100%
  height 2.3rem
  position absolute
  top 50%
  transform translateY(-50%)
  .van-icon
    color #666666
    font-size 1rem
    text-align center
    left 50%
    transform translateX(-50% )
  p
    text-align center
    height 0.4rem
    line-height 0.4rem
    font-size 0.32rem
    color #666666
    margin-top 0.2rem
// 滑动单元格
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}

// 有内容
.car-main
  width 100%
  margin 0.8rem 0 2rem
  padding 0.35rem 0 0 0.35rem
.car-item
  width 100%
  margin-bottom 0.2rem
  .car-header
    margin-bottom 0.2rem
    .van-icon
      width 0.4rem
      color #999999
      vertical-align middle
    span
      color #999999
      font-size 0.32rem
// 购物车
.car
  width 100%
  display flex
  justify-content space-between
  align-items center
.car-left
  width 10%
.car-center
  width 70%
  display flex
.car-right
  width 20%
  margin-right 0.15rem
.centerL
  margin-right 0.2rem
.centerR
  display flex
  flex-direction column
  p
    width 70%
    height 0.4rem
    line-height 0.4rem
    font-size 0.36rem
    color #333333
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  span
    font-size 0.32rem
    color #999999
  .info
    width 1rem
    height 0.4rem
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
.mm
  display flex
  justify-content flex-start
  align-items center
  margin-bottom 0.3rem
  p
    margin-right 0.2rem
.van-button--danger
  background-color #ff9900
  border-color #ff9900
.van-submit-bar
  margin-bottom 1rem
// 去结算
.van-submit-bar__bar
  border-top 1px solid #f1f1f1
  border-bottom 1px solid #f1f1f1

.van-submit-bar__button--danger
  background #ff5500
.van-checkbox__icon--checked .van-icon
  background-color #ff9900
  border-color #ff9900
</style>
