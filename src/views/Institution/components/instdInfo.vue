<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import * as echarts from 'echarts'
import httpInstance from "@/utils/http";

var thisInsId = "I27837315"
const cited_by_list = ref([])
const works_count_list = ref([])
const score_list = ref([])
const authors_list = ref([])

onMounted(async () => {
  const route = useRoute()
  thisInsId = route.params.essay_id
  let xCord, yCord
  //chart1\2\3\4的定义
  const chartDom1 = document.getElementById('essay-chart-content-chart')
  const essay_chart = echarts.init(chartDom1)
  const chartDom2 = document.getElementById('increase-chart-content-chart')
  const increase_chart = echarts.init(chartDom2)
  const chartDom3 = document.getElementById('scholar-chart-content-chart')
  const scholar_chart = echarts.init(chartDom3)
  const chartDom4 = document.getElementById('global-chart-content-chart')
  const global_chart = echarts.init(chartDom4)
  essay_chart.showLoading()
  increase_chart.showLoading()
  scholar_chart.showLoading()
  global_chart.showLoading()
  await request_institution_range()
  essay_chart.hideLoading()
  increase_chart.hideLoading()
  scholar_chart.hideLoading()
  //chart1
  xCord = []
  yCord = []
  for (let i = 0; i < cited_by_list.value.length; i++) {
    xCord.push(cited_by_list.value[i].year)
    yCord.push(cited_by_list.value[i].cited_by_count)
  }
  let option1 = {
    title: {
      text: '被引用总数',
      textStyle: {
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xCord
    },
    yAxis: {
      type: 'value'
    },
    emphasis: {
      focus: 'self'
    },
    series: [
      {
        data: yCord,
        type: 'bar'
      }
    ]
  }
  essay_chart.setOption(option1)
  //chart2
  xCord = []
  yCord = []
  for (let i = 0; i < works_count_list.value.length; i++) {
    xCord.push(works_count_list.value[i].year)
    yCord.push(works_count_list.value[i].works_count)
  }
  let option2 = {
    title: {
      text: '发布论文总数',
      textStyle: {
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xCord
    },
    yAxis: {
      type: 'value'
    },
    emphasis: {
      focus: 'self'
    },
    series: [
      {
        data: yCord,
        type: 'bar'
      }
    ]
  }
  increase_chart.setOption(option2)
  //chart3
  xCord = []
  yCord = []
  for (let i = 0; i < score_list.value.length; i++) {
    xCord.push(score_list.value[i].display_name)
    yCord.push(score_list.value[i].score)
  }
  let option3 = {
    title: {
      text: '论文评分',
      textStyle: {
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xCord
    },
    yAxis: {
      type: 'value'
    },
    emphasis: {
      focus: 'self'
    },
    series: [
      {
        data: yCord,
        type: 'bar'
      }
    ]
  }
  scholar_chart.setOption(option3)
  //large chart
  await request_institution_authors()
  global_chart.hideLoading()
  const labelOption = {
    show: false,
  }
  xCord = []
  yCord = []
  let yCord1 = []
  for (let i = 0; i < authors_list.value.length; i++) {
    xCord.push(authors_list.value[i].name)
    yCord.push(authors_list.value[i].works_conut)
    yCord1.push(authors_list.value[i].cited_by_count)
  }
  let option4 = {
    title: {
      text: '学者概况',
      textStyle: {
        fontSize: 18
      }
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: xCord,
      axisLabel: {
        show: true,
        interval: 1
      },
      axisPointer: {
        show: true,
        label: {
          show: true,
          formatter: '{value}'
        }
      }
    },
    yAxis: [
      {
        name: '发布论文总数',
        type: 'value',
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'blue'
          }
        },
        scale: true,
        alignTick: true,
        axisLabel: {
          formatter: '{value}/篇'
        }
      },
      {
        name: '被引用总数',
        type: 'value',
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'green'
          }
        },
        scale: true,
        alignTick: true,
        axisLabel: {
          show: true,
          formatter: '{value}/次'
        }
      }
    ],
    series: [
      {
        name: '发布论文总数',
        data: yCord,
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 0
      },
      {
        name: '被引用总数',
        data: yCord1,
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        yAxisIndex: 1
      },
    ]
  }
  global_chart.setOption(option4)


})

async function request_institution_range() {
  try {
    const request = {
      insId: thisInsId//TODO
    }
    const response = await httpInstance.post('/get_institution_range', request)
    cited_by_list.value = response.data.cited_by_count
    works_count_list.value = response.data.works_count
    score_list.value = response.data.score
  } catch (error) {
    console.log(error)
  }
}
async function request_institution_authors() {
  try {
    const request = {
      insId: thisInsId//TODO
    }
    const response = await httpInstance.post('/get_institution_authors', request)
    console.log(response.data)
    authors_list.value = response.data
  } catch (error) {
    alert('request_institution_authors error!')
  }

}
</script>

<template>
  <div id="global-instd">
    <div id="essay-chart" class="card-box">
      <el-card>
        <div id="essay-chart-content">
          <div id="essay-chart-content-chart" style="height: 250px;width: 350px"></div>
        </div>
      </el-card>
    </div>
    <div id="increase-chart" class="card-box">
      <el-card>
        <div id="increase-chart-content">
          <div id="increase-chart-content-chart" style="height: 250px;width: 350px"></div>
        </div>
      </el-card>
    </div>
    <div id="scholar-chart" class="card-box">
      <el-card>
        <div id="scholar-chart-content">
          <div id="scholar-chart-content-chart" style="height: 250px;width: 350px"></div>
        </div>
      </el-card>
    </div>
  </div>
  <div id="global-chart">
    <el-card>
      <div id="global-chart-content">
        <div id="global-chart-content-chart" style="width: 1230px;height: 250px"></div>
      </div>
    </el-card>
  </div>
  <div id="author-list">
    <el-table style="width: 100%" :data="authors_list">
      <el-table-column fixed prop="name" label="名称" />
      <el-table-column prop="works_conut" sortable label="论文发布数量" />
      <el-table-column prop="cited_by_count" sortable label="被引用数量" />
    </el-table>
  </div>
</template>

<style scoped>
#global-instd {
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.card-box {
  width: 400px;
  height: 300px;
}

#global-chart {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#author-list {
  margin: 50px 50px;
  width: 100%;
}
</style>