// 个人图书馆浏览记录的组件
<template>
    <div>
        <el-card class="history-card">
            浏览记录
            <el-divider/>
            <el-scrollbar max-height="200px">
                <div v-for="entry in recordEntries" :key="entry" class="text item">
                    <div>
                        <div>
                            {{ entry.title }}
                        </div>
                        <div>
                            {{ entry.author }}
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
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const recordEntries = reactive([])
const loadRecords = () => {
    httpInstance.post("/api/History_get_all",{
        userid: 1
    }).then((res) => {
        console.log(res)
        // recordEntries.splice(0, recordEntries.length, ...res.data.dataList)
    })
}

onBeforeMount(() => {
    loadRecords()
})
</script>

<style>
.history-card{
    margin: 5%;
}
</style>