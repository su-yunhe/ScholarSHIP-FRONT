<template>
    <div>
        <el-container>
            <el-aside width="25vw">
                <transition transition name="fade">
                    <div style="margin: auto; text-align: center; font-size: large; font-weight: bold;"
                        v-show="show_aside[0]">
                        <el-icon style="position: relative; top: 2px;">
                            <Avatar />
                        </el-icon> 个人中心
                    </div>
                </transition>
                <div class="card_left">
                    <transition transition name="fade">
                        <Infomation v-show="show_aside[1]"></Infomation>
                    </transition>
                </div>
                <div class="card_left">
                    <transition transition name="fade">
                        <Screening v-show="show_aside[2]"></Screening>
                    </transition>
                </div>
                <div class="card_left">
                    <transition transition name="fade">
                        <Followings v-show="show_aside[3]"></Followings>
                    </transition>
                </div>
                <div class="card_left">
                    <transition transition name="fade">
                        <History v-show="show_aside[4]"></History>
                    </transition>
                </div>
            </el-aside>
            <el-main>
                <!-- <transition transition name="fade_right"> -->
                    <Articles></Articles>
                <!-- </transition> -->
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to

/* .fade-leave-active, 2.1.8 版本以下 */
    {
    opacity: 0;
    transform: translateX(-50px);
}

/* .card_left :hover{
    scale: 1.02;
} */

/* .fade_right-enter-active,
.fade_right-leave-active {
    transition: all 1s ease;
}

.fade_right-enter-from,
.fade_right-leave-to

    {
    opacity: 0;
    transform: translateX(50px);
} */
</style>

<script setup>
import Followings from './followings.vue'
import Articles from './articles.vue'
import Screening from './screening.vue'
import History from './histories.vue'
import Infomation from './infomation.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { SelectProps } from 'element-plus/es/components/select-v2/src/defaults'

const show_aside = ref([false, false, false, false, false]);



const show_animation = () => {
    show_aside.value[0] = !show_aside.value[0];
}

let i = 0;
const initial_loop = () => {
    if (i < show_aside.value.length) {
        show_aside.value[i] = !show_aside.value[i];
        i++;
        setTimeout(initial_loop, 150); // 暂停 0.15 秒后再次调用循环函数
    }
};

onMounted(() => {
    i = 0;
    initial_loop();
})
</script>