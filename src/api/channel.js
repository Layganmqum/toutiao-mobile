/**
 * 频道相关请求模块
 */
import request from '@/utils/request'

// ? 获取所有频道列表
export const GetAllChannels = () => request.get('/app/v1_0/channels')
