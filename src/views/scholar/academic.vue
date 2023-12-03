<template>
    <div class="academicContent">
        <div class="essayNum">学者文献共<span>{{essayNum}}</span>篇</div>
        <div class="essayBox" v-for="(essay, index) in displayEssays">
            <div class="essayBox-name" @click="enterEssay(essay)">{{essay.title}}</div>
            <div class="essayBox-author">
                <span v-for="(author, key) in essay.authors" @click="enterScholarPortal(author)">{{author.name}},</span>
            </div>
            <div class="essayBox-abstract">{{essay.abstract}}</div>
            <div class="essay-indicators">
                <span class="essay-indicator">被引用数：{{essay.n_citation}}</span>
                <span class="essay-indicator">发表时间：{{essay.year}}</span>
                <span class="essay-indicator-op" @click="download(essay)">下载</span>
                <span class="essay-indicator-op" @click="cite(essay)">引用</span>
                <span class="essay-indicator-op" @click="collection(essay)">收藏</span>
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
import {useScholarStore} from '../../stores/scholar'

export default {
    name: 'academic',
    components: {

    },
    data() {
        return {
            store: useScholarStore(),
            essayNum: 7,
            displayEssays:[],//记得进入页面时初始化
            essays:[
                {
                    id:1,
                    title: '论文1',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:2,
                    title: '论文2',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:3,
                    title: '论文3',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:4,
                    title: '论文4',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:5,
                    title: '论文5',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:6,
                    title: '论文6',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
                {
                    id:7,
                    title: '论文7',
                    year:2023,
                    n_citation:10,
                    //url,doi,
                    authors:[
                        {
                            name:'作者1',
                        },
                        {
                            name:'作者2',
                        }
                    ],
                    abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
                    keywords:['xxx','bbb'],
                },
            ],
            currentPage: 1,
        }
    },
    methods:{
        currentPageChange(value) {
            this.displayEssays = this.essays.slice( (value-1)*5, 5+(value-1)*5);
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
        download(essay){//下载文献
            console.log('download:',essay);
        },
        cite(essay){//生成文献引用格式
            console.log('cite:',essay);
        },
        collection(essay){//收藏文献
            console.log('collection:',essay);
        },
    },
    created(){
        this.essayNum = this.essays.length;
        this.displayEssays = this.essays.slice(0,5);
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
    max-height: 60px;
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