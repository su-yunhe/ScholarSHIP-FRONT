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

      <div class="flex-grow" />
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