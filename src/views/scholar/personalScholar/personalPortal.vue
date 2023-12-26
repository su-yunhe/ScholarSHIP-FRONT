<template>
    <div class="scholarContainer"
        v-loading="loadingTag"
        element-loading-text="拼命加载中"
        element-loading-background="white"
        >
        <div v-if="!loadingTag">
            <div class="scholarTopHeaderBar"
                onmouseover="this.style.boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,rgba(0, 0, 0, 0.07) 0px 16px 16px'; this.style.backgroundColor='rgba(32,32,32)';"
                onmouseout="this.style.boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'; this.style.backgroundColor='rgb(32,32,32,0.8)';">
                <img src="../../../assets/images/scholarAvator.jpg" width="150" height="150" class="scholarAvator">
                <div class="scholar-information">
                    <div class="scholar-information-name">{{ scholarInfo.name }}</div>
                    <div class="scholar-information-organization"><el-icon style="position: relative; top: 2px;"><OfficeBuilding /></el-icon>{{ scholarInfo.institution }}</div>
                    <div style="margin-top: 0px;">
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ essayNum }}</div>
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
                    <el-button type="primary" @click="clickRemoved">
                        已下架文献
                    </el-button>
                </el-button-group>
                <!-- <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
                <button class="scholarNav scholarNav2" @click="clickDatas">数据</button>
                <button class="scholarNav scholarNav3" @click="clickLinks">圈子</button> -->
                <!-- <button class="scholarNav scholarNav4" @click="clickRemoved">已下架文献</button> -->
            </div>
            
            <el-dialog
                title="认证理由"
                v-model="dialogVisible"
                width="50%">
                <el-input v-model="reason" placeholder="请输入内容"></el-input>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="claimPortal">确 定</el-button>
                </div>
            </el-dialog>
                <!-- <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
                <button class="scholar-operation op-claim" @click="claimPortal">认领门户</button>
                <button v-if="!isConcerned" class="scholar-operation op-concern" @click="concernScholar">关注学者</button>
                <button v-else class="scholar-operation op-concern" @click="concernScholar">已关注</button>
                <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
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
import { ref, onMounted, watch } from 'vue'
import {useScholarStore} from '../../../stores/scholar'
import { useUserStore } from '../../../stores/userStore'
import httpInstance from '@/utils/http'
import unremoved from './unremoved.vue';
import links from '../links.vue';
import datas from '../datas.vue';
import removed from './removed.vue';
export default {
components:{
    unremoved,
    datas,
    links,
    removed
},
setup(){
const scholarStore = useScholarStore();
const userStore = useUserStore();
const loadingTag = ref(true);
const tagName = ref('unremoved');
const scholarID =  ref("A5023888391");
const scholarInfo = ref({});
const essayNum =  ref(0);

const clickAcademic = () => {
    if(tagName.value != 'unremoved'){
        tagName.value = 'unremoved';
    }
}
const clickDatas = () => {
    if(tagName.value != 'datas'){
        tagName.value = 'datas';
    }
}
const clickLinks = () => {
    if(tagName.value != 'links'){
        tagName.value = 'links';
    }
}
const clickRemoved = () => {
    if(tagName.value != 'removed'){
        tagName.value = 'removed';
    }
}
const getScholarInfo = async() => {
    await httpInstance.post('/get_scholar', {scholarID : scholarID.value, userID : userStore.userInfo.userid}).then(res => res.data).then(res => {
        console.log("get scholarInfo res:", res);
        scholarInfo.value = res;
    });
}
const getEssayList = async () => {
    let round = 1;
    let length = 1;
    for(;length != 0;round++){
        await httpInstance.get(`/get_works?author_id=${scholarID.value}&status=true&count=${round}`).then((res) => {
        length = res.result.length;
        if (length != 0) {
            let essays = scholarStore.essayList;
            essays = essays.concat(res.result);
            scholarStore.essayList = essays;
            scholarStore.essayNum = essays.length;
            loadingTag.value = false;
            console.log("papers:",scholarStore.essayList);
            essayNum.value = scholarStore.essayNum;
        }
    });
    }
}
const getRemovedEssayList = async () => {
    let round = 1;
    let length = 1;
    for(;length != 0;round++){
        await httpInstance.get(`/get_works?author_id=${scholarID.value}&status=false&count=${round}`).then((res) => {
        length = res.result.length;
        if (length != 0) {
            let essays = scholarStore.removedEssayList;
            essays = essays.concat(res.result);
            scholarStore.removedEssayList= essays;
        }
    });
    }
}
const getGraphData = () => {
    httpInstance.get(`/get_relation_map?root_id=${scholarID.value}`).then(res => {
        console.log("get_relation_map res:", res.result);
        scholarStore.graph_data = res.result;
    })
}
onMounted(() => {
        loadingTag.value = true;
        scholarID.value = userStore.userInfo.scholarId;
        scholarStore.essayList = [];
        // this.getEssayNum(scholarStore);
        getScholarInfo();
        getEssayList();
        getRemovedEssayList();
        getGraphData();
}); 

watch(()=>scholarStore.essayNum, (newVal, oldVal) => {
    console.log("personal scholar监听essayNum:",newVal, oldVal);
    essayNum.value = newVal;
})
return {
    loadingTag,
    tagName,
    scholarID,
    scholarInfo,
    essayNum,
    clickAcademic,
    clickDatas,
    clickLinks,
    clickRemoved,
    getScholarInfo,
    getEssayList,
    getRemovedEssayList,
    getGraphData
}
}
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