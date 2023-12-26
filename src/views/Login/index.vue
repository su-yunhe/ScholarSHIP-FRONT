<template>
    <div id="background" :class="['container', { 'sign-up-mode': isLogin }]">
      <div class="form-container">
        <div class="signin-signup">
          <el-form ref="formRef" :rules="rules" action="#" class="sign-in-form" :model="form">
            <h2 class="title">登录</h2>
            <div class="login_main">
              <div class="input-field">
                <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><User /></el-icon>
                <input type="text" placeholder="用户名" v-model="form.userName" />
              </div>
              <div class="input-field" style="width:400px">
                <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><Lock /></el-icon>
                <input type="password" placeholder="密码" v-model="form.password" />
              </div>
            </div>
            <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
            <el-button class="btn" @click="doLogin">立即登录</el-button>
          </el-form>
          <el-form ref="regFormRef" action="#" class="sign-up-form" :model="registerForm">
            <h2 class="title">注册</h2>
            <div class="input-field">
              <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><User /></el-icon>
              <input type="text" placeholder="用户名" v-model="registerForm.userName" />
            </div>
            <div class="input-field">
              <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><Lock /></el-icon>
              <input type="password" placeholder="密码" v-model="registerForm.password1" />
            </div>
            <div class="input-field">
              <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><Check /></el-icon>
              <input type="password" placeholder="确认密码" v-model="registerForm.password2"/>
            </div>
            <div class="input-field">
              <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><Message /></el-icon>
              <input type="email" placeholder="邮箱" v-model="registerForm.email" />
            </div>
            <div class="input-field">
              <el-icon size="20px" style="margin-top: 15px;margin-left: 15px;"><EditPen /></el-icon>
              <input type="text" placeholder="真实姓名" v-model="registerForm.userrealname" />
            </div>
            <el-checkbox size="large" v-model="agree">
              我已同意隐私条款和服务条款
            </el-checkbox>
            <!-- <button class="btn" @click="isLogin = !isLogin">
              立即注册
            </button> -->
            <el-button class="btn" @click="register">
              立即注册
            </el-button>
            <!-- <input type="input" value="立即注册" class="btn solid" @click="sign_up()" style="text-align:center" /> -->
          </el-form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>加入我们</h3>
            <p>加入我们，成为ScholarSHIP的一份子。</p>
            <button class="btn transparent" @click="isLogin = !isLogin">
              去注册
            </button>
          </div>
          <img src="/src/assets/images/signin.svg" class="image" alt="" />
        </div>
  
        <div class="panel right-panel">
          <div class="content">
            <h3>已有帐号？</h3>
            <p>立即登录已有帐号，使用ScholarSHIP完整功能。</p>
            <button class="btn transparent" @click="isLogin = !isLogin">
              去登录
            </button>
          </div>
          <img src="/src/assets/images/signup.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  </template>

<script setup>


// 表单校验（账号名+密码）

import { ref } from 'vue'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/userStore'
import httpInstance from '@/utils/http'

const isLogin = ref(false)
const userStore = useUserStore()

// 1. 准备表单对象
const form = ref({
  userName: '',
  password: '',
  agree: false
})

const registerForm = ref({
  userName: '',
  password1: '',
  password2: '',
  email: '',
  userrealname: ''
})

// 2. 准备规则对象
const rules = {
  userName: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        // console.log(value)
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

// 3. 获取form实例做统一校验
const formRef = ref(null)
const regFormRef = ref(null)
const router = useRouter()

const doLogin = () => {
  const { userName, password } = form.value
  if(userName == ''){
    ElMessage({ type: 'warning', message: '用户名不能为空' })
  }else if(password == ''){
    ElMessage({ type: 'warning', message: '密码不能为空' })
  }else if(!form.value.agree){
    ElMessage({ type: 'warning', message: '请勾选同意隐私和服务条款' })
  }else{
    console.log(1)
    httpInstance.post('user_login', {
      userName: form.value.userName,
      password: form.value.password,
      agree: form.value.agree
    }).then(res => {
      console.log(res.data)
      userStore.userInfo = res.data
      userStore.userInfo.identity = "用户"
      console.log(userStore.userInfo)
      ElMessage({ type: 'success', message: '登录成功' })
      router.replace({ path: '/intro' })
    })
  }
}

const agree = ref(false)
const register  = () => {
  const { userName, password1, password2, email, userrealname } = registerForm.value
  const password = password1
  if(userName == ''){
    ElMessage({ type: 'warning', message: '用户名不能为空' })
  }else if(password1 == ''){
    ElMessage({ type: 'warning', message: '密码不能为空' })
  }else if(password2 == ''){
    ElMessage({ type: 'warning', message: '请确认密码' })
  }else if(email == ''){
    ElMessage({ type: 'warning', message: '邮箱不能为空' })
  }else if(userrealname == ''){
    ElMessage({ type: 'warning', message: '请填写真实姓名' })
  }else if(!agree.value){
    ElMessage({ type: 'warning', message: '请勾选同意隐私和服务条款' })
  }else{
    httpInstance.post('/user_register',registerForm.value).then(res => {
      console.log(res)
      if(res.error == 0){
        userStore.userInfo = res.data
        console.log(userStore.userInfo)
        ElMessage({ type: 'success', message: '注册成功' })
        userStore.pages.isNewUser = [true,true]
        router.replace({ path: '/scholar' })
      }
    })
  }
}
// 1. 用户名和密码 只需要通过简单的配置（看文档的方式 - 复杂功能通过多个不同组件拆解）
// 2. 同意协议  自定义规则  validator:(rule,value,callback)=>{}
// 3. 统一校验  通过调用form实例的方法 validate -> true
</script>
  
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body,
  input {
    font-family: "Poppins", sans-serif;
  }
  
  .container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
  }
  
  .login_main>.input-field {
    margin-bottom: 20px;
    /* 设置你想要的间距值 */
  }
  
  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
  }
  
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  
  form.sign-up-form {
    opacity: 0;
    z-index: 1;
  }
  
  form.sign-in-form {
    z-index: 2;
  }
  
  .title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
  }
  
  .input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
  }
  
  .input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.1rem;
  }
  
  .input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
  }
  
  .input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
  }
  
  .social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
  }
  
  .social-media {
    display: flex;
    justify-content: center;
  }
  
  .social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
  }
  
  .social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
  }
  
  .btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
  }
  
  .btn:hover {
    background-color: #4d84e2;
  }
  
  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  
  .container:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }
  
  .image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
    background:transparent;
  }
  
  .panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
  }
  
  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }
  
  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
  }
  
  .panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }
  
  .panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
  }
  
  .panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }
  
  .btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
  }
  
  .right-panel .image,
  .right-panel .content {
    transform: translateX(800px);
  }
  
  /* ANIMATION */
  
  .container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
  }
  
  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
  }
  
  .container.sign-up-mode .signin-signup {
    left: 25%;
  }
  
  .container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
  }
  
  .container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
  }
  
  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
  }
  
  .container.sign-up-mode .left-panel {
    pointer-events: none;
  }
  
  .container.sign-up-mode .right-panel {
    pointer-events: all;
  }
  
  @media (max-width: 870px) {
    .container {
      min-height: 800px;
      height: 100vh;
    }
  
    .signin-signup {
      width: 100%;
      top: 95%;
      transform: translate(-50%, -100%);
      transition: 1s 0.8s ease-in-out;
    }
  
    .signin-signup,
    .container.sign-up-mode .signin-signup {
      left: 50%;
    }
  
    .panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }
  
    .panel {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 2.5rem 8%;
      grid-column: 1 / 2;
    }
  
    .right-panel {
      grid-row: 3 / 4;
    }
  
    .left-panel {
      grid-row: 1 / 2;
    }
  
    .image {
      width: 200px;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.6s;
    }
  
    .panel .content {
      padding-right: 15%;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.8s;
    }
  
    .panel h3 {
      font-size: 1.2rem;
    }
  
    .panel p {
      font-size: 0.7rem;
      padding: 0.5rem 0;
    }
  
    .btn.transparent {
      width: 110px;
      height: 35px;
      font-size: 0.7rem;
    }
  
    .container:before {
      width: 1500px;
      height: 1500px;
      transform: translateX(-50%);
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }
  
    .container.sign-up-mode:before {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }
  
    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
      transform: translateY(-300px);
    }
  
    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
      transform: translateY(0px);
    }
  
    .right-panel .image,
    .right-panel .content {
      transform: translateY(300px);
    }
  
    .container.sign-up-mode .signin-signup {
      top: 5%;
      transform: translate(-50%, 0);
    }
  }
  
  @media (max-width: 570px) {
    form {
      padding: 0 1.5rem;
    }
  
    .image {
      display: none;
    }
  
    .panel .content {
      padding: 0.5rem 1rem;
    }
  
    .container {
      padding: 1.5rem;
    }
  
    .container:before {
      bottom: 72%;
      left: 50%;
    }
  
    .container.sign-up-mode:before {
      bottom: 28%;
      left: 50%;
    }
  }

  #background{ 
    /* background: url("/src/assets/images/Jonquil.jpg") center center no-repeat; */
    background-size: 100% 100%;
  }
  </style>
  