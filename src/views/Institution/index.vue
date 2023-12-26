<template>
<div id="global">
  <div id="global-info">
    <div id="institution-info">
      <el-card id="box-card">
        <template #header>
          <div id="box-card-header">
            <div id="school-name"><el-icon size="60px" style="margin-right: 20px"><School /></el-icon>{{school_name}}</div>
            <div id="school-button">
              <el-button type="primary" size="large" @click="jumpToOfficialWebsite">官方网站</el-button>
            </div>
          </div>
        </template>
        <div id="box-card-content">
          <div id="essay" class="box-card-content-box">
            <el-icon size="40px"><Document /></el-icon>
            <div class="content-box">
              <div class="content-box-text">论文数量</div>
              <transition name="essay_trans">
              <div class="content-box-count" v-if="showoff">{{essay_count}}</div>
              </transition>
            </div>
          </div>
          <div id="scholar" class="box-card-content-box">
            <el-icon size="40px"><UserFilled /></el-icon>
            <div class="content-box">
              <div class="content-box-text">学者数量</div>
              <transition name="scholar_trans">
              <div class="content-box-count" v-if="showoff">{{scholar_count}}</div>
              </transition>
            </div>
          </div>
          <div id="quote" class="box-card-content-box">
            <el-icon size="40px"><Share /></el-icon>
            <div class="content-box">
              <div class="content-box-text">被引数量</div>
              <transition name="quote_trans">
              <div class="content-box-count" v-if="showoff">{{quote_count}}</div>
              </transition>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div id="scholar-relation">
      <el-card id="chart-card">
        <div id="chart-card-content">
          <div id="scholar-relation-echarts" style="height: 32vh;width: 28vw"></div>
        </div>
      </el-card>
    </div>
  </div>
  <div id="instd-info">
    <instd-info></instd-info>
  </div>
</div>
</template>

<script setup>
import * as echarts from 'echarts'
import httpInstance from "@/utils/http";
import {Document, School, Share, UserFilled} from "@element-plus/icons-vue";
import {ref, onMounted, onBeforeMount} from "vue";
import {useRoute} from 'vue-router'
import InstdInfo from "@/views/Institution/components/instdInfo.vue";
import { useUserStore } from '@/stores/userStore';

const school_name = ref()
const school_url = ref()
const essay_count = ref()
const scholar_count = ref()
const quote_count = ref()
const scholar_list = ref([])
const showoff = ref(false)

var thisInsId//TODO

onMounted(async ()=>{
  const route =useRoute()
  thisInsId = route.params.essay_id
  let scholarRelationEcharts = echarts.init(document.getElementById('scholar-relation-echarts'))
  scholarRelationEcharts.showLoading()
  await request_basic_info()
  showoff.value=true
  let links = []
  let nodes = []
  let categories = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
  ]
  for(let i=0;i<scholar_list.value.length;i++){
    const data = {
      id: scholar_list.value[i].id,
      name: scholar_list.value[i].name,
      category: Math.floor(Math.random()*(7 - 1 + 1)) + 1, //1-7这7个分类
      symbolSize: Math.random()*(13 - 5) + 5  ,//10-18之间的浮点数
      label:{
        show:Math.floor(Math.random() * 2) !== 0,//随机显示名称
      }
    }
    nodes.push(data)
  }
  scholarRelationEcharts.hideLoading()
  let option = {
    title: {
      text: 'scholar relationship',
    },
    tooltip: {},
    legend: [],
    animationDuration: 1500,
    roam:true,
    animationEasingUpdate: 'quinticInOut',
    series:[
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'circular',
        circular:{
          rotateLabel:false
        },
        data: nodes,
        links: links,
        categories: categories,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.2
        },
        emphasis:{
          focus:'adjacency',
          lineStyle:{
            width:10
          }
        }
      }
    ]
  }
  scholarRelationEcharts.setOption(option)
})

async function request_basic_info(){
  try{
    const requestData={
      insId: thisInsId
    }
    const response = await httpInstance.post('/get_institution_basic', requestData)//TODO:httpInstance
    scholar_list.value = response.data.authors
    quote_count.value = response.data.cite_cout.cited_by_count
    essay_count.value = response.data.work_cout.works_count
    scholar_count.value = response.data.author_count
    school_url.value = response.data.homepage_url.homepage_url
    school_name.value = response.data.display_name//TODO
  }catch (error){
    console.log(error)
  }
}

function jumpToOfficialWebsite(){
  window.location.href = school_url.value
}

const userStore = useUserStore()
const recordBrowse = () => {
  let Time = new Date()
  console.log(thisInsId)
  console.log(Time.toLocaleString())
  httpInstance.post("history_add",{
    userid: userStore.userInfo.userid,
    type: 0,
    realId: thisInsId,
    time: Time.toLocaleString()
  }).then((res) => {
    console.log(res)
  })
}
onBeforeMount(() => {
  recordBrowse() // 记录浏览
})

</script>

<style scoped>

#global{
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#global-info{
  margin: 20px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 300px;
}
#institution-info{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 50px;
  width: 60%;
}
#box-card {
  width: 100%;
}
#box-card #school-name{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  color: black;
  font-weight: bold;
  margin-right: 100px;
}
#box-card #box-card-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#box-card #box-card-content{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  font-size: 18px;
}
#box-card .box-card-content-box{
  display: flex;
  flex-direction: row;
  align-items: center;
}
#box-card .content-box-text{
  color: black;
}
#box-card .content-box-count{
  color: #3d3de8;
}
#box-card .content-box{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#scholar-relation{
  width: 40%;
}
#chart-card{
  height: 35vh;
  width: 30vw;
  margin: 0;
  padding: 0;
}
#chart-card-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.essay_trans-enter-active{
  transition: all 0.3s ease-in;
}
.essay_trans-enter-from{
  opacity: 0;
  transform: translateY(30px);
}
.scholar_trans-enter-active{
  transition: all 0.3s ease-in;
}
.scholar_trans-enter-from{
  opacity: 0;
  transform: translateY(30px);
}
.quote_trans-enter-active{
  transition: all 0.3s ease-in;
}
.quote_trans-enter-from{
  opacity: 0;
  transform: translateY(30px);
}
</style>