// 个人信息组件
<template>
  <div>
    <el-card class="information" onmouseover=" this.style.scale='1.1'; this.style.backgroundColor='rgba(97, 134, 243,0.8)'; this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px';" onmouseout="this.style.scale='1.0'; this.style.backgroundColor='rgba(97, 134, 243,0.6)'; this.style.boxShadow='none';">
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

const userStore = useUserStore()
const userId = userStore.userInfo.userid
const userName = userStore.userInfo.username

const userIntro = ref("")
const getUserIntro = () => {
  httpInstance.post("", {
    userid: userId
  }).then((res) => {
    console.log(res)
    userIntro.value = res.data
  })
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

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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

onBeforeMount(() => {
  getUserIntro()
})
</script>

<style>
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
}

.information :hover {
  background-color: rgb(97, 134, 243, 0.75);
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