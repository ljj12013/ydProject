<template>
  <div class="yd-detail">
    <div class="yd-box">
      <div class="swiper">
        <div>
          <van-swipe :autoplay="3000" indicator-color="#ff9900">
            <van-swipe-item v-for="(item, index) in swiperList" :key="index">
              <img v-lazy="item" width="100%" height="273px" />
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="swiper-header">
          <div class="swiperlL" @click="toBack">
            <span>
              <van-icon name="arrow-left" />
            </span>
          </div>
          <div class="swiperR">
            <span>
              <van-icon name="cart-o" />
            </span>
            <span>
              <van-icon name="ellipsis" />
            </span>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <div class="info-header">
          <p>{{ proname }}</p>
          <span>
            <van-icon name="star-o" />
            收藏
          </span>
        </div>
        <div class="info-price">
          <p>￥{{ reduct_price | toNum }}</p>
          <span>{{ allowance | zhe }}</span>
          <span v-if="isFreeShip">包邮</span>
          <span v-if="!isFreeShip">不包邮</span>
        </div>
        <!-- 标签 -->
        <div class="info-laber">
          <p>￥{{ original_price | toNum }}</p>
          <div class="laberR">
            <span v-for="(item, i) in describe" :key="i">{{ item }}</span>
          </div>
        </div>
      </div>

      <div>
        <van-sku
          v-model="show"
          stepper-title="购买数量"
          :sku="sku"
          :messageConfig="messageConfig"
          :goods="goods"
          :goods-id="goodsId"
          :hide-stock="sku.hide_stock"
          @stepper-change="step"
          @buy-clicked="onBuyClicked"
          ref='getData'
        >
          <!-- 自定义 sku-header-price -->
          <template slot="sku-header-price" slot-scope="props">
            <div class="van-sku__goods-price">
              <span class="van-sku__price-symbol">￥</span
              ><span class="van-sku__price-num">{{ props.price }}</span>
            </div>
          </template>
          <!-- 自定义 sku actions -->
          <template slot="sku-actions" slot-scope="props">
            <div class="van-sku-actions">
              <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
              <van-button
                square
                size="large"
                type="danger"
                @click="props.skuEventBus.$emit('sku:buy')"
              >
                确定
              </van-button>
            </div>
          </template>
        </van-sku>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickCar"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickButton"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onBuyButton"
        />
      </van-goods-action>

      <div class="trigger">
        <div class="trigger1">
          <span
            @click="getIn('proDetail')"
            :class="style == 'proDetail' ? 'active' : ''"
          >
            商品详情
          </span>
          <span
            @click="getIn('proComment')"
            :class="style == 'proComment' ? 'active' : ''"
          >
            买家口碑
          </span>
        </div>
        <div :is="name" :shopDes="shopDes" :buyerReviews="buyerReviews"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import url from "../../util/api";
import proComment from "./detailsPage/proComment";
import proDetail from "./detailsPage/proDetail";
export default {
  data() {
    return {
      pDetail: {},
      // 轮播
      swiperList: [],
      // 描述
      describe: [],
      // 折扣
      allowance: "",
      // 包邮
      isFreeShip: "",
      proname: "",
      // 价格
      reduct_price: "",
      // 购买参数
      // 评价
      buyerReviews: {},
      // 原始价格
      original_price: "",
      // 库存
      total: "",
      show: false,
      goodsId: "",
      quota: 0,
      quotaUsed: 5,
      name: "proDetail",
      style: "proDetail",
      // 商品详情图
      shopDes: [],
      // 商品信息
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        // 选中组合
        list: [],
        price: "",
        stock_num: 0, // 商品总库存
        collection_id: 223, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/vant/apple-2.jpg"
      },
      // 计步器
      customStepperConfig: {
        // 自定义限购文案
        quotaText: "每次限购5件",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          const { action, limitType, quota, quotaUsed, startSaleNum } = data;

          if (action === "minus") {
            Toast(
              startSaleNum > 1 ? `${startSaleNum}件起售` : "至少选择一件商品"
            );
          } else if (action === "plus") {
            // const { LIMIT_TYPE } = Sku.skuConstants;
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              let msg = `单次限购${quota}件`;
              if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
              Toast(msg);
            } else {
              Toast("库存不够了");
            }
          }
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => {},
        // stepperChange: value=>{console.log(val)},
        // 库存
        stockNum: 3625,
        // 格式化库存
        stockFormatter: stockNum => {}
      },
      // 上传图片回调
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx"
        },
        // 初始留言信息
        // 键：留言 name
        // 值：留言内容
        initialMessages: {
          留言: "留言信息"
        }
      },
      // 附加信息 尺寸
      skuData: {
        // 商品 id
        goodsId: this.goodsId,
        // 选择的商品数量
        selectedNum: 1,
        // 选择的 sku 组合
        selectedSkuComb: {
          id: 1,
          price: 100,
          s1:'',
          s2: "",
          stock_num: this.total
        }
      }
    };
  },
  methods: {
    step(value) {
      this.skuData.selectedNum = value;
    },
    onClickIcon() {},
    // 加入购物车
    onClickButton() {
      this.show = true;
      this.sku.price = parseInt(this.reduct_price).toFixed(2);
    },
    // 立即购买
    onBuyButton() {
      if (localStorage.getItem("token")) {
        this.onClickButton();
      } else {
        Toast({
          message: "亲，登录后才能购买"
        });
      }
    },
    
    // 加入购物车后提示信息
    onBuyClicked() {
      Toast({
        message: "已成功加入购物车",
        icon: "success"
      });
      // console.log(skuData);
      
      let obj = {}
      let arr1 =this.sku.tree[0].v.filter((item => {
        if(item.id == this.$refs.getData.getSkuData().selectedSkuComb.s1){
          return item
        }
      }))
      obj.s1 = arr1[0].name
      let arr2 = this.sku.tree[1].v.filter((item => {
        if(item.id == this.$refs.getData.getSkuData().selectedSkuComb.s2){
          return item
        }
      }))
      obj.s2 = arr2[0].name
      obj.img = this.goods.picture
      obj.price = this.reduct_price
      obj.name = this.proname
      let arr= []
      if(localStorage.getItem('arr')){
        let arr = JSON.parse(localStorage.getItem('arr')) 
        arr.unshift(obj)
        localStorage.setItem('arr',JSON.stringify(arr))
      }else{
        arr.push(obj)
        localStorage.setItem('arr',JSON.stringify(arr))
      }
      this.show = false;
    },
    // 切换列表
    getIn(n) {
      (this.name = n), (this.style = n);
    },
    // 返回
    toBack() {
      this.$router.go(-1);
    },
    // 点击购物车小图标
    onClickCar() {
      this.$router.push("/car");
    },
    // axios请求
    toDetail() {
      let param = this.$route.params.id;
      // 调取接口
      url
        .proDetail({ pid: param })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data == undefined) {
            Toast({
              message: "没有找到该商品"
            });
            this.$router.go(-1);
            return;
          }
          if (res.data.code == 200) {
            console.log(res.data.data);
            let {
              swiperImgArr,
              describe,
              allowance,
              isFreeShip,
              name,
              reduct_price,
              buySelect,
              buyerReviews,
              original_price,
              total,
              shopDes,
              pid
            } = res.data.data;
            (this.goodsId = pid),
              // 轮播
              (this.swiperList = swiperImgArr);
            this.goods.picture = swiperImgArr[0];
            // describe
            this.describe = describe;
            this.allowance = allowance;
            // 包邮
            this.isFreeShip = isFreeShip;
            this.proname = name;

              (this.reduct_price = reduct_price);
            this.buyerReviews = buyerReviews;
            this.original_price = original_price;
            this.shopDes = shopDes;
            // 库存
            this.sku.stock_num = parseInt(total);
            // 商品规格
            // this.sku.tree = buySelect;
            this.sku.tree = buySelect.map((item, i) => {
              return {
                k: item.name,
                v: item.list.map((m, i) => {
                  return {
                    id: 1 + i + "",
                    name: m
                  };
                }),
                k_s: `s${i + 1}`
              };
            });
            console.log(this.sku.tree);
            this.sku.list = [
              {
                id: 223, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 2, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 3, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 1, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 223, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "3", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 2, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "3", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 3, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "4", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "1",
                stock_num: 110 // 当前 sku 组合对应的库存
              },
              {
                id: 1, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: "4", // 规格类目 k_s 为 s1 的对应规格值 id
                s2: "2",
                stock_num: 110 // 当前 sku 组合对应的库存
              }
            ]
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.toDetail();
  },
  //  引入子组件
  components: {
    proDetail,
    proComment
  }
};
</script>

<style lang="stylus" scoped>
.yd-detail
  width 100%
  height 100%
  position fixed
  background-color #efeeee
  margin-bottom 1rem
  overflow auto
.swiper
  width 100%
  height 5.5rem
  border 1px solid #eeeeee
  span
    display block
    background-color #b2b2b2
    width 0.6rem
    height 0.6rem
    display flex
    align-items center
    justify-content center
    border-radius 50%
    .van-icon
      font-size 0.32rem
      color #ffffff
.swiper-header
  width 100%
  height 0.8rem
  padding 0.15rem 0.2rem
  position absolute
  top 0
  left 0
  display flex
  justify-content space-between
  align-items center
  .swiperL
    width 75%
  .swiperR
    width 25%
    display flex
    justify-content space-between
    align-items center
// 商品信息
.detail-info
  width 100%
  padding 0.2rem
  background-color #ffffff
.info-header
  width 100%
  height 100%
  display flex
  justify-content space-between
  align-content center
  margin-top 0.1rem
  p
    width 85%
    height 0.9rem
    line-height 0.45rem
    font-size 0.36rem
    color #333333
  span
    width 15%
    height 100%
    border-left 1px solid #999999
    padding 0.15rem 0
    display flex
    flex-direction column
    justify-content center
    align-items center
    font-size 0.28rem
    color #e71f19
    .van-icon
      font-size 0.36rem
      margin-bottom 0.15rem
.info-price
  height 0.5rem
  width 100%
  display flex
  justify-content flex-start
  align-items center
  margin-top 0.2rem
  p
    width 25%
    font-size 0.36rem
    color  #e71f19
  span
    display inline-block
    width 1rem
    height 0.4rem
    line-height 0.4rem
    margin-right 0.2rem
    background-color #ff9900
    color #ffffff
    text-align center
    font-size 0.24rem
.info-laber
  width 100%
  height 0.6rem
  display flex
  justify-content flex-start
  align-items center
  p
    width 25%
    font-size 0.32rem
    color #a5a5a5
    text-decoration line-through
  .laberR
    width 75%
    display flex
    justify-content flex-start
    align-items center
    span
      display block
      width 1.2rem
      height 0.3rem
      padding 0 0.05rem
      text-align center
      border 1px solid #ff9900
      color #ff9900
      font-size 0.24rem
      transform scale(0.95)
.van-goods-action
  transform translateZ(0)
  -webkit-transform translateZ(0)
.trigger
  margin-top 0.2rem
  width 100%
  padding 0.3rem 0.5rem
  background-color #fff
  .trigger1
    width 100%
    height 0.5rem
    display flex
    justify-content space-around
    align-items center
    span
      display block
      width 1.5rem
      height 0.5rem
      line-height  0.5rem
      font-size 0.32rem
      color #cccccc
      text-align center
      margin-bottom 0.3rem
.active
  border-bottom 2px solid #ff9900
  color #ff9900!important
</style>
