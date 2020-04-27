<template>
  <div>
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      background="#ff9900"
      placeholder="请输入搜索关键词"
    />
    <div class="list">
      <!--左边列表-->
      <div class="leftList">
        <ul class="wrapper">
          <li  v-for="(item,i) in categoryList" :key="item.name" @click="getIndex(i)" >
            <span :class="num == i ? 'active' : 'text'">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!--右边-->
      <div class="rightList" >
          <div is='cate-tigger' :List='categoryList' :num = 'num' ></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapMutations, mapGetters} from 'vuex'
import cateTigger from './tigger/cateTigger'
export default {
  data() {
    return {
      value: "",
      num: 0,
    };
  },
  mounted(){
    console.log(this.$store)
    this.$store.dispatch('getCategroy')
  },
  methods: {
    getIndex(i){
      this.num = i
    },
    ...mapActions(['getCategroy']),
    ...mapMutations(['getCategroy'])
  },
  computed: {
    ...mapGetters(['categoryList'])
  },
  components: {
    cateTigger
  },
  
};
</script>

<style lang="stylus" scoped>

body
  background-color #fafafa
#yd_center
  position relative
  background-color #fafafa
img
  width 100%
  height 4.8rem
.list
  width 100%
  display flex
.leftList
  width 30%
  height 100%
  position fixed
  margin-right 2%
  background-color #fafafa
  .wrapper
    width 100%
    li
      width 100%
.text
  display block
  width 100%
  height 0.95rem
  line-height 0.95rem
  text-align center
  color #706e6e
  font-size 0.36rem
.active
  display block
  width 100%
  height 0.95rem
  border-left 0.1rem solid #1d84a7
  line-height 0.95rem
  text-align center
  color #ff9900
  font-size 0.36rem
  background-color #fff
// 右边列表
.rightList
  width 68%
  display block
  margin-left 32%
</style>
