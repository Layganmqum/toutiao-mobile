/**
 * 文章相关请求模块
 */
import $http from '@/utils/$http'

// ? 获取文章列表
// export const GetArticles = params => axios.get('https://toutiao.m.lipengzhou.com/api/app/v1_1/articles', { params })
export const GetArticles = params => {
  return $http({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// ? 获取文章详情
export const GetArticleById = params => {
  return $http({
    method: 'GET',
    url: `/app/v1_0/articles/${params}`
  })
}
