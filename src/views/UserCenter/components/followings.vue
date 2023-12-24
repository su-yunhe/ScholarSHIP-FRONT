// 个人图书馆关注列表的组件
<template>
    <div>
        <el-card class="following-card" onmouseover="this.style.scale='1.1'; this.style.background='linear-gradient(to bottom right, white, rgb(233, 187, 18))'; this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px';" onmouseout="this.style.scale='1.0'; this.style.background='linear-gradient(to bottom right, white, 75%,  rgba(233, 187, 18, 0.8))'; this.style.boxShadow='none';">
            <!-- <el-card class="following-card" onmouseover="this.style.scale='1.1'; this.style.background='linear-gradient(to bottom right, rgb(233, 187, 18), black )'; this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px';" onmouseout="this.style.scale='1.0'; this.style.background='linear-gradient(to bottom right, white, 75%,  rgba(233, 187, 18, 0.8))'; this.style.boxShadow='none';"> -->

            <span style="font-weight: bold;">关注的学者</span>
            <el-divider />
            <el-scrollbar max-height="200px">
                <TransitionGroup name="list" tag="ul">
                    <div v-for="scholar in scholars" :key="scholar" class="text_item" @mouseenter="mouseOver(scholar)"
                        @mouseleave="mouseLeave">
                        <div style="float: left">
                            <el-avatar :size="50" :src="circleUrl" />
                        </div>
                        <div style="margin-left: 20px; float: left;">
                            <div class="following_content" :title="scholar.scholar_name">
                                姓名：{{ scholar.scholar_name }}
                            </div>
                            <div class="following_content" :title="scholar.scholar_introduction">
                                简介：{{ scholar.scholar_introduction }}
                            </div>
                        </div>
                        <div style="margin-left: 5vw;">
                            <el-button v-if="scholarMouseOn === scholar.scholar_id"
                                @click="cancelFollow(scholar)" id="cancel_following_btn" color="red" plain
                                type="danger" size="small" :icon="Close" circle
                                style="float: right; position: relative; left: -0.5vw;"/>
                            <!-- <el-button v-if="scholarMouseOn === scholar.scholar_id"
                                @click="cancelFollow(scholar)" id="cancel_following_btn">取消关注</el-button> -->
                        </div>
                        <div style="clear: both;"></div>
                        <!-- <el-divider /> -->
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
import { onBeforeMount, reactive, ref } from "vue";
import {
    Close
} from '@element-plus/icons-vue'
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const loadFollowings = () => {
    httpInstance.post("get_all_concern", {
        userid: 1
    }).then((res) => {
        console.log(res)
        scholars.splice(0, scholars.length, ...res.results)
    })
}

const scholarMouseOn = ref('')
const mouseOver = (scholar: string) => {
    console.log("当前悬浮在" + scholar.scholar_name)
    scholarMouseOn.value = scholar.scholar_id
}
const mouseLeave = () => {
    scholarMouseOn.value = ''
}
const cancelFollow = (scholar: string) => {
    console.log("取消关注" + scholar.scholar_name)

}

onBeforeMount(() => {
    loadFollowings()
})
const scholars = reactive([])
</script>

<style scoped lang="scss">
.following-card {
    margin: 5%;
    min-height: 100px;
    border-radius: 20px;
    // background-color: rgb(233, 187, 18, 0.6);
    background: linear-gradient(to bottom right, white, 80%,  rgba(233, 187, 18, 0.75));
    transition: all 0.3s;

    .following_content {
        margin-left: 0;
        padding-left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        /*width: 40px;*/
        max-width: 12vw;
        /* border: 1px solid black; */
        display: block;
    }

    #cancel_following_btn{
        /* background-color: white; */
    }

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

// .following-card :hover {
//     background-color: rgb(233, 187, 18, 0.75);
//     transition: all 0.3s;
// }

// .following-card div :hover {
//     background-color: rgba(0, 0, 0, 0);
// }
</style>