import url from '../util/api'
import { Toast } from 'vant';
let actions = {
  // 登录
  login(context, m) {
    // console.log(context)
    // console.log(m)
    url.tologin(m).then(res => {
      if (res.data.code == 200) {
        // console.log(res.data.profile)
        context.commit('login', res.data)
      }
    }).catch(err => {
      console.log('用户名密码错误')
    })
  },
  
  // 首页请求数据
  getIndexData(context) {
    url.indexData().then(res => {
      if (res.data.code == 200) {
        context.commit('getIndexData', res.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 分类
  getCategroy(context) {
    url.proCategory().then(res => {
      console.log(res.data)
      if (res.data.code) {
        context.commit('getCategroy', res.data.data)
      }

    }).catch(err => {
      console.log(err)
    })
  }


}
export default actions