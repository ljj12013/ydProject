import state from "./state"

let getters  = {
    categoryList(){
        return state.categoryList
    },
    dataList(){
        console.log(state.dataList)
        return state.dataList
    },
    // 用户信息
    // user(){
    //     return state.user
    // },
    userInfo(){
        console.log(state.userInfo)
        return state.userInfo
    },
    isLogin(){
        return state.isLogin
    }
}
export default getters