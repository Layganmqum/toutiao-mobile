/**
 * 文章评论相关请求模块
 */
// import request from '@/utils/request'
import $http from '@/utils/$http'

// ? 获取文章评论列表
export const GetComments = params => {
  return $http({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
