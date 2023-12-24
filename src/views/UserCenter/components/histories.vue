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
                            {{ entry.name }}
                            <el-tag v-if="entry.type == 2">学者</el-tag>
                            <el-tag v-if="entry.type == 1" type="success">文献</el-tag>
                            <el-tag v-if="entry.type == 0" type="warning">机构</el-tag>
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
import { ElMessage } from "element-plus";
import { onBeforeMount, reactive, ref } from "vue";
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const recordEntries = reactive([])

const entryMouseOn = ref('')
const mouseEnter = (entry: string) => {
    console.log("选择记录"+entry.id)
    entryMouseOn.value = entry.id
}
const mouseLeave = () => {
    entryMouseOn.value = ''
}
const deleteEntry = (entry: string) => {
    console.log("删除记录"+entry.id)
    httpInstance.post("History_delete_single",{
        userid: userId,
        id: entry.indexOf,
        isDelete: 0
    }).then((res) => {
        console.log(res)
        loadRecords()
        ElMessage({
            message: '操作成功！',
            type: 'success',
        })
    })
}

const deleteAllEntries = () => {
    console.log("删除所有历史记录")
    httpInstance.post("History_delete_all",{
        userid: userId,
        isDelete: 0
    }).then((res) => {
        console.log(res)
        loadRecords()
        ElMessage({
            message: '操作成功！',
            type: 'success',
        })
    })
}

const loadRecords = () => {
    httpInstance.post("History_get_all",{
        userid: userId
    }).then((res) => {
        console.log(res)
        recordEntries.splice(0, recordEntries.length, ...res.results)
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