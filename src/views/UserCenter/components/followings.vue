// 个人图书馆关注列表的组件
<template>
    <div>
        <el-card class="following-card">
            关注的学者
            <el-divider/>
            <el-scrollbar max-height="200px">
                <div v-for="scholar in scholars" :key="scholar" class="text item">
                    <div style="float: left;">
                        <el-avatar :size="50" :src="circleUrl" />
                    </div>
                    <div style="margin-left: 80px;">
                        <div>
                            姓名：{{ scholar.scholar_name }}
                        </div>
                        <div>
                            简介：{{ scholar.scholar_introduction }}
                        </div>
                    </div>
                    <el-divider/>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import httpInstance from "@/utils/http";
import axios from "axios";
import { onBeforeMount, reactive } from "vue";
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const loadFollowings = () => {
    httpInstance.post("/api/get_all_concern",{
        userid: 1
    }).then((res) => {
        console.log(res)
        scholars.splice(0, scholars.length, ...res.results)
    })
}

onBeforeMount(() => {
    loadFollowings()
})
const scholars = reactive([])
</script>

<style>
.following-card{
    margin: 5%;
}
</style>