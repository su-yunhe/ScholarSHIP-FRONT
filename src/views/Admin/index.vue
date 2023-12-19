<template>
    <div>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Aside/>
                </el-aside>
                <el-main>
                    <Main/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import Aside from './components/aside.vue'
import Main from './components/main.vue'
import Header from './components/header.vue'
</script>
