<template>
    <el-table :data="applicationTable" stripe style="width: 100%">
        <el-table-column align="center" prop="id" label="请求编号" width="80" />
        <el-table-column align="center" prop="user_name" label="用户姓名" width="80" />
        <el-table-column align="center" prop="email" label="邮箱" width="180"/>
        <el-table-column align="center" prop="scholar_name" label="学者姓名" width="80"/>
        <el-table-column align="center" prop="content" label="申请内容" width="180"/>
        <el-table-column align="center" prop="time" label="申请时间" />
        <el-table-column align="center" prop="operation" label="操作">
            <template #default="{ row }">
            <el-button type="success" @click="pass(row.id)" plain round>通过</el-button>
            <el-button type="danger" @click="fail(row.id)" plain round>拒绝</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import httpInstance from "@/utils/http";
import { ElMessage } from "element-plus";
import { onBeforeMount, reactive } from "vue";

const applicationTable = reactive([
// {
//         id: '1',
//         userId: '2',
//         email: '123@qq.com',
//         scholarId: '22',
//         content: '请求成为学者',
//         time: '2023-12-20'
//     },
//     {
//         id: '1',
//         userId: '2',
//         email: '123@qq.com',
//         scholarId: '22',
//         content: '请求成为学者',
//         time: '2023-12-20'
//     },
//     {
//         id: '1',
//         userId: '2',
//         email: '123@qq.com',
//         scholarId: '22',
//         content: '请求成为学者',
//         time: '2023-12-20'
//     },
//     {
//         id: '1',
//         userId: '2',
//         email: '123@qq.com',
//         scholarId: '22',
//         content: '请求成为学者',
//         time: '2023-12-20'
//     },
])
const loadTable = () => {
    httpInstance.post("get_all_apply").then((res) => {
        console.log(res)
        applicationTable.splice(0, applicationTable.length, ...res.data)
    })
}

const pass = (id: string) => {
    console.log("通过id为" + id + "的请求")
    let requestId = id
    httpInstance.post("apply_modify_condition",{
        id: requestId
    }).then((res) => {
        console.log(res)
    })
    ElMessage({
        message: "操作成功！",
        type: 'success',
    })
}
const fail = (id: string) => {
    console.log("拒绝id为" + id + "的请求")
    let requestId = id
    httpInstance.post("apply_refuse_condition",{
        id: requestId
    }).then((res) => {
        console.log(res)
    })
    ElMessage({
        message: "操作成功！",
        type: 'success',
    })
}
onBeforeMount(() => {
    loadTable()
})
</script>

<style scoped>

</style>