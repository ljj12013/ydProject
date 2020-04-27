<template>
  <div>
    <!-- 右边组件 -->
    <div class="rightList">
      <ul class="rightul clearfix" >
        <li  v-for='m in List[num].list' :key='m.id' @click="toDetail(m.id)">
          <div class="imgBox">
            <img :src="m.thumbnail" alt="" />
          </div>
          <p>{{m.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import url from '../../../util/api'
export default {
  data() {
    return {
      m: this.List,
      n : this.num
    };
  },
  props: ['List','num'],
  methods: {
    toDetail(id){
      this.$router.push(`/detail/${id}`)
    }
  },
  updated() {
    console.log(this.m)
  },
};
</script>
<style lang="stylus" scoped>
.rightList
  flex 1
  margin-top 0.2rem 
.rightul
    width 100%
    li
        width 2.3rem
        height 2.4rem
        border 1px solid #1d84a7
        margin 0 0.2rem 0.2rem 0
        float left
        display flex
        flex-direction column
        p
            flex 1
            text-align center
            padding-top 0.1rem
            background-color #1d84a7
            color #ffffff
.imgBox
    height 1.9rem
    padding 0.15rem 0.33rem 0
    img 
        width 1.65rem
        height 1.75rem
</style>
