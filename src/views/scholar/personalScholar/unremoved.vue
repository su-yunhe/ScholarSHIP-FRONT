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
                <span class="essay-indicator-op" @click="remove(essay)"><el-icon><Delete /></el-icon>下架</span>
                <span class="essay-indicator-op" @click="download(essay)"><el-icon><Download /></el-icon>下载</span>
                <span class="essay-indicator-op" @click="cite(essay)"><el-icon><Link /></el-icon>引用</span>
                <span class="essay-indicator-op" @click="collection(essay)"><el-icon><Star /></el-icon>收藏</span>
                
            </div>
        </div>
        <el-pagination
            v-if="essayNum!=0"
            @current-change="currentPageChange"
            :current-page.sync="currentPage"
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

onMounted(() => {
    essayNum.value = 0;
    setTimeout(()=>{
        console.log("unremoved academic paper:",scholarStore.essayList);
        loading();
    }, 3000);
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
const download = (essay) => {//下载文献
    console.log('download:',essay);
}
const downloadPDF = async(pdfUrl) => {//需要注释掉main.js中的mock引用才能打开下载的pdf文件
    const response = await axios.get(pdfUrl,{
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
const cite = (essay) => {//生成文献引用格式
    console.log('cite:',essay);
}
const collection = (essay) => {//收藏文献
    console.log('collection:',essay);
}
const remove = (essay) => {//下架文献
    console.log('remove:',essay,essay.id.split('/')[3]);
    let work_id = essay.id.split('/')[3];
    httpInstance.post("/change_status", JSON.stringify({work_id: work_id})).then(res => {
        console.log("change_status:", res);
        update();
        loading();
    })
}
const update = async() => {
    let scholarID = "A5023888391";
    let userID = 1;
    //unremoved
    await httpInstance.get(`/get_works?author_id=${scholarID}&status=true`).then((res) => {
        if (res.data.error === 0) {
            scholarStore.essayList = res.data.result;
        }
    });
    //removed
    await httpInstance.get(`/get_works?author_id=${scholarID}&status=false`).then((res) => {
        if (res.data.error === 0) {
            scholarStore.removedEssayList = res.data.result;
        }
    });
}
const loading = () => {
    essayList.value = scholarStore.essayList;
    displayEssays.value = essayList.value.slice(0,5);
    essayNum.value = scholarStore.essayList.length;
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