<template>
    <div class="scholarContainer">
        <!-- <div class="scholarMainbody">
            <div class="scholarTopHeaderBar">
                <img src="../../assets/scholarAvator.jpg" width="150" height="150" class="scholarAvator">
                <div class="scholar-information">
                    <div class="scholar-information-name">{{ scholarInfo.real_name }}</div>
                    <div class="scholar-information-organization">{{ scholarInfo.organization }}</div>
                    <div class="scholar-information-brief">{{ scholarInfo.introdunction }}</div>
                    <div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ essayNum }}</div>
                            <div class="scholar-indicator-dec">文献数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ citationNum }}</div>
                            <div class="scholar-indicator-dec">被引数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ impactIndex }}</div>
                            <div class="scholar-indicator-dec">影响力指数</div>
                        </div>
                    </div>
                </div>
                <button class="scholar-operation op-claim" @click="claimPortal">认领门户</button>
                <button class="scholar-operation op-concern" @click="concernScholar">关注学者</button>

                <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
                <button class="scholarNav scholarNav2" @click="clickDatas">数据</button>
                <button class="scholarNav scholarNav3" @click="clickLinks">圈子</button>
            </div>
            <div class="scholar-tagContent">
                <component :is="tagName"></component>
            </div>
        </div> -->
        
            <div class="scholarTopHeaderBar">
                <img src="../../assets/images/scholarAvator.jpg" width="150" height="150" class="scholarAvator">
                <div class="scholar-information">
                    <div class="scholar-information-name">{{ scholarInfo.real_name }}</div>
                    <div class="scholar-information-organization">{{ scholarInfo.organization }}</div>
                    <div class="scholar-information-brief">{{ scholarInfo.introdunction }}</div>
                    <div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ essayNum }}</div>
                            <div class="scholar-indicator-dec">文献数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ citationNum }}</div>
                            <div class="scholar-indicator-dec">被引数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ impactIndex }}</div>
                            <div class="scholar-indicator-dec">影响力指数</div>
                        </div>
                    </div>
                </div>
                <button class="scholar-operation op-claim" @click="claimPortal">认领门户</button>
                <button class="scholar-operation op-concern" @click="concernScholar">关注学者</button>

                <button class="scholarNav scholarNav1" @click="clickAcademic">学术</button>
                <button class="scholarNav scholarNav2" @click="clickDatas">数据</button>
                <button class="scholarNav scholarNav3" @click="clickLinks">圈子</button>
            </div>
            <div class="scholar-tagContent">
                <component :is="tagName"></component>
            </div>
        
    </div>
</template>

<script>
import {useScholarStore} from '../../stores/scholar'

import academic from './academic.vue';
import links from './links.vue';
import datas from './datas.vue';
export default {
    name: 'scholar',
    components: {
        academic,
        links,
        datas,
    },
    data() {
        return {
            store: useScholarStore(),
            tagName:'academic',
            scholarInfo:{
                scholar_id:1,
                organization:'BUAA',
                introdunction:'balabala',
                real_name:'S.Harmost',
            },
            name:'S.Harmost',
            briefIntrodunction:'xxxxxxxxxxxxx',
            essayNum: 7,
            citationNum: 6,
            impactIndex: 1,
        }
    },
    methods:{
        clickAcademic(){
            if(this.tagName != 'academic'){
                this.tagName = 'academic';
            }
            console.log(this.tagName);
        },
        clickDatas(){
            if(this.tagName != 'datas'){
                this.tagName = 'datas';
            }
            console.log(this.tagName);
        },
        clickLinks(){
            if(this.tagName != 'links'){
                this.tagName = 'links';
            }
            console.log(this.tagName);
        },
        claimPortal(){//认领门户

        },
        concernScholar(){//关注学者

        },
    }
}
</script>

<style>
.scholarContainer {
    margin: 0;
    padding: 0;
    width: 100vw;
    min-height: 100vh;
}
.scholarMainbody{
    margin: auto;
    margin-top: 20px;
    width: 70%;
}
.scholarTopHeaderBar{
    /* width: 100%; */width: 70%;margin: auto;
    height: 200px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: relative;
}
.scholar-tagContent{
    widows: 90%;
    margin: auto;
}
.scholarAvator{
    border-radius: 50%;
    display: inline-block;
    margin-top: 15px;
    margin-left: 40px;
}
.scholar-information{
    display: inline-block;
    margin-left: 60px;
    margin-top: 20px;
    vertical-align: top;
}
.scholar-information-name{
    font-size: 25px;
    font-weight: bold;
}
.scholar-information-organization{
    color: #7EB5EA;
}
/* 如果有机构门户就放着 
.scholar-information-organization:hover{
    text-decoration: underline;
    color: #6a9fd2;
} */
.scholar-indicator{
    display: inline-block;
    margin: 10px 25px 0 0;
}
.scholar-indicator-num{
    text-align: center;
    font-size: 20px;
    font-weight: 500;
}
.scholar-operation{
    position: absolute;
    top: 60px;
}
.op-claim{
    right: 300px;
}
.op-concern{
    right: 200px;
}
.scholarNav{
    width: 80px;
    height: 30px;
    border-style: none;
    border-right-style: solid;
    background-color: rgb(224, 219, 219);
    border-right-color: black;
    border-width: 1px;
    position: absolute;
    bottom: 0;
}
.scholarNav3{
    right: 0;
}
.scholarNav2{
    right: 80px;
}
.scholarNav1{
    right: 160px;
}
.scholarNav:hover{
    background-color: rgb(160, 149, 149);
}

</style>