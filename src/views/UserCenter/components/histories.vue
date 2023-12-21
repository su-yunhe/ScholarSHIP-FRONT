// 个人图书馆浏览记录的组件
<template>
    <div>
        <el-card class="history-card">
            浏览记录
            <el-icon style="cursor: pointer;" color="red" @click="deleteAllEntries"><Delete /></el-icon>
            <el-divider/>
            <el-scrollbar max-height="200px">
                <div v-for="entry in recordEntries" :key="entry" class="text item" @mouseenter="mouseEnter(entry)" @mouseleave="mouseLeave">
                    <div style="float: left;">
                        <div>
                            {{ entry.title }}
                        </div>
                        <div>
                            {{ entry.author }}
                        </div>
                        <div>
                            {{ entry.time }}
                        </div>
                    </div>
                    <div>
                        <el-icon v-if="entryMouseOn == entry.id" style="cursor: pointer;margin-left: 150px;" color="red" @click="deleteEntry(entry)"><Delete /></el-icon>
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
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const recordEntries = reactive([
    {
        id: "1",
        title: "论文1",
        author: "xqf",
        time: '2023-12-21 12:00'
    },{
        id: "2",
        title: "论文2",
        author: "xqf",
        time: '2023-12-21 12:00'
    },{
        id: "3",
        title: "论文3",
        author: "xqf",
        time: '2023-12-21 12:00'
    },{
        id: "4",
        title: "论文4",
        author: "xqf",
        time: '2023-12-21 12:00'
    }
])

const entryMouseOn = ref('')
const mouseEnter = (entry: string) => {
    console.log("选择记录"+entry.title)
    entryMouseOn.value = entry.id
}
const mouseLeave = () => {
    entryMouseOn.value = ''
}
const deleteEntry = (entry: string) => {
    console.log("删除记录"+entry.title)
}

const deleteAllEntries = () => {
    console.log("删除所有历史记录")
}

const loadRecords = () => {
    httpInstance.post("History_get_all",{
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