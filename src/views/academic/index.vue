<template>
    <div class="academicContainer">
        <div class="essay-name">{{ essay.title }}</div>
        <div class="essay-author">
            <span v-for="(authorship, index) in essay.authorships" @click="enterScholarPortal(authorship)">{{ authorship.author.display_name }},</span>
        </div>
        <!-- <div class="essay-institution">{{ essay.institutions[0].display_name }}</div> -->
        <div class="essay-abstractBox">
            <div>摘要：</div>
            <div>{{ essay.abstract }}</div>
        </div>
        <!-- 描述信息 -->
        <div class="essay-dec">
            <div>相关词条：</div>
            <div>
                <el-tag type="info" v-for="(concept, key) in essay.concepts" class="concept">{{ concept.display_name }}</el-tag>
                <!-- <span></span> -->
            </div>
            
        </div>
        <div class="essay-dec">
            <div>DOI：</div>
            <div>{{ essay.doi }}</div>
        </div>
        <div class="essay-dec">
            <div>被引数：</div>
            <div>{{ essay.cited_by_count }}</div>
        </div>
        <div class="essay-dec">
            <div>发表年份：</div>
            <div>{{ essay.doi }}</div>
        </div>
        <div class="essay-operation">
            <el-tag class="op-share" @click="citeDialogVisible = true"><el-icon><Link /></el-icon>引用</el-tag>
            <a :href="essay.primary_location?essay.primary_location.pdf_url:null" target="_blank"><el-tag class="op-read" type="success"><el-icon><Reading /></el-icon>pdf预览</el-tag></a>
            <el-tag class="op-share" type="success" @click="downloadPDF(essay.primary_location?essay.primary_location.pdf_url:null)"><el-icon><Download /></el-icon>pdf下载</el-tag>
            <a :href="essay.primary_location?essay.primary_location.landing_page_url:null" target="_blank" ><el-tag class="op-read" type="danger"><el-icon><View /></el-icon>阅读</el-tag></a>
            <el-tag class="op-collection" @click="essayCollection" type="warning"><el-icon><Star /></el-icon>收藏</el-tag>
        </div>
        <div class="essay-essays">
            <div>引用文章</div>
            <a v-for="(work,index) in essay.referenced_works" :href="work" target="_blank">{{ work }}</a>
        </div>
        <div class="essay-essays">
            <div>相关文章</div>
            <a v-for="(work,index) in essay.related_works" :href="work" target="_blank">{{ work }}</a>
        </div>
    </div>
    <!-- 引用对话框 -->
    <el-dialog
        title="引用"
        v-model="citeDialogVisible"
        width="30%"
        >
        <div class="citeContent">{{ citeString }}</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="citeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="copyCiteString(citeString);citeDialogVisible = false">复 制</el-button>
        </div>
    </el-dialog>
    <!-- 收藏对话框 -->
    <el-dialog
        title="选择收录文献的收藏夹"
        v-model="collectionDialogVisible"
        width="30%"
        :destroy-on-close="true"
        :show-close="false"
        >
        <el-radio-group v-model="collectionId" @change="collectionChange">
            <el-radio v-for="(collection,index) in collections" :label="collection.id">{{ collection.name }}</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
            <el-button class="op-addCollection" @click="addCollectionVisible = true">新建标签</el-button>
            <el-button @click="cancelCollection">取 消</el-button>
            <el-button type="primary" @click="confirmCollection">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog
        title="新标签名称"
        v-model="addCollectionVisible"
        width="30%"
        >
        <el-input v-model="collectionName" placeholder="请新标签名称..."></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addCollectionVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddCollection">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { useAcademicStore } from '@/stores/academic';
<<<<<<< Updated upstream
import axios from 'axios';
import httpInstance from '@/utils/http'
=======
>>>>>>> Stashed changes
export default {
    name: 'academic',
    components: {

    },
    data() {
        return {
            citeDialogVisible: false,
            collectionDialogVisible: false,
            addCollectionVisible:false,
            citeString: 'yinyongshishisshishiq[1]',
            collectionId:0,
            collectionName: null,
            essay: {},
            // essay:{
            //     id:1,
            //     title:'NLP (natural language processing) for NLP (naturallanguage programming)',
            //     year:2023,
            //     n_citation:10,
            //     url:'xx',
            //     doi:'10.1007/11671299 34',
            //     abstract:'Natural Language Processing holds great promise for making computer interfaces that are easier to use for people, sincepeople will (hopefully) be able to talk to the computer in their owm language, rather than learn a specialized language otcomputer commands For proeramming. however. thenecessity of a formal proerammine laneuaee for communicating witha computer has always been taken for granted. We would',
            //     keywords:['xdxxxx','sssddsds'],
            //     authors:[
            //         {
            //             name:'Rada Mihalcea'
            //         },
            //         {
            //             name:'Rada Mihalcea'
            //         },
            //         {
            //             name:'Rada Mihalcea'
            //         },
            //     ],
            //     institution:'CICLing',
            // },
            collections:[
                {
                    id:1,
                    name:'默认收藏'
                },
                {
                    id:2,
                    name:'收藏x'
                },
                {
                    id:3,
                    name:'默认收藏'
                },
                {
                    id:4,
                    name:'收藏x'
                },
                {
                    id:5,
                    name:'默认收藏'
                },
                {
                    id:6,
                    name:'收藏x'
                },
            ],
            collections_copy:[]
        }
    },
    methods:{
        copyCiteString(content) {
            let aux = document.createElement("input");
            aux.setAttribute("value", content);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            if (content !== null) {
                this.$message.success("引用已复制至剪贴板");
            } else {
                this.$message.error("引用格式为空");
            }
            citeDialogVisible = false;
        },
        async downloadPDF(pdfUrl) {//需要注释掉main.js中的mock引用才能打开下载的pdf文件
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
        },
        enterScholarPortal(author){
            console.log('enter scholar portal:',author);
            this.$router.push('/scholar');
        },
        essayCollection(){
            this.collectionDialogVisible = true;
            this.collections_copy = [...this.collections];
        },
        cancelCollection(){
            this.collectionDialogVisible = false;
            this.collections = [...this.collections_copy];
            this.collections_copy = [];
            this.collectionId = 0;
        },
        confirmCollection(){
            this.collectionDialogVisible = false;
            this.collections_copy = [];
            this.collectionId = 0;
        },
        collectionChange(value){
            console.log('collection change',value);
        },
        confirmAddCollection(){
            //永久添加标签名
            //请求
            //暂时显示
            this.collections.push({id: this.collections[this.collections.length-1].id+1, name:this.collectionName});
            this.collectionName = null;
            this.addCollectionVisible = false;
        },
        getEssayDetail(){
            let work_id = this.$route.path.split("/")[2];
            let author_id = "A5023888392";
            httpInstance.post("/get_detail",{
                work_id:work_id,
                author_id:author_id,
            }).then((res) => {
                console.log(res);
            })
        }
    },
    mounted(){
        const academicStore = useAcademicStore();
<<<<<<< Updated upstream
        this.essay = academicStore.essayDetail;
        this.getEssayDetail();
        console.log("essay:",this.essay);
=======
        this.essay = academicStore.essayInfo;
>>>>>>> Stashed changes
    }
}
</script>

<style>
.academicContainer {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
    position: relative;
}
.essay-operation{
    /* width: 200px;
    position: absolute;
    top: -20px;
    right: 60px; */
    width: 80%;
    margin: 15px auto 0;
}
.op-cite,.op-share,.op-read,.op-collection{
    display: inline-block;
    margin-right: 15px;
}
.essay-name{
    width: 80%;
    text-align: center;
    margin: 30px auto 0;
    font-size: 25px;
    font-weight: bolder;
}
.essay-author,.essay-institution{
    width: 60%;
    text-align: center;
    margin: 15px auto 0;
    color: #506696;
}
.essay-author span:hover{
    text-decoration: underline;
}
.essay-abstractBox{
    width: 80%;
    margin: 15px auto 0;
}
.essay-abstractBox div:first-child{
    width: 8%;
    vertical-align: top;
    font-weight: bold;
    display: inline-block;
}
.essay-abstractBox div:last-child{
    width: 92%;
    display: inline-block;
}
.essay-dec{
    width: 80%;
    height: auto;
    margin: 15px auto 0;
    text-align: left;
}
.essay-dec div:first-child{
    width: 8%;
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
}
.essay-dec div:last-child{
    /* color: #7EB5EA; */
    width: 92%;
    display: inline-block;
}

.essay-dec .concept{
    margin-right: 10px;
    margin-bottom: 10px;
}

.essay-essays{
    width: 80%;
    height: auto;
    margin: 15px auto 0;
    text-align: left;
    font-weight: bold;
}
.essay-essays a{
    display: inline-block;
    font-weight:normal;
    width: 42%;
    margin-left: calc(8%);
    margin-top: 10px;
    color: rgb(118, 139, 205);
}
.essay-essays a:hover{
    text-decoration: underline;
}

.dialog-footer{
    margin-top: 20px;
    text-align: right;
}
.op-addCollection{
    float: left;
}
</style>