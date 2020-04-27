import http from './apiConfig'
const baseUrl = ' http://localhost:3000'
let obj = {}
// 登录
obj.tologin = (data)=> {
    return http.get(baseUrl+'/login/cellphone',{
        params:data
    })
}
obj.getUserInfo = () =>{
    return http.get(baseUrl+ '/user/subcount')
}
// 注册
obj.toregister= (data) => {
    return http.get(baseUrl + '/register/cellphone', {
        params:data
    })
}
// 获取验证码
obj.toCode = (data) => {
    return http.get( baseUrl + '/captcha/sent', {
        params: data
    })
}
// 验证验证码
obj.isCode = (data) => {
    return http.get( baseUrl + '/captcha/verify', {
        params: data
    })
}
// 检测手机号码是否已注册
obj.ischeck= (data) => {
    return http.get(baseUrl + '/cellphone/existence/check', {
        params:data
    })
}



// 首页接口
const baseIndexUrl = '/api'
obj.indexData = (data ) =>{
    return http.get( baseIndexUrl + '/getIndexData', {
        params: data
    })
}
// 商品详情
obj.proDetail = (data ) =>{
    return http.get( baseIndexUrl + '/getDetails', {
        params: data
    })
}
// 分类
obj.proCategory= (data ) =>{
    return http.get( baseIndexUrl + '/getClassify', {
        params: data
    })
}
//抛出对象
export default obj