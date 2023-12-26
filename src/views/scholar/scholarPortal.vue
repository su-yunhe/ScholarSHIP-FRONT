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
                </el-button-group>
                </div>
                <div>
                    <!-- 可以通过改变 recognized 和 followed 两个变量 改变显示按钮的状态-->
                    <el-button type="primary" class="scholar-operation op-claim" @click="dialogVisible = true" size="large" v-if="!recognized&&!alreadyRecognized"><el-icon><Promotion /></el-icon>认领门户</el-button>
                    <el-tag type="success" class="scholar-operation op-claim" size="large" v-if="recognized"><el-icon><SuccessFilled /></el-icon>已认证此门户</el-tag>
                    <el-tag type="success" class="scholar-operation op-claim" size="large" v-if="alreadyRecognized&&!recognized"><el-icon><SuccessFilled /></el-icon>平台认证学者</el-tag>
                    <el-button type="primary" class="scholar-operation op-concern" @click="concernScholar" size="large" v-if="!followed"> <el-icon><StarFilled /></el-icon>关注学者</el-button>
                    <el-button type="primary" class="scholar-operation op-concern" @click="cancelConcern" size="large" v-if="followed"> <el-icon color="gold"><StarFilled /></el-icon>取消关注</el-button>
                </div>
                <el-dialog
                    title="认证理由"
                    v-model="dialogVisible"
                    width="50%">
                    <el-input v-model="reason" placeholder="请输入内容"></el-input>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" :disabled="buttonDis" @click="claimPortal">确 定</el-button>
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
import { useScholarStore } from '../../stores/scholar'
import httpInstance from '@/utils/http'
import academic from './academic.vue';
import links from './links.vue';
import datas from './datas.vue';
import { useUserStore } from '@/stores/userStore';
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
            scholarInfo:null,
            essayNum: 0,
            monitoredRoute: null,
            followed: false, // 是否已被当前用户关注
            recognized: false, // 该学者门户是否已被当前用户认领
            alreadyRecognized: false, // 该学者门户是否已被其他用户认领
            userStore: useUserStore(),
            followed: false,
            recognized: false,
            dialogVisible: false,
            reason:'',
            buttonDis: false,
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
        claimPortal(){//认领门户
            this.buttonDis = true
            let Time = new Date()
            console.log(this.scholarInfo.name)
            httpInstance.post("apply_add",{
                userid: this.userStore.userInfo.userid,
                scholarId: this.scholarID,
                email: this.userStore.userInfo.email,
                content: this.reason,
                time: this.dateFtt(" yyyy-MM-dd hh:mm:ss",Time),
                username: this.userStore.userInfo.realname,
                scholarname: this.scholarInfo.name,
                insname: this.scholarInfo.institution
            }).then((res) => {
                console.log(res)
                ElMessage({
                    message: "申请成功，请等待管理员审批",
                    type: 'success',
                })
                this.dialogVisible = false
                this.buttonDis = false
            })
        },
        dateFtt(fmt, date) { 
            var o = {
                "M+": date.getMonth() + 1,     
                "d+": date.getDate(),    
                "h+": date.getHours(),    
                "m+": date.getMinutes(),   
                "s+": date.getSeconds(),    
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()    //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        concernScholar(){//关注学者
            ElMessage({
                message: "关注成功！",
                type: 'success',
            })
            this.followed = true
            httpInstance.post("concern_add",{
                userid: this.userStore.userInfo.userid,
                scholarId: this.scholarID
            }).then((res) => {
                console.log(res)
            })
        },
        cancelConcern(){ // 取消关注
            ElMessage({
                message: "操作成功！",
                type: 'success',
            })
            this.followed = false
            httpInstance.post("concern_delete",{
                userid: this.userStore.userInfo.userid,
                scholarId: this.scholarID
            }).then((res) => {
                console.log(res)
            })
        },
        async getScholarInfo() {
            let userID = 1;
            await httpInstance.post('/get_scholar', { scholarID: this.scholarID, userID: userID }).then(res => res.data).then(res => {
                console.log("get scholarInfo res:", res);
                this.scholarInfo = res;
                this.loadingTag = false;
            });
        },
        async getEssayNum(scholarStore){
            await httpInstance.get(`/get_works_count?author_id=${this.scholarID}`).then(res => {
                console.log("get_works_count:", res);
                scholarStore.essayNum = res.result.works_count;
                this.essayNum = res.result.works_count;
            });
        },
        async getEssayList(scholarStore){
            let round = 1;
            let length = 1;
            for(;length != 0;round++){
                await httpInstance.get(`/get_works?author_id=${this.scholarID}&status=true&count=${round}`).then((res) => {
                length = res.result.length;
                if (length != 0) {
                    let essays = scholarStore.essayList;
                    essays = essays.concat(res.result);
                    scholarStore.essayList = essays;
                }
                
            });
            }
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
            this.getEssayNum(scholarStore);

            this.getScholarInfo(scholarStore);

            this.getEssayList(scholarStore);
            this.getGraphData(scholarStore);
        },
        checkConcern(){
            // 是否已经关注学者
            httpInstance.post("judge_concern",{
                userid: this.userStore.userInfo.userid,
                scholarId: this.scholarID
            }).then((res) => {
                console.log(res)
                if(res.results){
                    this.followed = true
                }else{
                    this.followed = false
                }
            })
        },
        checkRecognize(){
            // 是否已经认领了门户
            httpInstance.post("judge_scholar",{
                userid: this.userStore.userInfo.userid,
                scholarId: this.scholarID
            }).then((res) => {
                console.log(res)
                if(res.results){
                    this.recognized = true
                }else{
                    this.recognized = false
                }
            })
            httpInstance.post("scholar_get_user",{
                scholarId: this.scholarID
            }).then((res) => {
                console.log(res)
                if(res.msg === "学者已被用户认证"){
                    this.alreadyRecognized = true
                }else{
                    this.alreadyRecognized = false
                }
            })
        },
        recordBrowse(){
            let Time = new Date()
            console.log(this.userStore.userInfo.userid)
            console.log(this.scholarID)
            console.log(Time.toLocaleString())
            httpInstance.post("history_add",{
                userid: this.userStore.userInfo.userid,
                type: 2,
                realId: this.scholarID,
                time: Time.toLocaleString
            }).then((res) => {
                console.log("记录浏览：" + res)
            })
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
            this.checkConcern()
            this.checkRecognize()
        },
    },
    beforeMount(){
        this.checkConcern()
        this.checkRecognize()
        this.recordBrowse()
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