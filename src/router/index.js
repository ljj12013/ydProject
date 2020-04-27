import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/index'
// import center from '@/components/second/center'
// import category from '@/components/second/category'
// import car from '@/components/second/car'
// import mine from '@/components/second/mine'

// 引入一级路由
const index = ()=> (import('@/components/index'))
const detail = () => (import('@/components/views/detail'))
const login = () => (import('@/components/views/login'))
const register = () => (import('@/components/views/register'))
// 路由懒加载
const accounts = ()=>(import('@/components/views/accounts'))

// 引入二级路由
const center = ()=> (import('@/components/second/center'))
const category = ()=> (import('@/components/second/category'))
const car = ()=> (import('@/components/second/car'))
const mine = ()=> (import('@/components/second/mine'))

Vue.use(Router)

export default new Router({
  // 路由滚动行为
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    }else{
      return {
        x:0,
        y:0
      }
    }
  },
  routes: [
    {
      path: '/index',
      component: index,
      children: [
        {
          path : '/center',
          component: center
        },
        {
          path : '/category',
          component: category
        },
        {
          path : '/car',
          component: car
        },
        {
          path : '/mine',
          component: mine
        },
        {
          path : '',
          redirect: '/center'
        },
      ]
    },
    {
      path: '/detail/:id',
      component: detail
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/accounts',
      component: accounts
    },
    {
      path: '*',
      redirect: '/index'
    },
  ]
})
