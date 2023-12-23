<template>
    <div class="academicContainer"
        v-loading="loadingTag"
        element-loading-text="拼命加载中"
        element-loading-background="white"
    >
    <div v-if="!loadingTag">
        <div class="essay-name">{{ essay.title }}</div>
        <div class="essay-author">
            <span v-for="authorship in essay.authorships" :key="authorship" @click="enterScholarPortal(authorship)">{{ authorship.author.display_name }},</span>
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
                <el-tag type="info" v-for="concept in essay.concepts" :key="concept" class="concept">{{ concept.display_name }}</el-tag>
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
            <div>{{ essay.publication_date }}</div>
        </div>
        <div class="essay-operation">
            <el-tag class="op-share" @click="getCitation"><el-icon><Link /></el-icon>引用</el-tag>
            <a :href="essay.primary_location?essay.primary_location.pdf_url:null" target="_blank"><el-tag class="op-read" type="success"><el-icon><Reading /></el-icon>pdf预览</el-tag></a>
            <el-tag class="op-share" type="success" @click="downloadPDF(essay.primary_location?essay.primary_location.pdf_url:null)"><el-icon><Download /></el-icon>pdf下载</el-tag>
            <a :href="essay.primary_location?essay.primary_location.landing_page_url:null" target="_blank" ><el-tag class="op-read" type="danger"><el-icon><View /></el-icon>阅读</el-tag></a>
            <el-tag class="op-collection" @click="essayCollection" type="warning"><el-icon><Star /></el-icon>收藏</el-tag>
        </div>
        <div class="essay-essays">
            <div v-if="referenced_works_num!=0">引用文章</div>
            <a v-for="work in essay.referenced_works" :key="work" :href="work.id" target="_blank">{{ work.title }}</a>
        </div>
        <div class="essay-essays">
            <div v-if="related_works_num!=0">相关文章</div>
            <a v-for="work in essay.related_works" :key="work" :href="work.id" target="_blank">{{ work.title }}</a>
        </div>
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
                <el-button @click="changeFormat(format_)" v-for="format_ in ['IEEE','GB/T7714','BibText','Chicago']" :key="format_">{{ format_ }}</el-button>
                <!-- <span></span> -->
            </div>
        <div class="citeContent">{{ citeString }}</div>
        <div class="dialog-footer">
            <el-button @click="citeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="copyCiteString(citeString)">复 制</el-button>
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
            <el-radio v-for="collection in collections" :key="collection" :label="collection.id">{{ collection.name }}</el-radio>
        </el-radio-group>
        <div class="dialog-footer">
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
        <div class="dialog-footer">
            <el-button @click="addCollectionVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddCollection">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import httpInstance from '@/utils/http'
export default {
    name: 'academic',
    components: {

    },
    data() {
        return {
            loadingTag: true,
            citeDialogVisible: false,
            collectionDialogVisible: false,
            addCollectionVisible:false,
            citeString: '',
            citeStringIEEE: '',
            citeStringGB: '',
            citeStringBib: '',
            citeStringChicago: '',
            collectionId:0,
            collectionName: null,
            referenced_works_num: 0,
            related_works_num:0,
            essay: {},
            format: 'IEEE',
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
        getCitation(){
            let work_id = this.$route.path.split("/")[2];
            this.citeDialogVisible = true;
            httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=IEEE`).then((res) => {
                console.log("get IEEE citation:",res);
                this.citeString = res.result;
                this.citeStringIEEE = res.result;
            }).catch((error)=>{
                console.log("get essay detail error:",error);
            })
            httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=GB/T7714`).then((res) => {
                console.log("get GB citation:",res);
                this.citeStringGB = res.result;
            }).catch((error)=>{
                console.log("get essay detail error:",error);
            })
            httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=BibText`).then((res) => {
                console.log("get Bib citation:",res);
                this.citeStringBib = res.result;
            }).catch((error)=>{
                console.log("get essay detail error:",error);
            })
            httpInstance.get(`/get_citation?work_id=${work_id}&citation_type=Chicago`).then((res) => {
                console.log("get Chicago citation:",res);
                this.citeStringChicago = res.result;
            }).catch((error)=>{
                console.log("get essay detail error:",error);
            })
        },
        changeFormat(format){
            this.format = format;
            console.log('change format to:',this.format);
            if(this.format === 'IEEE')
                this.citeString = this.citeStringIEEE;
            else if(this.format === 'GB/T7714')
                this.citeString = this.citeStringGB
            else if(this.format === 'BibText')
                this.citeString = this.citeStringBib
            else if(this.format === 'Chicago')
                this.citeString = this.citeStringChicago
        },
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
            this.citeDialogVisible = false;
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
            let scholar_id = author.author.id.split('/')[3];
            console.log('enter scholar portal:',scholar_id);
            this.$router.push(`/scholar/${scholar_id}`);
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
        getEssayDetail(work_id, user_id){
            httpInstance.get(`/get_detail?work_id=${work_id}&user_id=${user_id}`).then((res) => {
                console.log("get essay detail:",res,res.result.doi.split('/'));
                this.essay = res.result;
                this.loadingTag = false;
                this.referenced_works_num = 0;
                this.related_works_num = 0;
                let doi = this.essay.doi;
                this.essay.doi = doi.split('/')[3]+'/'+doi.split('/')[4];
            }).catch((error)=>{
                console.log("get essay detail error:",error);
            })
        },
        getReferencedAndRelated(work_id, user_id){
            httpInstance.get(`/get_referenced_related?work_id=${work_id}&user_id=${user_id}`).then((res) => {
                console.log("get referenced and related:",res);
                this.essay.referenced_works = res.result.referenced_works;
                this.essay.related_works = res.result.related_works;
                this.referenced_works_num = this.essay.referenced_works.length;
                this.related_works_num = this.essay.related_works.length;
            }).catch((error)=>{
                console.log("get referenced and related error:",error);
            })
        },
        enterEssay(essay){//进入引用参考文献展示页
            console.log('enter essay:',essay,essay.id);
            let essay_id = essay.id.split('/')[3]
            console.log("essay_id:",essay_id)
            router.push(`/academic/${essay_id}`);
        }
    },
    mounted(){
        this.loadingTag = true;
        let work_id = this.$route.path.split("/")[2];
        let user_id = 1;
        this.getEssayDetail(work_id, user_id);
        
        this.getReferencedAndRelated(work_id, user_id);
        console.log("essay:",this.essay);
    },
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