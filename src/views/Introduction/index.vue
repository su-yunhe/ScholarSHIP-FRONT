<template>
    <div id="introduction" class="common-layout">
      <el-container>
        <el-header>
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
                <div style="font-family: 'Lucida';">6WALNUTS</div>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>用户案例</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                  <template #title>item four</template>
                  <el-menu-item index="2-4-1">item one</el-menu-item>
                  <el-menu-item index="2-4-2">item two</el-menu-item>
                  <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="3">关于</el-menu-item>
              <el-menu-item index="4">联系我们</el-menu-item>
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
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </div>
  </template>

<script setup>
import Main from './components/main.vue'
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