/**
 * 用户相关请求模块
 */
import request from '@/utils/request.js'
// import store from '@/store/index'

// ! 这里举例两种 axios 请求方式，使用哪种看个人喜欢
// * 注释的这种方法给 axios 传递 config 方式请求(优点是相关参数一目了然，但是太冗杂)
// export const Login = data => {
//   return request({
// !   method: 'POST',
//     url: '/app/v1_0/authorizations',
//     // url: '/mp/v1_0/authorizations',
//     data
//   })
// }
// export const SendSms = mobile => {
//   return request({
// !   method: 'GET',
//     url: `/app/v1_0/sms/codes/${mobile}`
//     headers: {
//       Authorization: `Bearer 用户 token`
//     }
//   })
// }
// * 这是官方的直接请求法(优点是简单)
// ? 如果是 GET 方法，params 要加 {}，如果是 POST 则不用
// export const Login = params => request.post('/app/v1_0/authorizations', params)

// ? 登录/注册 请求
export const Login = params => request.post('/app/v1_0/authorizations', params)

// ? 发送短信验证码
export const SendSms = params => request.get(`/app/v1_0/sms/codes/${params}`)

// ? 获取登录用户信息
// * 方法一：直接在这里添加请求头
// export const GetCurrentUser = () => {
//   return request({
//     method: 'GET',
//     url: '/app/v1_0/user',
//     headers: {
//       Authorization: `Bearer ${store.state.user.token}`
//     }
//   })
// }
// * 方法二：在请求拦截器中加入请求头，这里就直接以正常的形式请求
export const GetCurrentUser = () => request.get('app/v1_0/user')

// ? 获取用户频道列表
export const GetUserChannels = () => request.get('app/v1_0/user/channels')
