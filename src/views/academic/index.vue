<template>
    <div class="academicContainer">
        <div class="essay-operation">
            <div class="op-cite" @click="citeDialogVisible = true">引用</div>
            <div class="op-share">分享</div>
            <div class="op-read">阅读</div>
            <div class="op-collection" @click="essayCollection">收藏</div>
        </div>

        <div class="essay-name">{{ essay.title }}</div>
        <div class="essay-author">
            <span v-for="(author, index) in essay.authors" @click="enterScholarPortal(author)">{{ author.name }},</span>
        </div>
        <div class="essay-institution">{{ essay.institution }}</div>
        <div class="essay-abstractBox">
            <div>摘要：</div>
            <div>{{ essay.abstract }}</div>
        </div>
        <!-- 描述信息 -->
        <div class="essay-dec">
            <div>关键词：</div>
            <div>
                <span v-for="(keyword, key) in essay.keywords">{{ keyword }}；</span>
            </div>
            
        </div>
        <div class="essay-dec">
            <div>DOI：</div>
            <div>{{ essay.doi }}</div>
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
            essay:{
                id:1,
                title:'NLP (natural language processing) for NLP (naturallanguage programming)',
                year:2023,
                n_citation:10,
                url:'xx',
                doi:'10.1007/11671299 34',
                abstract:'Natural Language Processing holds great promise for making computer interfaces that are easier to use for people, sincepeople will (hopefully) be able to talk to the computer in their owm language, rather than learn a specialized language otcomputer commands For proeramming. however. thenecessity of a formal proerammine laneuaee for communicating witha computer has always been taken for granted. We would',
                keywords:['xdxxxx','sssddsds'],
                authors:[
                    {
                        name:'Rada Mihalcea'
                    },
                    {
                        name:'Rada Mihalcea'
                    },
                    {
                        name:'Rada Mihalcea'
                    },
                ],
                institution:'CICLing',
            },
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
        }
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
    width: 200px;
    position: absolute;
    top: -20px;
    right: 60px;
}
.op-cite,.op-share,.op-read,.op-collection{
    display: inline-block;
    margin-right: 15px;
}
.essay-name{
    width: 80%;
    text-align: center;
    margin: 50px auto 0;
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
    width: 6%;
    vertical-align: top;
    font-weight: bold;
    display: inline-block;
}
.essay-abstractBox div:last-child{
    width: 94%;
    display: inline-block;
}
.essay-dec{
    width: 80%;
    height: 20px;
    margin: 15px auto 0;
    text-align: left;
}
.essay-dec div:first-child{
    width: 6%;
    font-weight: bold;
    display: inline-block;
}
.essay-dec div:last-child{
    /* color: #7EB5EA; */
    width: 94%;
    display: inline-block;
}

.dialog-footer{
    margin-top: 20px;
    text-align: right;
}
.op-addCollection{
    float: left;
}
</style>