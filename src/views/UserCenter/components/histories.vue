// 个人图书馆浏览记录的组件
<template>
    <div>
        <el-card class="history-card" onmouseover=" this.style.scale='1.1'; this.style.backgroundColor='rgba(107, 168, 87,0.8)'; this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px';" onmouseout="this.style.scale='1.0'; this.style.backgroundColor='rgba(107, 168, 87,0.6)'; this.style.boxShadow='none';">
            <div class="tltle"><span style="font-weight: bold;">浏览记录<el-icon style="cursor: pointer;  margin-left: 0.5vw; position: relative; top: 1.5px;" color="red"
                        @click="deleteAllEntries" >
                        <DeleteFilled />
                    </el-icon></span></div>
            <el-divider />
            <el-scrollbar max-height="200px">
                <TransitionGroup name="list" tag="ul">
                    <div v-for="entry in recordEntries" :key="entry" class="text_item" @mouseenter="mouseEnter(entry)"
                        @mouseleave="mouseLeave" id="history_item">
                        <div style="float: left;">
                            <div class="history_content" :title="entry.title" style="font-weight: bold;">
                                {{ entry.title }}
                            </div>
                            <div class="history_content" :title="entry.author">
                                {{ entry.author }}
                            </div>
                            <div class="history_content" style="color: grey;">
                                {{ entry.time }}
                            </div>
                        </div>
                        <span style="max-height: 10px;">
                            <el-button v-if="entryMouseOn == entry.id" @click="deleteEntry(entry)" color="red" plain
                                type="danger" size="small" :icon="Close" circle
                                style="float: right; position: relative; left: -0.5vw;"/>
                            <!-- <el-icon v-if="entryMouseOn == entry.id" style="cursor: pointer;margin-left: 10vw; float:inline-end; position: relative; top: -50px; left: -1vw;" color="red" @click="deleteEntry(entry)" class="delete_item"><Delete /></el-icon> -->
                        </span>
                        <div style="clear: both;"></div>
                    </div>
                </TransitionGroup>
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
import {
    Close
} from '@element-plus/icons-vue'
import { ListItem } from "element-plus";
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const recordEntries = reactive([
{
        id: "1",
        title: "论文1特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长特别长",
        author: "xqf和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者和一堆作者",
        time: '2023-12-21 12:00'
    }, {
        id: "2",
        title: "论文2",
        author: "xqf",
        time: '2023-12-21 12:00'
    }, {
        id: "3",
        title: "论文3",
        author: "xqf",
        time: '2023-12-21 12:00'
    }, {
        id: "4",
        title: "论文4",
        author: "xqf",
        time: '2023-12-21 12:00'
    }
])

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

<style scoped lang="scss">
.history-card {
    margin: 5%;
    min-height: 100px;
    // border: 1px solid;
    border-radius: 20px;
    background-color: rgb(107, 168, 87, 0.75);
    transition: all 0.3s ease;

    .text_item {
        padding-top: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid whitesmoke;
        min-height: 70px;
        transition: all 0.3s;
    }

    .text_item:hover {
        // border: 2px solid;
        cursor: pointer;
        background-color: rgba(235, 235, 235, 0.75);
        transition: all 0.3s;
    }

    .history_content {
        // font-size: 14px;
        margin-left: 0;
        padding-left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        /*width: 40px;*/
        max-width: 17vw;
        display: block;
    }

    .list-move,
    /* 对移动中的元素应用的过渡 */
    .list-enter-active {
        transition: all 0.3s ease;
    }

    .list-leave-active {
        transition: all 0.3s ease;
    }

    .list-enter-from {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
    .list-leave-active {
        position: absolute;
    }
}

// .history-card :hover {
//   background-color: rgb(107, 168, 87, 0.75);
//   transition: all 1s;
// }

// .history-card div :hover{
//   background-color: rgba(0,0,0,0);
// }

// #history_item {
//     border: 2px solid black;
//     border-radius: 10px;
//     border-bottom: 1px solid white;
//     margin-bottom: 10px;
//     padding-bottom: 10px;
// }

// #history_item :hover{
//     cursor: pointer;
//     border-radius: 20px;
//     background-color: rgba(255,255,255,0.5);
// }

// #history_item div :hover{
//     cursor: pointer;
//     border: 1px solid black;
//     background-color: rgba(0,0,0,0);
// }
</style>