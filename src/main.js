// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vant
import vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index'
Vue.use(vant)
Vue.config.productionTip = false

// 引入静态资源
import './assets/css/reset.css'
import './assets/js/remScale'
// 引入状态管理
import store from './store'

// 全局守卫
// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if(to.path == '/login'){
//     next()
//     return 
//   }
//   if(!localStorage.getItem('token')){
//     next('/login')
//     return
//   }
//   next()
// })

// 全局过滤器
import filters from './filters'
for(let i in filters){
  Vue.filter(i, filters[i])
}
// 全局组件
import comComponents from './commen'
for(let i in comComponents){
  Vue.filter(i, comComponents[i])
}
// 图片懒加载
import vuelazyload from 'vue-lazyload'
Vue.use(vuelazyload, {
  loading: '../static/lazy.jpg'
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
