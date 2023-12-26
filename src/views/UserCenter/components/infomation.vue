// 个人信息组件
<template>
  <div>
    <el-card class="information"
      onmouseover="this.style.scale='1.1'; this.style.background='linear-gradient(to bottom right, #fafafa , rgb(97, 134, 243))';"
      onmouseout="this.style.scale='1.0'; this.style.background='linear-gradient(to bottom right, #fafafa 85%,  rgba(97, 134, 243, 0.75))';">
      <div class="avatar">
        <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-avatar v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-avatar v-else :size="100" :src="circleUrl" />
        </el-upload>
      </div>
      <div style="margin-bottom: 10px;">
        <span>
          用户名: {{ userName }}
        </span>
        <span style="margin-left: 10px;">
          <el-tag v-if="recognized" class="ml-2" type="success" @click="toScholar" style="cursor: pointer;, background-color: rgb(240, 249, 235);"><el-icon size="10px"><CircleCheck /></el-icon>认证学者</el-tag>
        </span>
      </div>
      <div>
        <span>
          个人介绍: {{ userIntro }}
        </span>
        <span>
          <Edit @click="editIntro" style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer;" />
          <Transition name="fade">
            <el-input v-model="introInput" :autosize="{ minRows: 2, maxRows: 4 }" v-if="introInputVisible" type="textarea"
              placeholder="输入个人介绍" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
              style="background-color: white;" />
          </Transition>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue"
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useUserStore } from "@/stores/userStore"
import httpInstance from "@/utils/http"
import { onMounted } from "vue"
import router from "@/router"

const userStore = useUserStore()
const userId = userStore.userInfo.userid
const userName = userStore.userInfo.username

const userIntro = userStore.userInfo.introduction
const getUserIntro = () => {

}

const recognized = ref(false)
const scholarId = ref('')
const judge_recognize = () => {
  httpInstance.post("judge_authenticated",{
    userid: userStore.userInfo.userid
  }).then((res) => {
    console.log(res)
    if(res.msg === "用户已认证"){
      recognized.value = true
      scholarId.value = res.results
    }else{
      recognized.value = false
    }
  })
}
const toScholar = () => {
  router.push("/scholar/" + scholarId.value)
}

const introInput = ref('')
const introInputVisible = ref(false)
const editIntro = () => {
  if (!introInputVisible.value) {
    introInputVisible.value = true
  } else {
    introInputVisible.value = false
  }
}
const handleInputConfirm = () => {
  introInput.value = ''
  introInputVisible.value = false
}

const circleUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
const imageUrl = ref()

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(uploadFile.raw)
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('只能上传jpeg格式的图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }
  return true
}

onMounted(() => {
  getUserIntro()
  judge_recognize()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}

.fade-enter-from,
.fade-leave-to

/* .fade-leave-active, 2.1.8 版本以下 */
  {
  opacity: 0;
  transform: translateY(50px);
}

.information {
  margin: 5%;
  border-radius: 20px;
  background-color: rgba(97, 134, 243, 0.75);
  transition: all 0.3s;
  background: linear-gradient(to bottom right, #fafafa 85%, rgba(97, 134, 243, 0.75));
}

.information :hover {
  /* background-color: rgb(97, 134, 243, 0.75); */
  transition: all 0.3s;
}

.information div :hover {
  background-color: rgba(0, 0, 0, 0);
  /* transition: all 0.3s; */
}


.avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>