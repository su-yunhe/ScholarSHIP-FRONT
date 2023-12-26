<template>
    <div class="academicContent">
        <div class="essayNum">已下架文献共<span>{{essayNum}}</span>篇</div>
        <div class="essayBox" v-for="essay in displayEssays" :key="essay">            
            <div class="essayBox-name" @click="enterEssay(essay)">{{essay.display_name}}</div>
            <div class="essayBox-author">
                <span v-for="author in essay.authors" :key="author" @click="enterScholarPortal(author)">{{author.display_name}},</span>            </div>
            <div class="essayBox-abstract">{{essay.abstract}}</div>
            <div class="essay-indicators">
                <span class="essay-indicator">被引用数：{{essay.cited_by_count}}</span>
                <span class="essay-indicator">发表时间：{{essay.publication_date}}</span>
                <span class="essay-indicator-op" @click="uploadDialog(essay)"><el-icon><RefreshRight /></el-icon>重新上架</span>
            </div>
        </div>
        <!--上架对话框-->
        <el-dialog
            v-model="uploadDialogVisible"
            title="提示"
            width="30%"
        >
        <span>是否重新上架该文献</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="uploadDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="upload">
                确认
                </el-button>
            </span>
            </template>
        </el-dialog>
        <el-pagination
            v-if="essayNum!=0"
            @current-change="currentPageChange"
            v-model:current-page="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="essayNum"
            class="el-pagination">
        </el-pagination>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {useScholarStore} from '../../../stores/scholar'
const scholarStore = useScholarStore();
import httpInstance from '@/utils/http'
const router = useRouter()
const IDForm = ref({
    scholarID: 'A5023888391',
    userID: 1,
})
const essayNum = ref();
const displayEssays = ref([]); // 记得进入页面时初始化
const essayList = ref([]);
const currentPage = ref(1);
let uploadDialogVisible = ref(false);
const uploadEssay= ref({});

onMounted(() => {
    essayList.value = scholarStore.removedEssayList;
    displayEssays.value = essayList.value.slice(0,5);
    essayNum.value = scholarStore.removedEssayList.length;
});

const currentPageChange = (value) => {
    displayEssays.value = essayList.value.slice( (value-1)*5, 5+(value-1)*5);
    currentPage.value = value;
    console.log(`当前页: ${value}`,displayEssays.value);
}
const enterEssay = (essay) => {//进入文献展示页
    console.log('enter essay:',essay,essay.id);
    let essay_id = essay.id.split('/')[3]
    console.log("essay_id:",essay_id)
    router.push(`/academic/${essay_id}`);
}
const enterScholarPortal = (author) => {//进入相应学者门户
    console.log('enter scholar portal:',author);
    let scholar_id = author.id.split('/')[3]
    router.push(`/scholar/${scholar_id}`);
}
const uploadDialog = (essay) => {//上架文献
    uploadEssay.value = essay;
    uploadDialogVisible.value = true;
}
const upload = () => {//上架文献
    let work_id = uploadEssay.value.id.split('/')[3];
    httpInstance.post("/change_status", {work_id: work_id}).then(res => {
        console.log("change_status:", res);
        essayList.value = essayList.value.filter(item=>item != uploadEssay.value);
        displayEssays.value = essayList.value.slice(0,5);
        essayNum.value = essayList.value.length;
        scholarStore.removedEssayList = essayList.value;
        scholarStore.essayList.push(uploadEssay.value);
        scholarStore.essayNum++;
        ElMessage({
            type: 'success',
            message: "重新上架成功"
        })
    })
    uploadDialogVisible.value = false;
}
</script>

<style scoped>
.academicContent{
    /* width: 100%; */
    width: 70%;margin: auto;
    height: auto;
    margin-top: 20px;
    overflow-x: hidden;
}
.essayNum{
    padding-left: 5px;
    padding-bottom: 10px;
}
.essayNum span{
    font-size:25px
}
.essayBox{
    width: 100%;
    height: auto;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin-bottom: 15px;
}
.essayBox-name{
    font-size: large;
    font-weight: bold;
    padding-left: 10px;
    padding-top: 5px;
}
.essayBox-name:hover{
    text-decoration: underline;
}
.essayBox-author{
    color: #7EB5EA;
    padding-left: 10px;
    padding-top: 5px;
}
.essayBox-author span:hover{
    text-decoration: underline;
}
.essayBox-abstract{
    width: 100%;
    max-height: 52px;
    color: gray;
    padding: 10px 20px 10px 10px;

    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.essay-indicators{
    padding-bottom: 10px;
}
.essay-indicator{
    padding: 0 0 10px 10px;
}
.essay-indicator-op{
    float: right;
    padding-right: 30px;
    color: rgb(113, 113, 113);
}
.el-pagination{
    width: 200px;
    margin: auto;
}
</style>