<template>
    <div class="scholarContainer">
            <div class="scholarTopHeaderBar">
                <img src="../../assets/images/scholarAvator.jpg" width="150" height="150" class="scholarAvator">
                <div class="scholar-information">
                    <div class="scholar-information-name">{{ scholarInfo.name }}</div>
                    <div class="scholar-information-organization">{{ scholarInfo.institution }}</div>
                    <div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.essayNum }}</div>
                            <div class="scholar-indicator-dec">文献数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.citation }}</div>
                            <div class="scholar-indicator-dec">被引数</div>
                        </div>
                        <div class="scholar-indicator">
                            <div class="scholar-indicator-num">{{ scholarInfo.hIndex }}</div>
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


<script setup>
import { ref, onMounted } from 'vue'
import {useScholarStore} from '../../stores/scholar'
import httpInstance from '@/utils/http'
import academic from './academic.vue';
import links from './links.vue';
import datas from './datas.vue';
const scholar = {
  name: 'scholar',
  components: {
    academic,
    links,
    datas,
  },
  setup() {
    const tagName = ref('academic')
    const scholarStore = useScholarStore()
    const IDForm = ref({
        scholarID: 'A5023888391',
        userID: 1,
    })
    const scholarInfo = ref({
        scholar_id:1,
        institution:'BUAA',
        name:'S.Harmost',
        essayNum: 7,//处理
        citation: 6,
        hIndex: 1,
    }
    )
    onMounted(() => {
        httpInstance.post('/get_scholar', IDForm.value).then((res) => {
            if (res.error === 0) {
                console.log("res:", res);
                scholarStore.scholarInfo = res.data
                scholarInfo.value = scholarStore.scholarInfo
            }
        });
        scholarStore.getGraphData()
    })

    const clickAcademic = () => {
      if (tagName.value !== 'academic') {
        tagName.value = 'academic'
      }
      console.log(tagName.value)
    }

    const clickDatas = () => {
      if (tagName.value !== 'datas') {
        tagName.value = 'datas'
      }
      console.log(tagName.value)
    }

    const clickLinks = () => {
      if (tagName.value !== 'links') {
        tagName.value = 'links'
      }
      console.log(tagName.value)
    }

    const claimPortal = () => {
      // 认领门户
    }

    const concernScholar = () => {
      // 关注学者
    }
    return {
      tagName,
      clickAcademic,
      clickDatas,
      clickLinks,
      claimPortal,
      concernScholar,
    }
  },

}
</script>

<style scoped>
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