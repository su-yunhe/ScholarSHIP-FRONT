// 个人信息组件
<template>
    <div>
        <el-card class="information">
            <div class="avatar">
                <el-upload 
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
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
                <el-input
                  v-model="introInput"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-if="introInputVisible"
                  type="textarea"
                  placeholder="输入个人介绍"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
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
import { tr } from "element-plus/es/locale"

const userStore = useUserStore()
const userId = userStore.userInfo.userid
const userName = userStore.userInfo.username

const userIntro = ref("")
const getUserIntro = () => {
  httpInstance.post("",{
    userid: userId
  }).then((res) => {
    console.log(res)
    userIntro.value = res.data
  })
}

const introInput = ref('')
const introInputVisible = ref(false)
const editIntro = () => {
  if(!introInputVisible.value){
    introInputVisible.value = true
  }else{
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
.information{
    margin: 5%;
}
.avatar{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>