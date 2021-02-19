/**
 * ! 这里是解决文章获取，接口失效问题
 * 封装请求模块
 * 使用参考：https://www.kancloud.cn/yunye/axios/234845
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
// import store from '@/store/index'

const $http = axios.create({
  baseURL: 'https://toutiao.m.lipengzhou.com/api/', // 基础路径
  timeout: 5000, // 设置请求超时
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
})
// // ?请求拦截器
// $http.interceptors.request.use(config => {
//   // Do something before request is sent
//   // *添加请求头
//   const { user } = store.state

//   // *如果用户已登录，统一给接口设置 token 信息
//   if (user) {
//     config.headers.Authorization = `Bearer ${user.token}`
//   }

//   // ! 处理完请求拦截器之后，一定要把 config 返回，否则请求会一直停留在此
//   return config
// }, error => {
//   // Do something with request error
//   return Promise.reject(error)
// })

export default $http
