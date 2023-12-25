<template>
    <div class="scholarContainer" v-loading="loadingTag" element-loading-text="拼命加载中" element-loading-background="white">
        <div v-if="!loadingTag">
            <div class="scholarTopHeaderBar"
                onmouseover="this.style.boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,rgba(0, 0, 0, 0.07) 0px 16px 16px'; this.style.backgroundColor='rgba(32,32,32)';"
                onmouseout="this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'; this.style.backgroundColor='rgb(32,32,32,0.8)';">
                <img src="@/assets/images/scholarAvator.jpg" width="150" height="150" class="scholarAvator">
                <div class="scholar-information">
                    <div class="scholar-information-name">{{ scholarInfo.name }}</div>
                    <div class="scholar-information-organization"><el-icon style="position: relative; top: 2px;"><OfficeBuilding /></el-icon> {{ scholarInfo.institution }}</div>
                    <div style="margin-top: 0px;">
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.essayNum }}</div>
                            <div class="scholar-indicator-dec">文献数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.citation }}</div>
                            <div class="scholar-indicator-dec">被引数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.hIndex }}</div>
                            <div class="scholar-indicator-dec">影响力指数</div>
                        </div>
                    </div>
                    <el-button-group class="scholarNav_new">
                    <el-button type="primary" :autofocus="true" style="outline: 0;" @click="clickAcademic">
                        学术
                    </el-button>
                    <el-button type="primary" @click="clickDatas">
                        数据
                    </el-button>
                    <el-button type="primary" @click="clickLinks">
                        圈子
                    </el-button>
                </el-button-group>
                </div>
                <div>
                    <!-- 可以通过改变 recognized 和 followed 两个变量 改变显示按钮的状态-->
                    <el-button type="primary" class="scholar-operation op-claim" @click="claimPortal" size="large" v-if="!recognized"><el-icon><Promotion /></el-icon>认领门户</el-button>
                    <el-button type="primary" class="scholar-operation op-claim" @click="claimPortal" size="large" v-if="recognized"><el-icon><SuccessFilled /></el-icon>已认证门户</el-button>
                    <el-button type="primary" class="scholar-operation op-concern" @click="concernScholar" size="large" v-if="!followed"> <el-icon><StarFilled /></el-icon>关注学者</el-button>
                    <el-button type="primary" class="scholar-operation op-concern" @click="concernScholar" size="large" v-if="followed"> <el-icon color="gold"><StarFilled /></el-icon>已关注学者</el-button>
                </div>

                <!-- <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
                <button class="scholarNav scholarNav2" @click="clickDatas">数据</button>
                <button class="scholarNav scholarNav3" @click="clickLinks">圈子</button> -->
            </div>
            <div class="scholar-tagContent">
                <component :is="tagName"></component>
            </div>
        </div>
    </div>
</template>

<script>
import { useScholarStore } from '../../stores/scholar'
import httpInstance from '@/utils/http'
import academic from './academic.vue';
import links from './links.vue';
import datas from './datas.vue';
export default {
    name: 'scholar',
    components: {
        academic,
        links,
        datas,
    },
    data() {
        return {
            loadingTag: true,
            tagName: 'academic',
            scholarID: null,
            scholarInfo: null,
            monitoredRoute: null,
            followed: false, // 是否已被当前用户关注
            recognized: false, // 该学者门户是否已被认领
        }
    },
    methods: {
        clickAcademic() {
            if (this.tagName != 'academic') {
                this.tagName = 'academic';
            }
            console.log(this.tagName);
        },
        clickDatas() {
            if (this.tagName != 'datas') {
                this.tagName = 'datas';
            }
            console.log(this.tagName);
        },
        clickLinks() {
            if (this.tagName != 'links') {
                this.tagName = 'links';
            }
            console.log(this.tagName);
        },
        claimPortal() {//认领门户

        },
        concernScholar() {//关注学者

        },
        async getScholarInfo() {
            let userID = 1;
            await httpInstance.post('/get_scholar', { scholarID: this.scholarID, userID: userID }).then(res => res.data).then(res => {
                console.log("get scholarInfo res:", res);
                this.scholarInfo = res;
                this.loadingTag = false;
            });
        },
        async getEssayList(scholarStore) {
            let userID = 1;
            console.log("balabala");
            await httpInstance.get(`/get_works?author_id=${this.scholarID}&status=true`).then((res) => {
                console.log("papers1:", res);
                if (res.error === 0) {
                    scholarStore.essayList = res.result;
                    console.log("papers2:", scholarStore.essayList);
                }
            });
            console.log("balabala2");
        },
        getGraphData(scholarStore) {
            httpInstance.get(`/get_relation_map?root_id=${this.scholarID}`).then(res => {
                console.log("get_relation_map res:", res.result);
                scholarStore.graph_data = res.result;
            })
        },
        loading() {
            this.loadingTag = true;
            this.scholarID = this.$route.path.split("/")[2];
            const scholarStore = useScholarStore();
            scholarStore.essayList = [];
            console.log("清空essayList：", scholarStore.essayList);
            this.getScholarInfo(scholarStore);

            this.getEssayList(scholarStore);
            this.getGraphData(scholarStore);
        }
    },
    created() {
        this.loading();
    },
    watch: {
        $route(newRoute) {
            this.monitoredRoute = newRoute; // 将新的路由信息保存到组件的monitoredRoute属性中
            // 执行其他操作或调用其他方法
            console.log("route:", this.monitoredRoute);
            this.loading();
        },
    },

}
</script>

<style scoped>
.scholarContainer {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
}

.scholarMainbody {
    margin: auto;
    margin-top: 20px;
    width: 70%;
}

.scholarTopHeaderBar {
    /* width: 100%; */
    position: relative;
    top: 20px;
    width: 85%;
    margin: auto;
    height: 180px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: relative;
    transition: all 0.3s;
    border: 1px solid black;
    border-radius: 8% / 50%;
    background-color: rgba(32, 32, 32, 0.8);
    color: white;
}

.scholar-tagContent {
    widows: 90%;
    margin: auto;
}

.scholarAvator {
    border-radius: 50%;
    display: inline-block;
    margin-top: 15px;
    margin-left: 5vw;
}

.scholar-information {
    display: inline-block;
    margin-left: 4vw;
    margin-top: 15px;
    vertical-align: top;
}

.scholar-information-name {
    font-size: 25px;
    font-weight: bold;
}

.scholar-information-organization {
    color: #7EB5EA;
}

/* 如果有机构门户就放着 
.scholar-information-organization:hover{
    text-decoration: underline;
    color: #6a9fd2;
} */
.scholar-indicator {
    display: inline-block;
    margin: 5px 25px 0 0;
}

.scholar-indicator-num {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
}

.scholar-operation {
    position: absolute;
    right: 25vw;
}

.op-claim {
    top: 50px;
}

.op-concern {
    top: 100px;
}

.scholarNav {
    width: 80px;
    height: 30px;
    border-style: none;
    border-right-style: solid;
    background-color: rgb(224, 219, 219);
    border-right-color: black;
    border-width: 1px;
    position: absolute;
    bottom: 0;
}

.scholarNav3 {
    right: 0;
}

.scholarNav2 {
    right: 80px;
}

.scholarNav1 {
    right: 160px;
}

.scholarNav:hover {
    background-color: rgb(160, 149, 149);
}

.scholarNav_new {
    margin-top: 10px;
}
</style>