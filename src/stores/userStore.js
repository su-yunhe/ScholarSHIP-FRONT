import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { loginAPI } from '@/apis/user'
// import qs from 'qs'
import httpInstance from '@/utils/http'
import axios from 'axios'
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";
import { inject } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({
    userid:'',
    username:'',
    authorization:'',
    email:'',
    realname:'',
    identity: ''
  })

 

  // 2. 定义获取接口数据的action函数
  const getUserInfo = async(loginForm) => {
    console.log(loginForm)
    await httpInstance.post('/user_login', loginForm).then(res => {
      console.log("res:", res)
      userInfo.value = res.data
    })
    
  }

  // 3. 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {
      userid:'',
      username:'',
      authorization:'',
      email:'',
      realname:'',
      identity: ''

    }
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
  }
}, {
  persist: true,
})