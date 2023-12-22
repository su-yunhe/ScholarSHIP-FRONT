<template>
    <div id="introduction">
        <div id="intro1">
            <div id="walnuts" style="float: left;">
                <div style="font-size: 60px;font-weight:bold;color: rgb(73, 149, 248);">
                  <span style="color: rgba(97, 134, 243);margin: 0;" class="scholarship">S</span>
                  <span style="color: rgba(200, 65, 48);margin-left: 2px;">c</span>
                  <span style="color: rgba(233, 187, 18);margin-left: 2px;">h</span>
                  <span style="color: rgba(107, 168, 87);margin-left: 2px;">o</span>
                  <span style="color: rgba(97, 134, 243);margin-left: 2px;">l</span>
                  <span style="color: rgba(200, 65, 48);margin-left: 2px;">a</span>
                  <span style="color: rgba(233, 187, 18);margin-left: 2px;">r</span>
                  <span style="color: rgba(107, 168, 87);margin-left: 2px;">S</span>
                  <span style="color: rgba(97, 134, 243);margin-left: 2px;">H</span>
                  <span style="color: rgba(200, 65, 48);margin-left: 2px;">I</span>
                  <span style="color: rgba(233, 187, 18);margin-left: 2px;">P</span>
                </div>
                <div style="padding-top: 10px;">
                  <div class="input__container">
                    <div class="shadow__input"></div>
                    <span id="dropdown_span">
                      <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link" style="font-weight:bold;font-size: 18px;">
                          {{ok}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item command="a" @click="ok='文献'">文献</el-dropdown-item>
                            <el-dropdown-item command="b" @click="ok='学者'">学者</el-dropdown-item>
                            <el-dropdown-item command="c" @click="ok='机构'">机构</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </span>
                    <input @keydown.enter="search" type="text" name="text" id="text" class="input__search" placeholder="在此处搜索" style="font-weight:bold;font-size: 18px;">
                    <button class="input__button__shadow" id="search_button" @click="search">
                      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                        <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div style="margin-top: 30px;">
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">一站式学术成果分享平台</el-text>
                    </div>
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">完善的检索与展示系统</el-text>
                    </div>
                    <div class="introList1">
                        <el-icon color="rgb(73, 149, 248)"><Select /></el-icon>
                        <el-text style="margin-left: 20px;" class="mx-1" size="large">ScholarSHIP-载您遨游学术海洋</el-text>
                    </div>
                </div>
                <div class="start">
                    <div style="font-size: 20px;" @click="startNow">
                        快速开始
                        <el-icon><ArrowRightBold /></el-icon>
                    </div>
                </div>
            </div>
            <img style="background:transparent;width: 50vw;" src="/src/assets/images/intro1.png" class="image" />
        </div>
    </div>
</template>


<script setup>
// import router from '@/router'
import { Select, ArrowRightBold, Briefcase, Comment, EditPen, Opportunity, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()

var ok = "文献";

const startNow = () => {
  if (userStore.userInfo.username != '') {
    router.push({ name: 'team' })
  } else {
    router.push({ name: 'login' })
  }
}
const search = () => {
  var name = document.getElementById("text").value;
  if (name == "") {
    ElMessage({
      message: '请勿搜索空字段',
      grouping: true,
      type: 'warning',
    })
    console.log("空字段");
    return;
  }
  if (ok == "文献") {
    console.log("文献+" + name);
  } else if (ok == "学者") {
    console.log("学者+" + name);
  } else {
    console.log("机构+" + name);
  }
  document.getElementById("text").value = "";
}

// const handleCommand = (command: string | number | object) => {
//   ElMessage(`click on item ${command}`)
// }

</script>

<style scoped lang="scss">
#introduction {
  width: 100%;
  min-height: 90vh;
  background: url("/src/assets/images/Jonquil.jpg") center center no-repeat;
  background-size: 100% 100%;
}

#walnuts{
    padding-top: 100px;
    padding-left: 150px;
.container-input {
  position: relative;
}

  #dropdown_span {
    width: 100px;
    border: 0;
    outline: 0;
  }

#dropdown_span :focus{
  max-width: 100px;
  outline: none;
}

  .el-dropdown-link {
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
  }

.input__container {
  position: relative;
  background: rgba(255, 255, 255, 0.664);
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 22px;
  // max-width: 300px;
  height: 66px;
  transition: transform 400ms;
  transform-style: preserve-3d;
  // transform: rotateX(15deg) rotateY(-20deg);
  perspective: 500px;
  transition: 0.7s ease-in-out;

  z-index: 10;
}

  // .input__container :hover{
  //   width: 60vw;
  //   transition: 0.7s ease-in-out;
  // }


  #search_button {
    width: 60px;
  }


  .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(30px);
    border-radius: 20px;
    background-color: #999cff;
    background-image: radial-gradient(at 85% 51%, hsla(60, 60%, 61%, 1) 0px, transparent 50%),
      radial-gradient(at 74% 68%, hsla(235, 69%, 77%, 1) 0px, transparent 50%),
      radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
      radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
      radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
      radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
      radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
  }


  .input__button__shadow {
    cursor: pointer;
    border: none;
    background: none;
    transition: transform 400ms, background 400ms;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 5px;
  }

  .input__button__shadow:hover {
    background: rgba(255, 255, 255, 0.411);
  }


.input__search {
  width: 100%;
  height: 80%;
  border-radius: 20px;
  outline: 2px solid #4995f8;
  border: none;
  padding: 8px;
  position: relative;
  z-index: 999;
}
}


.introList1{
    margin-bottom: 15px;
    transition: 0.3s;
    z-index: 999;
}

.introList1 :hover{
  scale: 1.25;
  transition: 0.3s;
}

.introList2 {
  margin-bottom: 30px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
}

.introList3 {
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
  cursor: pointer;
  background-color: #f8d9f883;
  box-shadow: 1px 1px 10px #888888;
  /* color: #79bbff; */
  color: rgb(73, 149, 248);
}

#intro2 {
  padding-top: 50px;
  padding-left: 50px;
  margin-bottom: 500px;
}

#intro3 {
  padding-left: 50px;
  margin-bottom: 500px;
}

#intro4 {
  padding-left: 50px;
  margin-bottom: 500px;
}

#intro5 {
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
  box-shadow: 0px 0px 5px 3px rgba(152, 150, 150, 0.532);
  font-size: 30px;
  font-weight: 900;
}

.card:hover {
  border-radius: 15px;
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0px 0px 5px 3px rgba(152, 150, 150, 0.532);
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
  background: rgba(255, 237, 237, 0.2);
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
  -webkit-background-size: cover;
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
  -webkit-background-size: cover;
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
  -webkit-background-size: cover;
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
}</style>