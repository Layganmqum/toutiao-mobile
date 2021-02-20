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

// ? 对评论或回复点赞
export const AddCommentLike = commentId => {
  return $http({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// ? 对评论或回复取消点赞
export const DeleteCommentLike = commentId => {
  return $http({
    method: 'GET',
    url: `/app/v1_0/comments/likings/${commentId}`
  })
}

// ? 添加评论或评论回复
export const AddComment = data => {
  return $http({
    method: 'POST',
    url: '/app/v1_0/comment/',
    data
  })
}
