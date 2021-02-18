/**
 * 频道相关请求模块
 */
import request from '@/utils/request'

// ? 获取所有频道列表
// export const GetAllChannels = () => request.get('/app/v1_0/channels')
export const GetAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// ? 添加用户频道(覆盖)
// export const AddUserChannel = params => request.patch('/app/v1_0/user/channels', params)
export const AddUserChannel = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
    params
  })
}

// ? 删除指定用户频道(覆盖)
// export const DeleteUserChannel = params => request.delete(`/app/v1_0/user/channels/${params}`)
export const DeleteUserChannel = params => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${params}`
  })
}
