<template>
    <div>
        <el-card class="article-card" v-for="article in displayedArticles" :key="article" @click="readArticle(article)">
            <div>
                <div v-if="article && article.title">
                    <span style="font-weight:bold;">标题：</span>
                    {{ article.title }}
                </div>
                <div v-if="article && article.author">
                    <span style="font-weight:bold;">作者：</span>
                    <span v-for="(author, index) in article.author" :key="index">
                        {{ author }}
                        <span v-if="index !== article.author.length - 1">, </span>
                    </span>
                </div>
                <div v-if="article && article.abstract">
                    <span style="font-weight:bold;">摘要：</span>
                    {{ article.abstract }}
                </div>
                <div>
                    <span style="font-weight:bold;">发表时间：</span>
                    {{ article.time }}
                    <span style="font-weight:bold;">被引次数：</span>
                    {{ article.refer }}
                    <span>
                        <el-icon style="cursor: pointer;" @click.stop="deleteFromCollection(article)"><Delete /></el-icon>
                    </span>
                </div>
            </div>
        </el-card>
        <el-affix :offset="180">
            <el-empty description="还没有收藏的文献" v-if="!articles.length"/>
        </el-affix>
        <el-pagination v-if="articles.length" layout="prev, pager, next" :total=articles.length :page-size=entryPerPage @current-change="changePage"/>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import httpInstance from "@/utils/http";
import { onBeforeMount } from "vue";
import { reactive, ref } from "vue";

const articles = reactive([
{
        title: "论文1",
        abstract: "论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1论文1" ,
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文2",
        abstract: "论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2论文2" ,
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文3",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文4",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文5",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文6",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文7",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文8",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文9",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文10",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文11",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    },
    {
        title: "论文12",
        abstract: "这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是论文三的内容这是",
        author: [
            'xqf',
            'abc',
            'xyz'
        ],
        refer: '123',
        time: '1999-09-09'
    }    
])

const entryPerPage = ref(6) // 每页展示的文章条目
const displayedArticles = reactive([])
const changePage = (val: number) => {
  displayedArticles.splice(0, displayedArticles.length)
  for (let index = 0; index < entryPerPage.value; index++) {
    if(entryPerPage.value * (val - 1) + index < articles.length){
        displayedArticles.push(articles[entryPerPage.value * (val - 1) + index])
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const readArticle = (article: string) => {
    console.log(article.title)
    let articleId = 1
    router.push("/academic/:" + articleId)
}

const deleteFromCollection = (article: string) => {
    console.log("删除收藏论文："+article.title)
}

onBeforeMount(() => {
    changePage(1) // 调用一次，展示第一页的内容
})
</script>

<style setup scoped>
.article-card{
    margin-bottom: 20px;
    height: 160px;
}
.el-card:hover {
    box-shadow: 0 1px 6px rgba(142, 139, 139, 0.932);
    border-color: #eee;
    transition: all 0.3s ease-in-out;
}
</style>