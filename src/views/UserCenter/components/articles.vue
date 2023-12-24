<template>
    <div style="overflow: hidden;">
        <TransitionGroup name="list" tag="ul">
            <el-card class="article-card" v-for="article in displayedArticles" :key="article" @click="readArticle(article)" v-show="show_list">
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
                    <div v-if="article && article.content">
                        <span style="font-weight:bold;">摘要：</span>
                        {{ article.content }}
                    </div>
                    <div>
                        <span style="font-weight:bold;">发表时间：</span>
                        {{ article.time }}
                        <span style="font-weight:bold;">被引次数：</span>
                        {{ article.refer }}
                        <span>
                            <el-icon style="cursor: pointer;" @click.stop="deleteFromCollection(article)">
                                <Delete />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </el-card>
        </TransitionGroup>
        <el-affix :offset="180">
            <el-empty description="这个收藏夹还没有收藏的文献~" v-if="!articles.length" />
        </el-affix>
        <el-pagination v-if="articles.length" layout="prev, pager, next" :total=articles.length :page-size=entryPerPage
            @current-change="changePage"/>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { useLibraryStore } from "@/stores/library";
import { useUserStore } from "@/stores/userStore";
import httpInstance from "@/utils/http";
import { onBeforeMount, onMounted, watch} from "vue";
import { reactive, ref } from "vue";
const libraryStore = useLibraryStore()
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const articles = reactive([])
const loadArticles = () => {
    httpInstance.post("star_get_all",{
        userid: userId,
        labelId: libraryStore.labelId
    }).then((res) => {
        console.log(res.results)
        articles.splice(0, articles.length, ...res.results)
        changePage(1) // 调用一次刷新展示的文章
    })
}


watch( // 监听store中labelId的值
    () => libraryStore.labelId,
    (newLabelId, oldLabelId) => {
        if (newLabelId !== oldLabelId) {
            loadArticles() // 当 labelId 发生变化时加载文章
        }
    }
)


const entryPerPage = ref(6) // 每页展示的文章条目
const displayedArticles = reactive([])
const changePage = (val: number) => {
    displayedArticles.splice(0, displayedArticles.length)
    for (let index = 0; index < entryPerPage.value; index++) {
        if (entryPerPage.value * (val - 1) + index < articles.length) {
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
    console.log("删除收藏论文：" + article.title)
}

var show_list = ref(false)

onBeforeMount(() => {
    changePage(1) // 调用一次，展示第一页的内容
    loadArticles()
})

onMounted(() => {
    show_list.value = true;
})
</script>

<style setup scoped>
.article-card {
    margin-bottom: 20px;
    height: 160px;
}

.el-card:hover {
    box-shadow: 0 1px 6px rgba(142, 139, 139, 0.932);
    border-color: #eee;
    transition: all 0.3s ease-in-out;
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active{
  transition: all 0.7s ease;
}

.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from{
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
    opacity: 0;
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

</style>