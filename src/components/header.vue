<template>
    <el-affix :offset="10">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(255, 255, 255, 0.55)"
      router
    >
      <el-menu-item>
        <div style="font-family: 'Lucida';">ScholarSHIP</div>
      </el-menu-item>
      
      <el-menu-item index="3" style="margin-left: 100px;">高级检索</el-menu-item>

      <el-input
        v-model="input"
        class="w-50 m-2"
        placeholder="ScholarSHIP"
        style="height: 35px;width: 600px;margin-top: 10px;"
      >
      <template #suffix>
        <el-icon @click="search" style="cursor: pointer;"><Search /></el-icon>
      </template>
    </el-input>

      <div class="flex-grow" />
      <el-menu-item v-if="userStore.userInfo.username == ''" index="/login">
        登录 
        <el-divider direction="vertical" /> 
        注册
      </el-menu-item>
      <el-menu-item v-else index="/team">
        已登录，进入首页
      </el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
const input = ref()

const userStore = useUserStore()
const search = () => {
    console.log(input.value);
}
</script>

<style scoped>

#introduction {
  width: 100%;
  min-height: 100vh;
  background: url("/src/assets/images/Jonquil.jpg") center center no-repeat;
  background-size: 100% 100%;
}

.flex-grow {
  flex-grow: 0.9;
}
</style>