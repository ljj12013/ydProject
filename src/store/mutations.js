import state from './state'
let mutations = {
    login(state, payload) {
        state.userInfo = payload.profile
        console.log(state.userInfo)
        localStorage.setItem('token', payload.token)
        localStorage.setItem('isLogin', '1')
    },
    
    // 首页数据
    getIndexData(state, payload) {
        // console.log(payload)
        state.dataList = payload
    },
    getCategroy(state, payload) {
        state.categoryList = payload
    },
}
export default mutations