<template>
    <div id="introduction">
        <div id="intro1">
            <div id="walnuts" style="float: left;">
                <div style="font-size: 60px;font-weight:bold;color: rgb(73, 149, 248);">六个核桃</div>
                <div style="margin-top: 30px;">
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">一站式项目开发协作平台</el-text>
                    </div>
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">完善的团队与项目系统</el-text>
                    </div>
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">激发个人、团队创作活力</el-text>
                    </div>
                </div>
                <div class="start">
                    <div style="font-size: 20px;" @click="startNow">
                        快速开始
                        <el-icon><ArrowRightBold /></el-icon>
                    </div>
                </div>
            </div>
            <img style="background:transparent;width: 700px;" src="/src/assets/images/intro1.png" class="image" />
        </div>
        <div id="intro2">
            <div style="text-align: center; padding-bottom: 50px; font-size: 40px;">加入团队，释放生产力</div>
            <div style="float: left;">
                <el-card style="width: 600px; padding: 0px;" :body-style="{ padding: '0px',background: '#fdeded'}" shadow="always">
                    <!-- <img src="/src/assets/images/intro2.jpg" class="image" /> -->
                    <el-carousel>
                        <el-carousel-item>
                            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                            <img height="230" src="/src/assets/images/intro2.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">快速-团队切换</div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <img height="230" src="/src/assets/images/intro3.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">便捷-成员管理</div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <img height="230" src="/src/assets/images/intro3.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">实时-团队交流</div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <div style="padding: 14px">
                    <div class="bottom">
                        <div>精准处理团队业务</div>
                        <el-button text class="button" @click="startNow">立刻体验</el-button>
                    </div>
                    </div>
                </el-card>
            </div>
            <div style="float: left;margin-left: 100px;">
                <div>
                    <el-card style="width: 400px; padding-left: 30px;" :body-style="{ background: '#f8f8ee'}" shadow="always">
                        <div style="font-size: 20px; font-weight: bold ;margin-bottom: 15px;color: rgb(73, 149, 248);">团队式协同办公</div>
                        <div>创建或加入专业项目团队，提高协同生产力</div>
                    </el-card>
                </div>
                <div style="margin-top: 40px;">
                    <div class="introList2">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Avatar /></el-icon>
                        成员管理
                        <div>
                            <el-text class="mx-1" size="large">添加团队管理员，管理人员业务更方便</el-text>
                        </div>
                    </div>
                    <div class="introList2">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Briefcase /></el-icon>
                        项目管理
                        <div>
                            <el-text class="mx-1" size="large">团队项目入口，轻松查看管理项目状况</el-text>
                        </div>
                    </div>
                    <div class="introList2">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Comment /></el-icon>
                        团队交流
                        <div>
                            <el-text class="mx-1" size="large">实时聊天系统配合消息中心，不错过重要通知</el-text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="intro3">
            <div style="text-align: center; padding-bottom: 50px; font-size: 40px;">丰富的项目解决方案</div>
            <div>
                <div style="float: left;">
                    <el-card style="width: 350px; padding-left: 30px;" :body-style="{ background: '#fdeded'}" shadow="always">
                        <div style="font-size: 20px; font-weight: bold ;margin-bottom: 15px;color: rgb(73, 149, 248);">软件项目工具</div>
                        <div>一站式软件项目全流程，开发更轻松</div>
                    </el-card>
                    <div class="introList3">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Briefcase /></el-icon>
                        项目管理
                        <div>
                            <el-text class="mx-1" size="large">快速查看和管理项目，一目了然</el-text>
                        </div>
                    </div>
                    <div class="introList3">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Opportunity /></el-icon>
                        原型设计
                        <div>
                            <el-text class="mx-1" size="large">丰富的原型设计组件，助力开发设计</el-text>
                        </div>
                    </div>
                    <div class="introList3">
                        <el-icon color="rgb(73, 149, 248)" style="margin-right: 10px;"><Document /></el-icon>
                        项目文档
                        <div>
                            <el-text class="mx-1" size="large">多种文档快速编辑与导出，流畅迭代</el-text>
                        </div>
                    </div>
                </div>
            </div>
            <div style="float: left; margin-left: 50px;">
                <div class="card2">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="/src/assets/images/intro3.jpg"></path></svg> -->
                    <img src="/src/assets/images/intro3.jpg" alt="">
                    <div class="card__content">
                        <p class="card__title">6WALNUTS-项目方案</p>
                        <p class="card__description">提供软件工程开发的全过程工具，用户在团队中可以轻松构建或参与项目，进行项目管理、原型设计以及使用项目文档功能。</p>
                        <img src="/src/assets/images/intro3.jpg" alt="">
                    </div>
                </div>
            </div>
            <div style="float: left; margin-left: 50px;">
                <div class="card">
                    <div class="first-content">
                        <div>项目轻松管理</div>
                    </div>
                    <div class="second-content">
                    <span @click="startNow">立刻体验！</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="intro4">
            <div style="text-align: center; padding-bottom: 50px; font-size: 40px;">多样化的原型设计组件，为开发助力</div>
            <div style="float: left;">
                <div class="parent">
                    <div class="card3">
                        <div class="logo">
                            <span class="circle circle1"></span>
                            <span class="circle circle2"></span>
                            <span class="circle circle3"></span>
                            <span class="circle circle4"></span>
                            <span class="circle circle5">
                                <div style="font-family: Lucida;">6WAL</div>
                            </span>

                        </div>
                        <div class="glass"></div>
                        <div class="content">
                            <span class="title">原型设计</span>
                            <div class="text" style="margin-top: 50px;">6WALNUTS提供超100+组件</div>
                            <div class="text">体验丝滑的原型设计过程</div>
                        </div>
                        <div class="card3-bottom">
                            <div class="view-more">
                                <button class="view-more-button" @click="startNow">了解更多</button>
                                <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="float: left;">
                <el-card style="width: 600px; margin-left: 100px;" :body-style="{ padding: '0px',background: '#e3f0c4'}" shadow="always">
                    <!-- <img src="/src/assets/images/intro2.jpg" class="image" /> -->
                    <el-carousel>
                        <el-carousel-item>
                            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                            <img height="230" src="/src/assets/images/intro2.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">快速-团队切换</div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <img height="230" src="/src/assets/images/intro3.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">便捷-成员管理</div>
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <img height="230" src="/src/assets/images/intro3.jpg" class="image" />
                            <div style="padding: 10px">
                                <div style="font-size: 30px;">实时-团队交流</div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <div style="padding: 14px">
                    <div class="bottom">
                        <div>精准处理团队业务</div>
                        <el-button text class="button">立刻体验</el-button>
                    </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div id="intro5">
          <div style="text-align: center; padding-bottom: 50px; font-size: 40px;">快速预览项目文档，流畅编辑和导出</div>
          <div style="float: left;">
            <div>
              <div class="card4"></div>
              <div style="font-size: 20px; margin-top: 20px; text-align: center;">提供各种文档类型</div>
            </div>
          </div>
          <div style="float: left; margin-left: 30px;"> 
            <div>
              <div class="card5"></div>
              <div style="font-size: 20px; margin-top: 20px; text-align: center;">编辑工具轻松使用</div>
            </div>
          </div>
          <div style="float: left; margin-left: 30px;">
            <div>
              <div class="card6"></div>
              <div style="font-size: 20px; margin-top: 20px; text-align: center;">更快导出与分享</div>
            </div>
          </div>
          <div style="margin-top: 450px; padding-left: 40%;">
            <button class="bottomButton">
              <span>
                <div style="font-size: 30px;" @click="startNow">立即试用</div>
              </span>
            </button>
          </div>
        </div>
    </div>
</template>


<script setup>
// import router from '@/router'
import { Select,ArrowRightBold, Briefcase, Comment, EditPen, Opportunity } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const startNow = () => {
  if(userStore.userInfo.username != ''){
    router.push({name:'team'})
  }else{
    router.push({name:'login'})
  }
}
</script>

<style scoped>

#introduction {
  width: 100%;
  min-height: 100vh;
  background: url("/src/assets/images/Jonquil.jpg") center center no-repeat;
  background-size: 100% 100%;
}

#walnuts{
    padding-top: 100px;
    padding-left: 150px;
}

.introList1{
    margin-bottom: 15px;
}

.introList2{
    margin-bottom: 30px;
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
}

.introList3{
    margin-bottom: 30px;
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-top: 30px;
}
.start {
  background-color: rgb(73, 149, 248);
  height: 50px;
  width: 180px;
  border-radius: 10px;
  transition-duration: 0.3s;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  margin-top: 30px;
  color: white;
}

.start:hover {
  background-color: #f8d9f883;
  box-shadow: 1px 1px 10px #888888;
  /* color: #79bbff; */
  color: rgb(73, 149, 248);
}

#intro2{
    padding-top: 50px;
    padding-left: 50px;
    margin-bottom: 500px;
}

#intro3{
    padding-left: 50px;
    margin-bottom: 500px;
}

#intro4{
    padding-left: 50px;
    margin-bottom: 500px;
}

#intro5{
    padding-left: 50px;
    margin-bottom: 50px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.card {
  width: 190px;
  height: 350px;
  background: rgba(246, 248, 242, 0.858);
  transition: all 0.4s;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px  rgba(152, 150, 150, 0.532);
  font-size: 30px;
  font-weight: 900;
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0px 0px 5px 3px  rgba(152, 150, 150, 0.532);
  background: #e3f0c4;
}

.first-content {
  height: 100%;
  width: 100%;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 15px;
}

.card:hover .first-content {
  height: 0px;
  opacity: 0;
}

.second-content {
  height: 0%;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  font-size: 0px;
  transform: rotate(90deg) scale(-1);
}

.card:hover .second-content {
  opacity: 1;
  height: 100%;
  font-size: 1.8rem;
  transform: rotate(0deg);
}

.card2 {
  position: relative;
  width: 500px;
  height: 350px;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card2 svg {
  width: 48px;
  fill: #333;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card2:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card2:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.card2:hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

.parent {
  width: 350px;
  height: 370px;
  perspective: 1000px;
}

.card3 {
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(135deg, #f9dddd 0%, #fdeded 100%);
  transition: all 0.5s ease-in-out;
  transform-style: preserve-3d;
  box-shadow: rgba(5, 71, 17, 0) 40px 50px 25px -40px, rgba(108, 104, 104, 0.3) 0px 25px 25px -5px;
}

.glass {
  transform-style: preserve-3d;
  position: absolute;
  inset: 8px;
  border-radius: 55px;
  border-top-right-radius: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.349) 0%, rgba(255, 255, 255, 0.815) 100%);
  /* -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px); */
  transform: translate3d(0px, 0px, 25px);
  border-left: 1px solid white;
  border-bottom: 1px solid white;
  transition: all 0.5s ease-in-out;
}

.content {
  padding: 100px 60px 0px 30px;
  transform: translate3d(0, 0, 26px);
}

.content .title {
  display: block;
  color: rgb(73, 149, 248);
  font-weight: 900;
  font-size: 20px;
}

.content .text {
  display: block;
  color: rgb(73, 149, 248);
  font-size: 15px;
  margin-top: 20px;
}

.card3-bottom {
  padding: 10px 12px;
  transform-style: preserve-3d;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translate3d(0, 0, 26px);
}

.card3-bottom .view-more {
  display: flex;
  align-items: center;
  width: 40%;
  justify-content: flex-end;
  transition: all 0.2s ease-in-out;
}

.card3-bottom .view-more:hover {
  transform: translate3d(0, 0, 10px);
}

.card3-bottom .view-more .view-more-button {
  background: none;
  border: none;
  color: rgb(73, 149, 248);
  font-weight: bolder;
  font-size: 12px;
}

.card3-bottom .view-more .svg {
  fill: none;
  stroke: rgb(73, 149, 248);
  stroke-width: 3px;
  max-height: 15px;
}

.logo {
  position: absolute;
  right: 0;
  top: 0;
  transform-style: preserve-3d;
}

.logo .circle {
  display: block;
  position: absolute;
  aspect-ratio: 1;
  border-radius: 50%;
  top: 0;
  right: 0;
  box-shadow: rgba(100, 100, 111, 0.2) -10px 10px 20px 0px;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background: rgba(255,237,237,0.2);
  transition: all 0.5s ease-in-out;
}

.logo .circle1 {
  width: 170px;
  transform: translate3d(0, 0, 20px);
  top: 8px;
  right: 8px;
}

.logo .circle2 {
  width: 140px;
  transform: translate3d(0, 0, 40px);
  top: 10px;
  right: 10px;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  transition-delay: 0.4s;
}

.logo .circle3 {
  width: 110px;
  transform: translate3d(0, 0, 60px);
  top: 17px;
  right: 17px;
  transition-delay: 0.8s;
}

.logo .circle4 {
  width: 80px;
  transform: translate3d(0, 0, 80px);
  top: 23px;
  right: 23px;
  transition-delay: 1.2s;
}

.logo .circle5 {
  width: 50px;
  transform: translate3d(0, 0, 100px);
  top: 30px;
  right: 30px;
  display: grid;
  place-content: center;
  transition-delay: 1.6s;
}

.logo .circle5 .svg {
  width: 20px;
  fill: white;
}

.parent:hover .card3 {
  transform: rotate3d(1, 1, 0, 30deg);
  box-shadow: rgba(108, 104, 104, 0.3) 30px 50px 25px -40px, rgba(108, 104, 104, 0.1) 0px 25px 30px 0px;
}

.parent:hover .card3 .card3-bottom .social-buttons-container .social-button {
  transform: translate3d(0, 0, 50px);
  box-shadow: rgba(108, 104, 104, 0.2) -5px 20px 10px 0px;
}

.parent:hover .card3 .logo .circle2 {
  transform: translate3d(0, 0, 60px);
}

.parent:hover .card3 .logo .circle3 {
  transform: translate3d(0, 0, 80px);
}

.parent:hover .card3 .logo .circle4 {
  transform: translate3d(0, 0, 100px);
}

.parent:hover .card3 .logo .circle5 {
  transform: translate3d(0, 0, 120px);
}

.card4 {
  width: 350px;
  height: 350px;
  border-radius: 50px;
  background: #fdeded;
  box-shadow: 20px 20px 60px #bebebe,
               -20px -20px 60px #f7f2f280;
  background-image: url('src/assets/images/intro3.jpg');
  -webkit-background-size:cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}

.card5 {
  width: 350px;
  height: 350px;
  border-radius: 50px;
  background: #fdeded;
  box-shadow: 20px 20px 60px #bebebe,
               -20px -20px 60px #f7f2f280;
  background-image: url('src/assets/images/intro3.jpg');
  -webkit-background-size:cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}

.card6 {
  width: 350px;
  height: 350px;
  border-radius: 50px;
  background: #fdeded;
  box-shadow: 20px 20px 60px #bebebe,
               -20px -20px 60px #f7f2f280;
  background-image: url('src/assets/images/intro3.jpg');
  -webkit-background-size:cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

}


.bottomButton {
 position: relative;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 5px;
 background: rgb(73, 149, 248);
 font-family: "Montserrat", sans-serif;
 box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
 overflow: hidden;
 border: none;
}

.bottomButton:after {
 content: " ";
 width: 0%;
 height: 100%;
 background: #d4f176;
 position: absolute;
 transition: all 0.4s ease-in-out;
 right: 0;
}

.bottomButton:hover::after {
 right: auto;
 left: 0;
 width: 100%;
}

.bottomButton span {
 text-align: center;
 text-decoration: none;
 width: 100%;
 padding: 18px 25px;
 color: #fff;
 font-size: 1.125em;
 font-weight: 700;
 letter-spacing: 0.3em;
 z-index: 20;
 transition: all 0.3s ease-in-out;
}

.bottomButton:hover span {
 color: #183153;
 animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
 0% {
  transform: scale(1);
 }

 50% {
  transform: scale(0.95);
 }

 100% {
  transform: scale(1);
 }
}

</style>