// 个人图书馆关注列表的组件
<template>
    <div>
        <el-card class="following-card">
            关注的学者
            <el-divider/>
            <el-scrollbar max-height="200px">
                <div v-for="scholar in scholars" :key="scholar" class="text item" @mouseenter="mouseOver(scholar)" @mouseleave="mouseLeave">
                    <div style="float: left">
                        <el-avatar :size="50" :src="circleUrl" />
                    </div>
                    <div style="margin-left: 20px; float: left;">
                        <div>
                            姓名：{{ scholar.scholar_name }}
                        </div>
                        <div>
                            简介：{{ scholar.scholar_introduction }}
                        </div>
                    </div>
                    <div style="float: left;margin-left: 40px;">
                        <el-button v-if="scholarMouseOn === scholar.scholar_id" @click="cancelFollow(scholar)">取消关注</el-button>
                    </div>
                    <div style="clear: both;"></div>
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
import { onBeforeMount, reactive, ref } from "vue";
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const loadFollowings = () => {
    httpInstance.post("get_all_concern",{
        userid: 1
    }).then((res) => {
        console.log(res)
        scholars.splice(0, scholars.length, ...res.results)
    })
}

const scholarMouseOn = ref('')
const mouseOver = (scholar: string) => {
    console.log("当前悬浮在"+scholar.scholar_name)
    scholarMouseOn.value = scholar.scholar_id
}
const mouseLeave = () => {
    scholarMouseOn.value = ''
}
const cancelFollow = (scholar: string) => {
    console.log("取消关注"+scholar.scholar_name)
    
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