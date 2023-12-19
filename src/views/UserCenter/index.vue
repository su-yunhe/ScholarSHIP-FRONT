<template>
    <div>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </div>
  </template>

<script setup>
import Main from './components/main.vue'
import Header from '@/components/header.vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
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