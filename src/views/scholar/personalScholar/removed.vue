<template>
    <div class="academicContent">
        <div class="essayNum">已下架文献共<span>{{essayNum}}</span>篇</div>
        <div class="essayBox" v-for="(essay, index) in displayEssays">
            <div class="essayBox-name" @click="enterEssay(essay)">{{essay.title}}</div>
            <div class="essayBox-author">
                <span v-for="(author, key) in essay.authors" @click="enterScholarPortal(author)">{{author.name}},</span>
            </div>
            <div class="essayBox-abstract">{{essay.abstract}}</div>
            <div class="essay-indicators">
                <span class="essay-indicator">被引用数：{{essay.n_citation}}</span>
                <span class="essay-indicator">发表时间：{{essay.year}}</span>
                <span class="essay-indicator-op" @click="upload(essay)"><el-icon><RefreshRight /></el-icon>重新上架</span>
            </div>
        </div>
        <el-pagination
            @current-change="currentPageChange"
            :current-page.sync="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="essayNum"
            class="el-pagination">
        </el-pagination>
    </div>
</template>

<script>
import {useScholarStore} from '../../../stores/scholar'

export default {
    name: 'removed',
    components: {

    },
    data() {
        return {
            essayNum: 7,
            displayEssays:[],//记得进入页面时初始化
            essayList: [],
            currentPage: 1,
        }
    },
    methods:{
        currentPageChange(value) {
            this.displayEssays = this.essayList.slice( (value-1)*5, 5+(value-1)*5);
            this.currentPage = value;
            console.log(`当前页: ${value}`,this.displayEssays);
        },
        enterEssay(essay){//进入文献展示页
            console.log('enter essay:',essay,essay.name);
            this.$router.push('/academic');
        },
        enterScholarPortal(author){//进入相应学者门户
            console.log('enter scholar portal:',author);
        },
        upload(essay){//上传文献
            console.log('upload:',essay);
        },
    },
    created(){
        const scholarStore = useScholarStore();
        this.essayList = scholarStore.removedEssayList;
        this.essayNum = this.essayList.length;
        this.displayEssays = this.essayList.slice(0,5);
    }
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