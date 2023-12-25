<template>
    <div style="overflow: hidden;">
        <span style="margin-left: 1vw; font-weight: bold; text-decoration: underline;"><el-icon size="big"><FolderOpened /></el-icon>{{ libraryStore.labelName }}</span>
        <TransitionGroup name="list2" tag="ul">
            <!-- <el-card class="article-card" v-for="article in displayedArticles" :key="article" @click="readArticle(article)" v-show="show_list">
                
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
                        {{ article.date }}
                        <span style="font-weight:bold;">被引次数：</span>
                        {{ article.cite }}
                        <span>
                            <el-icon style="cursor: pointer;" @click.stop="deleteFromCollection(article)">
                                <Delete />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </el-card> -->
            <div v-for="item in displayedArticles" style="margin-top: 15px" class="article-card" v-show="show_list">
                <div class="res">
                    <div :title="item.title" class="title" @click="readArticle(item)"
                        style="cursor: pointer;  overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">
                        {{ item.title }}</div>
                    <!-- <div>{{ item.title }}</div> -->
                    <!-- <div class="info1">
                        <el-row>
                            <el-col :span="12">
                                <div class="author_holder">
                                    <span
                                        style="margin-left:30px; font-size: 12px; position: relative; top: -5px;">作者：</span>
                                    <span style="cursor: pointer; " class="author" v-for="a in item.author"
                                        @click=gotoAuthor(a) :title="a">{{ a
                                        }}</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="author_holder">
                                    <span
                                        style="margin-left:30px; font-size: 12px; position: relative; top: -5px;">关键词：</span>
                                    <span class="concept_holder" v-for="k in item.keywords" :title="k">{{ k
                                    }}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div> -->
                    <div :title="item.content"
                        style="max-height: 35px; max-width: 95%; margin-top: 5px; margin-left:30px; font-size: 12px; color: #747474; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        {{ item.content }}
                    </div>
                    <div style="margin-left: 27px; margin-top:8px;">
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
                        <el-button size="small" type="primary" plain style="
box-shadow: none;
font-weight: 300;
float: left;
text-align: left;
" @click="getCitation(item)">
                            引用<el-icon>
                                <Link />
                            </el-icon>
                        </el-button>
                        <el-button size="small" type="success" plain style="
box-shadow: none;
font-weight: 300;
float: left;
text-align: left;
" @click="readArticle(item)">
                            详情<el-icon>
                                <DataAnalysis />
                            </el-icon>
                        </el-button>
                        <el-button size="small" type="warning" plain style="
box-shadow: none;
font-weight: 300;
float: left;
text-align: left;
" @click="gourl(item)">
                            来源<el-icon>
                                <Position />
                            </el-icon>
                        </el-button>
                        <el-button size="small" type="warning" plain style="
box-shadow: none;
font-weight: 300;
float: left;
text-align: left;
" @click="pdf(item.pdf)">
                            下载<el-icon>
                                <Download />
                            </el-icon>
                        </el-button>
                        <el-popconfirm width="220" confirm-button-text="确定" confirm-button-type="danger"
                            cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定要移除收藏吗?"
                            @confirm="deleteFromCollection(item)">
                            <template #reference>
                                <el-button size="small" type="danger" plain style="
box-shadow: none;
font-weight: 300;
float: left;
text-align: left;
" onmouseover="this.style.backgroundColor='rgb(245, 108, 108)'; this.style.color = 'white';"
                                    onmouseleave="this.style.backgroundColor='rgb(254, 240, 240)'; this.style.color = 'rgb(245, 108, 125)';">
                                    移除收藏<el-icon>
                                        <FolderDelete />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-popconfirm>

                        <span style="
float: right;
text-align: right;
margin-top: 3px;
color: grey;
font-size: 15px;
margin-right: 150px;
">
                            被引次数：
                            <span style="color: #2d94d4">
                                {{ item.cite_count }}
                            </span>
                        </span>
                        <span style="
float: right;
text-align: right;
margin-top: 3px;
color: grey;
font-size: 15px;
margin-right: 50px;
">
                            发表时间：
                            <span style="color: #2d94d4">
                                {{ item.time }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </TransitionGroup>
        <el-affix :offset="180" style="z-index: 0;" v-if="!articles.length" >
            <el-empty description="还没有收藏的文献"/>
        </el-affix>
        <el-pagination id="page" v-if="articles.length" layout="prev, pager, next" :total=articles.length
            :page-size=entryPerPage @current-change="changePage" />
    </div>
</template>

<script lang="ts" setup>
// import router from "@/router";
// import { useLibraryStore } from "@/stores/library";
// import { useUserStore } from "@/stores/userStore";
// import httpInstance from "@/utils/http";
// import { onBeforeMount, onMounted, watch } from "vue";
// import { reactive, ref } from "vue";
// const libraryStore = useLibraryStore()
// const userStore = useUserStore()
// const userId = userStore.userInfo.userid

// const articles = reactive([])
// const loadArticles = () => {
//     httpInstance.post("star_get_all", {
//         userid: userId,
//         labelId: libraryStore.labelId
//     }).then((res) => {
//         console.log(res.results)
//         articles.splice(0, articles.length, ...res.results)
//         console.log(articles);
//         changePage(1) // 调用一次刷新展示的文章
//     })
// }

// const articles = reactive([
//     {
//         id: "W2160378127",
//         title:
//             "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
//         abstract:
//             "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
//         organization: "Oxford University Press",
//         author: ["1苏云鹤运河运河运河运河", "Daron M. Standley", "syh1", "syh1", "syh1", "Kazutaka Katoh", "Daron M. Standley", "syh1", "syh1", "syh1"],
//         cite: 28654,
//         date: "2013-01-16",
//         keywords: ["sequencesequen cesequ ence", "sesss", "seque456 456456nce", "sequence", "sequence", "sequence", "sequence", "sequence"],
//         source: "Molecular Biology and Evolution",
//     }
// ])

import router from "@/router";
import { useLibraryStore } from "@/stores/library";
import { useUserStore } from "@/stores/userStore";
import httpInstance from "@/utils/http";
import { ElMessage } from "element-plus";
import { onBeforeMount, onMounted, watch} from "vue";
import { reactive, ref } from "vue";
const libraryStore = useLibraryStore()
const userStore = useUserStore()
const userId = userStore.userInfo.userid

const articles = reactive([])
const loadArticles = () => {
    httpInstance.post("star_get_all", {
        userid: userId,
        labelId: libraryStore.labelId
    }).then((res) => {
        console.log(res.results)
        articles.splice(0, articles.length, ...res.results)
        console.log(articles);
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

const citeDialogVisible = ref(false)
const citeString = ref('');
const citeStringIEEE = ref('');
const citeStringGB = ref('');
const citeStringBib = ref('');
const citeStringChicago = ref('');
const format = ref('IEEE');
const getCitation = (item) => {//引用文献
    let work_id = item.article_id
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

const entryPerPage = ref(8) // 每页展示的文章条目
const displayedArticles = reactive([])
const cur_page = ref(1);
const changePage = (val: number) => {
    displayedArticles.splice(0, displayedArticles.length)
    for (let index = 0; index < entryPerPage.value; index++) {
        if (entryPerPage.value * (val - 1) + index < articles.length) {
            displayedArticles.push(articles[entryPerPage.value * (val - 1) + index])
        }
    }
    cur_page.value = val;
    console.log("cur_page:" + cur_page.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const readArticle = (article) => {
    console.log(article.title)
    let articleId = article.article_id
    router.push("/academic/" + articleId)
}

const deleteFromCollection = (article) => {
    console.log("删除收藏论文：" + article.title)
    httpInstance.post("star_delete",{
        userid: userId,
        labelId: libraryStore.labelId,
        articleId: article.article_id,
        isDelete: 0
    }).then((res) => {
        console.log(res)
    })
    let val = cur_page.value;
    const index = displayedArticles.findIndex(item => item.id === article.id);
    if (index !== -1) {
        displayedArticles.splice(index, 1);
    }
    const index1 = articles.findIndex(item => item.id === article.id);
    if (index1 !== -1) {
        articles.splice(index1, 1);
    }
    displayedArticles.splice(0, displayedArticles.length)
    for (let index = 0; index < entryPerPage.value; index++) {
        if (entryPerPage.value * (val - 1) + index < articles.length) {
            displayedArticles.push(articles[entryPerPage.value * (val - 1) + index])
        }
    }
}

var show_list = ref(false)

onBeforeMount(() => {
    changePage(1) // 调用一次，展示第一页的内容
    loadArticles()
})

onMounted(() => {
    show_list.value = true;
})

const toDocument = (id) => {
    var str = "/academic/" + id;
    router.push({ path: str });
};
const gotoAuthor = (name) => {
    var str = "/scholar/" + name;
    router.push({ path: str });
};

</script>

<style setup scoped lang="scss">
.article-card {
    margin-bottom: 10px;
    height: 140px;

    .author_holder {
        /* border: 1px solid black; */
        max-height: 21px;
        overflow: hidden;
    }

    .res:hover {
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
        transition: 0.2s;
    }

    .res {
        height: 120px;
        border: 1px;
        /* background-color: pink; */
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
        background-color: #fafafa;
        border-radius: 5px;
        transition: 0.2s;

        .title {
            padding-left: 30px;
            padding-top: 5px;
            height: 40px;
            line-height: 40px;
            /* background-color: #00810f; */
            font-weight: 15px;
            font-size: 19px;
        }

        .info {}

        .author {
            /* background-color: greenyellow; */
            border: solid 1px;
            color: rgb(45, 118, 80);
            margin: 15px 5px 0 0;
            padding: 0 5px 0 5px;
            border-radius: 5px;
            /* background-color: gray; */
            font-size: 12px;
            max-width: 5vw;
            max-height: 22px;
            overflow: hidden;
            display: -webkit-inline-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-top: 0;
        }

        .author :hover {
            background-color: rgb(45, 118, 80);
            color: white;
        }

        .concept_holder {
            border: solid 1px;
            background-color: rgb(45, 118, 80);
            margin: 15px 5px 0 0;
            padding: 0 5px 0 5px;
            border-radius: 5px;
            color: rgb(255, 255, 255);
            font-size: 12px;
            max-width: 5vw;
            max-height: 22px;
            overflow: hidden;
            display: -webkit-inline-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-top: 0;
        }
    }
}

.el-card:hover {
    box-shadow: 0 1px 6px rgba(142, 139, 139, 0.932);
    border-color: #eee;
    transition: all 0.3s ease-in-out;
}

.list2-move,
/* 对移动中的元素应用的过渡 */
.list2-enter-active {
    transition: all 0.7s ease;
}

.lis2t-leave-active {
    transition: all 0.3s ease;
}

.list2-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.list2-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list2-leave-active {
    position: absolute;
}
</style>