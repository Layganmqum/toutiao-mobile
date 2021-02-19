/**
 * 文章相关请求模块
 */
import request from '@/utils/request'
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

// ? 收藏文章
export const AddCollectById = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles/collections',
    data: {
      target: articleId
    }
  })
}

// ? 取消收藏文章
export const DeleteCollectById = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/articles/collections/${articleId}`
  })
}

// ? 点赞文章
export const AddLikeById = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/articles/likings',
    data: {
      target: articleId
    }
  })
}

// ? 取消点赞文章
export const DeleteLikeById = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/articles/likings/${articleId}`
  })
}
