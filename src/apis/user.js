// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = (userInfo) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      userInfo
    }
  })
}

export const addPlayerAPI = (player) => {
  return request({
    url:'/addplayer',
    method:'POST',
    data : {
      player
    }
  })
}