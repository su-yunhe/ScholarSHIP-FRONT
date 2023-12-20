<template>
    <div>
        个人图书馆
        <el-container>
            <el-aside width="400px">
                <div>
                    <Infomation></Infomation>
                </div>
                <div>
                    <Screening></Screening>
                </div>
                <div>
                    <Followings></Followings>
                </div>
                <div>
                    <History></History>
                </div>
            </el-aside>
            <el-main>
                <Articles></Articles>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import Followings from './followings.vue'
import Articles from './articles.vue'
import Screening from './screening.vue'
import History from './histories.vue'
import Infomation from './infomation.vue'
</script>