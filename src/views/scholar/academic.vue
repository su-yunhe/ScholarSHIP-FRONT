<template>
    <div class="academicContent">
        <div class="essayNum">学者文献共<span>{{essayNum}}</span>篇</div>
        <div class="essayBox" v-for="essay in displayEssays" :key="essay">
            <div class="essayBox-name" @click="enterEssay(essay)">{{essay.display_name}}</div>
            <div class="essayBox-author">
                <span v-for="author in essay.authors" :key="author" @click="enterScholarPortal(author)">{{author.display_name}},</span>            </div>
            <div class="essayBox-abstract">{{essay.abstract}}</div>
            <div class="essay-indicators">
                <span class="essay-indicator">被引用数：{{essay.cited_by_count}}</span>
                <span class="essay-indicator">发表时间：{{essay.publication_date}}</span>
                <a :href="essay.pdf_url" target="_blank"><span class="essay-indicator-op"><el-icon><Reading /></el-icon>pdf预览</span></a>
                <!-- <span class="essay-indicator-op" @click="download(essay.pdf_url)"><el-icon><Download /></el-icon>下载</span> -->
                <span class="essay-indicator-op" @click="getCitation(essay)"><el-icon><Link /></el-icon>引用</span>
                <span class="essay-indicator-op" @click="collection(essay)"><el-icon><Star /></el-icon>收藏</span>
            </div>
        </div>
        <!-- 引用对话框 -->
        <el-dialog
            title="引用"
            v-model="citeDialogVisible"
            width="50%"
            >
            <div>引用格式：</div>
                <div>
                    <el-button @click="changeFormat(format)" v-for="format in ['IEEE','GB/T7714','BibText','Chicago']" :key="format">{{ format }}</el-button>
                </div>
            <div class="citeContent">{{ citeString }}</div>
            <div class="dialog-footer">
                <el-button @click="citeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="copyCiteString(citeString)">复 制</el-button>
            </div>
        </el-dialog>
        <el-pagination
            v-if="essayNum!=0"
            @current-change="currentPageChange"
            v-model:current-page="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            v-model:total="essayNum"
            class="el-pagination">
        </el-pagination>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {useScholarStore} from '../../stores/scholar'
const scholarStore = useScholarStore();
import httpInstance from '@/utils/http'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()
const IDForm = ref({
    scholarID: 'A5023888391',
    userID: 1,
})
const essayNum = ref(0);
const displayEssays = ref([]); // 记得进入页面时初始化
const essayList = ref([]);
const currentPage = ref(1);
let citeDialogVisible = ref(false);
const citeString = ref('');
const citeStringIEEE = ref('');
const citeStringGB = ref('');
const citeStringBib = ref('');
const citeStringChicago = ref('');
const format = ref('IEEE');

onMounted(() => {
    essayNum.value = 0;
    if(scholarStore.essayList.length == 0){
        setTimeout(()=>{
            loading();
            console.log("academic paper:",scholarStore.essayList,essayList.value);
        }, 3000);
        setTimeout(()=>{
            console.log("judge1:",essayList.value.length==0 && scholarStore.essayList.length!=0);
            if(essayList.value.length == 0 && scholarStore.essayList.length!=0){
                loading();
                console.log("academic paper2:",scholarStore.essayList,essayList.value);
            }
        }, 5000);
        setTimeout(()=>{
            console.log("judge2:",essayList.value.length==0 && scholarStore.essayList.length!=0);
            if(essayList.value.length == 0 && scholarStore.essayList.length!=0){
                loading();
                console.log("academic paper3:",scholarStore.essayList,essayList.value);
            }
        }, 7000);
    }
    else{
        loading();
        console.log("academic paper:",scholarStore.essayList,essayNum.value);
    }
    
});
const loading = () => {
    essayList.value = scholarStore.essayList;
    displayEssays.value = essayList.value.slice(0,5);
    essayNum.value = scholarStore.essayList.length;
}
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
    let scholar_id = author.id.split('/')[3];
    console.log('enter scholar portal:',scholar_id);
    router.push(`/scholar/${scholar_id}`);
}
const download = async(pdf_url) => {//下载文献
    const response = await axios.get(pdf_url,{
        responseType: 'blob', // 必须指定为blob类型才能下载
    });
    console.log("download",response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ScholarSHIP文献下载.pdf');
    document.body.appendChild(link);
    link.click();
}
const collection = (essay) => {//收藏文献
    console.log('collection:',essay);
}
const getCitation = (essay) => {//引用文献
    let work_id = essay.id.split("/")[3];
    citeDialogVisible.value = true;
    httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=IEEE`).then((res) => {
        console.log("get IEEE citation:",res);
        citeString.value = res.result;
        citeStringIEEE.value = res.result;
    }).catch((error)=>{
        console.log("get essay detail error:",error);
    })
    httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=GB/T7714`).then((res) => {
        console.log("get GB citation:",res);
        citeStringGB.value = res.result;
    }).catch((error)=>{
        console.log("get essay detail error:",error);
    })
    httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=BibText`).then((res) => {
        console.log("get Bib citation:",res);
        citeStringBib.value = res.result;
    }).catch((error)=>{
        console.log("get essay detail error:",error);
    })
    httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=Chicago`).then((res) => {
        console.log("get Chicago citation:",res);
        citeStringChicago.value = res.result;
    }).catch((error)=>{
        console.log("get essay detail error:",error);
    })
}
const changeFormat = (format_) => {
    format.value = format_;
    console.log('change format to:',format.value);
    if(format.value === 'IEEE')
        citeString.value = citeStringIEEE.value;
    else if(format.value === 'GB/T7714')
        citeString.value = citeStringGB.value;
    else if(format.value === 'BibText')
        citeString.value = citeStringBib.value;
    else if(format.value === 'Chicago')
        citeString.value = citeStringChicago.value;
}
const copyCiteString = (content) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    if (content !== null) {
        ElMessage({
            type: 'success',
            message: '引用已复制至剪贴板',
          })
    } else {
        ElMessage({
            type: 'error',
            message: '引用格式为空',
          })
    }
    citeDialogVisible.value = false;
}
</script>

<style>
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