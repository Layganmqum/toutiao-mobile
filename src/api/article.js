/**
 * 文章相关请求模块
 */
// import request from '@/utils/request'
import axios from 'axios'

// ? 获取文章列表
// export const GetArticles = params => request.get('/app/v1_1/articles', { params })
export const GetArticles = params => axios.get('https://toutiao.m.lipengzhou.com/api/app/v1_1/articles', { params })
