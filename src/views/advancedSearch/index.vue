<template>
  <div v-if="isResult == false" class="main">
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card>
          <div class="title">高级检索</div>

          <el-divider></el-divider>
          <div class="title1">时间范围</div>
          <div class="timeSearch">
            <el-select v-model="minyear" mutiple placeholder="最早年份">
              <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option> </el-select>
            <span> ~ </span>
            <el-select v-model="maxyear" mutiple placeholder="最晚年份">
              <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
            </el-select>
          </div>
          <el-divider></el-divider>
          <div class="title1">标题</div>
          <div v-for="(searchItem, i) in titleRequests" :key="i" style="margin-top: 10px; margin-buttom: 10px">
            <span v-if="i === 0" style="margin-right: 200px"> </span>
            <span v-else style="margin: 0 43px; ">且</span>
            <el-select v-model="searchItem.relation" mutiple style="width: 100px" v-if="i">
              <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
            </el-select>
            <el-select v-model="searchItem.method" mutiple style="width: 100px">
              <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
            </el-select>
            <el-input v-model="searchItem.str" style="width: 300px"></el-input>
            <el-button v-show="i" @click="removeStr(1, i)" style="margin-left: 20px"><el-icon>
                <Minus />
              </el-icon></el-button><el-button v-show="isLast(1, i)" @click="addStr(1)"
              style="margin-left: 20px"><el-icon>
                <Plus />
              </el-icon></el-button>
          </div>

          <el-divider></el-divider>
          <div class="title1">学者</div>
          <div v-for="(searchItem, i) in authorRequests" :key="i" style="margin-top: 10px; margin-buttom: 10px">
            <span v-if="i === 0" style="margin-right: 200px"> </span>
            <span v-else style="margin: 0 43px; ">且</span>
            <el-select v-model="searchItem.relation" mutiple style="width: 100px" v-if="i">
              <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
            </el-select>
            <el-select v-model="searchItem.method" mutiple style="width: 100px">
              <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
            </el-select>
            <el-input v-model="searchItem.str" style="width: 300px"></el-input>
            <el-button v-show="i" @click="removeStr(2, i)" style="margin-left: 20px"><el-icon>
                <Minus />
              </el-icon></el-button><el-button v-show="isLast(2, i)" @click="addStr(2)"
              style="margin-left: 20px"><el-icon>
                <Plus />
              </el-icon></el-button>
          </div>

          <el-divider></el-divider>
          <div class="title1">机构</div>
          <div v-for="(searchItem, i) in institutionRequests" :key="i" style="margin-top: 10px; margin-buttom: 10px">
            <span v-if="i === 0" style="margin-right: 200px"> </span>
            <span v-else style="margin: 0 43px; ">且</span>
            <el-select v-model="searchItem.relation" mutiple style="width: 100px" v-if="i">
              <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
            </el-select>
            <el-select v-model="searchItem.method" mutiple style="width: 100px">
              <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
            </el-select>
            <el-input v-model="searchItem.str" style="width: 300px"></el-input>
            <el-button v-show="i" @click="removeStr(3, i)" style="margin-left: 20px"><el-icon>
                <Minus />
              </el-icon></el-button><el-button v-show="isLast(3, i)" @click="addStr(3)"
              style="margin-left: 20px"><el-icon>
                <Plus />
              </el-icon></el-button>
          </div>

          <el-divider></el-divider>
          <div class="title1">概念</div>
          <div v-for="(searchItem, i) in conceptRequests" :key="i" style="margin-top: 10px; margin-buttom: 10px">
            <span v-if="i === 0" style="margin-right: 200px"> </span>
            <span v-else style="margin: 0 43px; ">且</span>
            <el-select v-model="searchItem.relation" mutiple style="width: 100px" v-if="i">
              <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
            </el-select>
            <el-select v-model="searchItem.method" mutiple style="width: 100px">
              <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
            </el-select>
            <el-input v-model="searchItem.str" style="width: 300px"></el-input>
            <el-button v-show="i" @click="removeStr(4, i)" style="margin-left: 20px"><el-icon>
                <Minus />
              </el-icon></el-button><el-button v-show="isLast(4, i)" @click="addStr(4)"
              style="margin-left: 20px"><el-icon>
                <Plus />
              </el-icon></el-button>
          </div>

          <el-divider></el-divider>
          <button class="btn" @click="search()">
            <span class="box">
              <el-icon style="position: relative; top: 2px;">
                <Search />
              </el-icon>
              开始搜索
            </span>
          </button>
        </el-card></el-col>
      <el-col :span="9">
        <el-card>
          <div class="title2">高级检索使用说明</div>
          <el-divider></el-divider>
          <div>
            高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。<br><br>
            输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。<br><br>
            若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。<br><br>
            例如： <br>
            （1）篇名检索项后输入：神经网络 *
            自然语言，可以检索到篇名包含“神经网络”及“自然语言”的文献。<br>
            （2）主题检索项后输入：(锻造 + 自由锻) *
            裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。<br>
            （3）如果需检索篇名包含“digital library”和“information
            service”的文献，在篇名检索项后输入：'digital library' * 'information service'。<br>
            （4）如果需检索篇名包含“2+3”和“人才培养”的文献，在篇名检索项后输入：'2+3' *
            人才培养。<br>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
  <div v-else class="right">
    <div class="searchBox">
      <div class="menu1">
        <button class="btn" @click="continueSearch()">
          <span class="box">
            <el-icon style="position: relative; top: 2px">
              <Search />
            </el-icon>
            继续搜索
          </span>
        </button>
      </div>
      <div class="search">

      </div>
      <div id="data-chart" class="menu1">
        <button class="btn" @click="showDataChartDialog = true">
          <span class="box">
            <el-icon style="position: relative; top: 2px">
              <Histogram />
            </el-icon>
            对比分析
          </span>
        </button>
      </div>
    </div>
    <div id="selectDialog">
      <el-dialog v-model="showDataChartDialog" title="请选择想要查看的文献" width="70vw">
        <div id="options">
          <el-checkbox-group v-model="selectList"
            style="display: flex; flex-direction: column; align-items: flex-start; flex-wrap: wrap">
            <el-checkbox v-for="(val, index) in paginatedData" :key="index" :label="val.id" size="large"
              style="margin: 10px;padding: 5px;">
              <div style="font-size: 16px;color: black;font-weight: bold">
                {{ index + 1 }}.{{ val.title.slice(0, 90) }}
                <span v-if="val.title.length > 90" style="font-size: 16px;color: black;font-weight: bold">...</span>
              </div>
              <div style="font-size: 14px;color: grey;margin-top: 5px;">
                作者：
                <span style="color: green;max-width: 30vw">{{ val.author.slice(0, 4) }}</span>
                <span v-if="val.author.length > 4" style="color:green;">.etc</span>
                日期：
                <span style="color: dodgerblue;">{{ val.date }}</span>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <template #footer>
          <el-button type="primary" size="large" @click="confirmSelect()" plain>确定</el-button>
        </template>
      </el-dialog>
    </div>
    <div id="chartDialog">
      <el-dialog v-model="showDataChart" style="width: 90vw; height: 90vh">
        <div id="data-chart-dialog" style="height: 80vh; width: 80vw"></div>
      </el-dialog>
    </div>
    <div id="singleChartDialog">
      <el-dialog v-model="showSingleChart" style="width: 90vw; height: 90vh">
        <div id="single_all">
          <el-row>
            <el-col :span="12">
              <div id="single-chart-dialog1" style="height: 80vh; width: 40vw"></div>
            </el-col>
            <el-col :span="12">
              <div id="single-chart-dialog2" style="height: 80vh; width: 40vw"></div>
            </el-col>
          </el-row>


        </div>
      </el-dialog>
    </div>
    <el-skeleton style="width: 100%" :loading="loading" animated :throttle="500" :count="pageSize">
      <template #template>
        <!-- <el-skeleton-item variant="image" style="width: 100%; height: 800px" /> -->
        <div style="padding: 15px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
      <div v-for="item in paginatedData" style="margin-top: 15px">
        <div class="res">
          <div class="title" :title="item.title" style="cursor: pointer;" @click="toDocument(item.id)">
            {{
              item.title }}</div>
          <div class="info1">
            <el-row>
              <el-col :span="12">
                <div class="author_holder">
                  <span style="margin-left:30px; font-size: 12px; position: relative; top: -5px;">作者：</span>
                  <span style="cursor: pointer; " class="author" v-for="a in item.author" @click=gotoAuthor(a)
                    :title="a">{{
                      a
                    }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="author_holder">
                  <span style="margin-left:30px; font-size: 12px; position: relative; top: -5px;">关键词：</span>
                  <span class="concept_holder" v-for="k in item.keywords" :title="k">{{ k
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="
                  max-height: 35px;
                  max-width: 95%;
                  margin-top: 5px;
                  margin-left: 30px;
                  font-size: 12px;
                  color: #747474;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                ">
            {{ item.abstract }}
          </div>

          <div style="margin-left: 27px; margin-top: 8px">
            <el-button size="small" type="primary" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="getCitation(item.id)">
              引用<el-icon>
                <Link />
              </el-icon>
            </el-button>
            <el-button size="small" type="success" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="toDocument(item.id)">
              详情<el-icon>
                <DataAnalysis />
              </el-icon>
            </el-button>
            <el-button size="small" type="warning" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="gourl(item.id)">
              来源<el-icon>
                <Position />
              </el-icon>
            </el-button>
            <el-button size="small" type="warning" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="pdf(item.id)">
              下载<el-icon>
                <Download />
              </el-icon>
            </el-button>
            <el-button size="small" type="primary" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="analyzeStatic(item.id)">
              数据<el-icon>
                <Histogram />
              </el-icon>
            </el-button>
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
                {{ item.cite }}
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
                {{ item.date }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </template>
    </el-skeleton>

    <!-- 引用对话框 -->
    <el-dialog title="引用" v-model="citeDialogVisible" width="50%">
      <div>引用格式：</div>
      <div>
        <el-button v-for="(format_, i) in ['IEEE', 'GB/T7714', 'BibText', 'Chicago']" @click="changeFormat(i)"
          :key="format_">{{ format_ }}</el-button>
        <!-- <span></span> -->
      </div>
      <div class="citeContent">{{ citeString }}</div>
      <div class="dialog-footer">
        <el-button @click="citeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="copyCiteString(citeString.value)">复 制</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, watchEffect, computed, onMounted } from "vue"
import httpInstance from '@/utils/http'
import { useRouter } from "vue-router"
import * as echarts from "echarts"
const router = useRouter()
const citeDialogVisible = ref(false)
const relationChoices = ["包含", "不包含"]
const methodChoices = ["精确", "模糊"]
const titleRequests = ref([
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
]);
const authorRequests = ref([
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
]);
const institutionRequests = ref([
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
]);
const conceptRequests = ref([
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
]);
const minyear = ref(1999);
const maxyear = ref(2023);
const years = ref([
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
  2022,
  2023,
]);
const items = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const pageFullLength = ref()
const citeString = ref("")
const citeStringIEEE = ref("")
const citeStringGB = ref("")
const citeStringBib = ref("")
const citeStringChicago = ref("")
const citeOp = -1
const showSingleChart = ref(false);
const counts_by_year = ref()
const concepts = ref()
const authorships = ref()
const showDataChartDialog = ref(false);
const selectList = ref([]);
const showDataChart = ref(false)
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
})
const cited_by_count = ref([])
const reference_count = ref([])
const related_count = ref([])


const loading = ref(false)
const isResult = ref(false)

const continueSearch = () => {
  items.value = []
  isResult.value = false;
  loading.value = false;
  titleRequests.value = titleRequests.value.slice(0, 1)
  titleRequests.value[0].relation = "包含"
  titleRequests.value[0].method = "精确"
  titleRequests.value[0].str = ""
  authorRequests.value = authorRequests.value.slice(0, 1)
  authorRequests.value[0].relation = "包含"
  authorRequests.value[0].method = "精确"
  authorRequests.value[0].str = ""
  institutionRequests.value = institutionRequests.value.slice(0, 1)
  institutionRequests.value[0].relation = "包含"
  institutionRequests.value[0].method = "精确"
  institutionRequests.value[0].str = ""
  conceptRequests.value = conceptRequests.value.slice(0, 1)
  conceptRequests.value[0].relation = "包含"
  conceptRequests.value[0].method = "精确"
  conceptRequests.value[0].str = ""
}

const addStr = (op) => {
  if (op === 1) {
    titleRequests.value.push({
      relation: "包含",
      method: "精确",
      str: "",
    });
  } else if (op === 2) {
    authorRequests.value.push({
      relation: "包含",
      method: "精确",
      str: "",
    });
  } else if (op === 3) {
    institutionRequests.value.push({
      relation: "包含",
      method: "精确",
      str: "",
    });
  } else if (op === 4) {
    conceptRequests.value.push({
      relation: "包含",
      method: "精确",
      str: "",
    });
  }
}

const removeStr = (op, i) => {
  if (op === 1) {
    titleRequests.value.splice(i, 1)
  } else if (op === 2) {
    authorRequests.value.splice(i, 1)
  } else if (op === 3) {
    institutionRequests.value.splice(i, 1)
  } else if (op === 4) {
    conceptRequests.value.splice(i, 1)
  }
}

const isLast = (op, index) => {
  if (op === 1) {
    return index === titleRequests.value.length - 1;
  } else if (op === 2) {
    return index === authorRequests.value.length - 1;
  } else if (op === 3) {
    return index === institutionRequests.value.length - 1;
  } else if (op === 4) {
    return index === conceptRequests.value.length - 1;
  }
}

const toDocument = (id) => {
  var str = "/academic/" + id;
  window.open(str, "_blank")
}

const getCitation = async (id) => {
  citeDialogVisible.value = true;
  try {
    const [IEEE, GB, Bib, Chicago] = await Promise.all([
      httpInstance.get(`/get_citation?work_id=${id}&citation_type=IEEE`),
      httpInstance.get(`/get_citation?work_id=${id}&citation_type=GB/T7714`),
      httpInstance.get(`/get_citation?work_id=${id}&citation_type=BibText`),
      httpInstance.get(`/get_citation?work_id=${id}&citation_type=Chicago`),
    ]);

    console.log("get IEEE citation:", IEEE);
    citeString.value = IEEE.result;
    citeStringIEEE.value = IEEE.result;
    console.log("get GB citation:", GB);
    citeStringGB.value = GB.result;
    console.log("get Bib citation:", Bib);
    citeStringBib.value = Bib.result;
    console.log("get Chicago citation:", Chicago);
    citeStringChicago.value = Chicago.result;

  } catch (error) {
    console.log("get essay detail error:", error);
  }
}

const changeFormat = (i) => {
  if (i == 0) {
    console.log(1)
    citeString.value = citeStringIEEE
  }

  else if (i == 1) {
    console.log(2)
    citeString.value = citeStringGB
  }


  else if (i == 2) {
    console.log(3)
    citeString.value = citeStringBib
  }

  else if (i == 3) {
    console.log(4)
    citeString.value = citeStringChicago
  }

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
      message: '引用已复制至剪贴板',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '引用为空',
      type: 'warning',
    })
  }
  citeDialogVisible.value = false;
}



const search = async () => {
  loading.value = true
  isResult.value = true
  let op1 = []
  let type1 = []
  let name1 = []
  /* 标题 */
  for (var i = 0; i < titleRequests.value.length; i++) {
    // console.log(titleRequests.value[i])
    if (titleRequests.value[i].str == "") {
      if (titleRequests.value.length === 1) break;
      window.alert("搜索的字符串不能为空")
      return
    }
    if (titleRequests.value[i].relation == "包含") {
      op1.push(1)
    } else {
      op1.push(0)
    }
    type1.push(1)
    name1.push(titleRequests.value[i].str)
  }

  /* 学者 */
  for (var i = 0; i < authorRequests.value.length; i++) {
    // console.log(authorRequests.value[i])
    if (authorRequests.value[i].str == "") {
      if (authorRequests.value.length === 1) break;
      window.alert("搜索的字符串不能为空");
      return;
    }
    if (authorRequests.value[i].relation == "包含") {
      op1.push(1)
    } else {
      op1.push(0)
    }
    type1.push(2)
    name1.push(authorRequests.value[i].str)
  }

  /* 机构 */
  for (var i = 0; i < institutionRequests.value.length; i++) {
    console.log(institutionRequests.value[i])
    if (institutionRequests.value[i].str == "") {
      if (institutionRequests.value.length === 1) break;
      window.alert("搜索的字符串不能为空");
      return;
    }
    if (institutionRequests.value[i].relation == "包含") {
      op1.push(1)
    } else {
      op1.push(0)
    }
    type1.push(3)
    name1.push(institutionRequests.value[i].str)
  }

  /* 概念 */
  for (var i = 0; i < conceptRequests.value.length; i++) {
    console.log(conceptRequests.value[i])
    if (conceptRequests.value[i].str == "") {
      if (conceptRequests.value.length === 1) break;
      window.alert("搜索的字符串不能为空");
      return;
    }
    if (conceptRequests.value[i].relation == "包含") {
      op1.push(1)
    } else {
      op1.push(0)
    }
    type1.push(4)
    name1.push(conceptRequests.value[i].str)
  }
  await httpInstance.post('/SearchManager/AdvancedSearchWork', {
    page: 1,
    min_year: minyear.value,
    max_year: maxyear.value,
    op: op1,
    type: type1,
    name: name1
  }).then(res => {
    loading.value = false
    console.log(res)
    items.value = res.data
  })

}

const request_single_article = async (id) => {
  try {
    const requestData = {
      workId: id,
    };
    const response = await httpInstance.post("/single_work_analysis", requestData);
    console.log(111); //test
    counts_by_year.value = response.data.counts_by_year;
    concepts.value = response.data.concepts;
    authorships.value = response.data.authorships;
  } catch (error) { }
}
var chart1 = null, chart2 = null
const analyzeStatic = async (id) => {
  showSingleChart.value = true;
  if (chart1 != null) chart1.showLoading()
  if (chart2 != null) chart2.showLoading()
  await request_single_article(id)
  const charDom1 = document.getElementById("single-chart-dialog1")
  chart1 = echarts.init(charDom1)
  const charDom2 = document.getElementById("single-chart-dialog2")
  chart2 = echarts.init(charDom2)
  chart1.hideLoading()
  chart2.hideLoading()
  //饼状图
  let data = [];
  for (let i = 0; i < concepts.value.length; i++) {
    const d = {
      value: concepts.value[i].score,
      name: concepts.value[i].display_name,
    };
    data.push(d);
  }
  const option1 = {
    title: {
      text: "概念分析",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "concepts",
        type: "pie",
        radius: "50%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  chart1.setOption(option1);
  //条形图
  let xCord = [],
    yCord = [];
  for (let i = 0; i < counts_by_year.value.length; i++) {
    xCord.push(counts_by_year.value[i].year);
    yCord.push(counts_by_year.value[i].cited_by_count);
  }
  const option2 = {
    title: {
      text: "被引用数量",
      textStyle: {
        fontSize: 18,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xCord,
    },
    yAxis: {
      type: "value",
    },
    emphasis: {
      focus: "self",
    },
    series: [
      {
        data: yCord,
        type: "bar",
      },
    ],
  };
  chart2.setOption(option2);
}

const request_multi_article = async () => {
  try {
    const rd = selectList.value.join(",");
    const requestData = {
      workId: rd,
    };
    console.log(requestData);
    const response = await httpInstance.post("/muti_work_analysis", requestData);
    console.log(response); //TODO
    for (let i = 0; i < response.data.length; i++) {
      cited_by_count.value.push(response.data[i].cited_by_count);
      reference_count.value.push(response.data[i].reference_count);
      related_count.value.push(response.data[i].related_count);
    }
  } catch (error) {
    console.log(error);
  }
}
var data_chart_large = null
const confirmSelect = async () => {
  if (selectList.value.length === 0) return;
  showDataChart.value = true;
  showDataChartDialog.value = false;
  if (data_chart_large != null) data_chart_large.showLoading()
  await request_multi_article();
  const chartDom = document.getElementById("data-chart-dialog");
  data_chart_large = echarts.init(chartDom);
  data_chart_large.hideLoading()
  const option = {
    title: {
      text: "对比分析结果",
      textStyle: {
        fontSize: 18,
      },
    },
    grid: {
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: selectList.value,
      axisLabel: {
        show: true,
        interval: 1,
      },
      axisPointer: {
        show: true,
        label: {
          show: true,
          formatter: "{value}",
        },
      },
    },
    yAxis: [
      {
        name: "相关论文总数",
        type: "value",
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: "blue",
          },
        },
        scale: true,
        alignTick: true,
        axisLabel: {
          formatter: "{value}/篇",
        },
      },
      {
        name: "被引用总数",
        type: "value",
        position: "right",
        axisLine: {
          show: true,
          lineStyle: {
            color: "green",
          },
        },
        scale: true,
        alignTick: true,
        axisLabel: {
          show: true,
          formatter: "{value}/次",
        },
      },
      {
        name: "引用其他论文总数",
        type: "value",
        position: "right",
        offset: 100,
        axisLine: {
          show: true,
          lineStyle: {
            color: "orange",
          },
        },
        scale: true,
        alignTick: true,
        axisLabel: {
          show: true,
          formatter: "{value}/篇",
        },
      },
    ],
    series: [
      {
        name: "相关论文总数",
        data: related_count.value,
        type: "bar",
        barGap: 0,
        emphasis: {
          focus: "series",
        },
        yAxisIndex: 0,
      },
      {
        name: "被引用总数",
        data: cited_by_count.value,
        type: "bar",
        emphasis: {
          focus: "series",
        },
        yAxisIndex: 1,
      },
      {
        name: "引用其他论文总数",
        data: reference_count.value,
        type: "bar",
        emphasis: {
          focus: "series",
        },
        yAxisIndex: 2,
      },
    ],
  };
  data_chart_large.setOption(option);
}
</script>
<style scoped lang = "scss">
.main {
  margin: 10px 20px 0px 20px;
  height: 90vh;

  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;

  }

  .title1 {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    color: rgb(95, 95, 95);
  }

  .timeSearch {
    margin-left: 200px;
  }

  .title2 {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: rgb(95, 95, 95);
  }

  .btn {
    margin-top: 16px;
    margin-left: 380px;

    .box {
      width: 100%;
      height: auto;
      float: left;
      transition: .1s linear;
      position: relative;
      display: block;
      overflow: hidden;
      padding: 15px;
      text-align: center;
      margin: 0 5px;
      background: transparent;
      text-transform: uppercase;
      font-weight: 550;
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    }
  }

  .box:before {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    height: 4px;
    width: 100%;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(100%);
  }

  .box:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(-100%);
  }

  .box:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
  }

  button {
    color: black;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
}

.right {
  height: 1000px;
  margin: 40px 20px 20px 20px;

  .searchBox {
    height: 90px;
    display: flex;
    margin: 40px 0px 20px 0px;
    background-color: rgb(45, 118, 80);

    box-shadow: rgba(45, 118, 80, 10) 0px 2px 8px;
    // border-bottom-left-radius: 5px;
    /* 左下角 */
    //  border-bottom-right-radius: 5px;
    /* 右下角 */

    .menu1 {
      width: 20%;
      line-height: 60px;
      text-align: center;
      font-weight: bold;
      font-size: 15px;

      .btn {
        margin-top: 20px;
        margin-left: 0px;

        .box {
          width: 100%;
          height: auto;
          float: left;
          transition: 0.1s linear;
          position: relative;
          display: block;
          overflow: hidden;
          padding: 15px;
          text-align: center;
          margin: 0 5px;
          background: transparent;
          text-transform: uppercase;
          font-weight: 550;
          border-radius: 30px;
          // color: white;
          background-color: rgb(195, 209, 197);
        }
      }

      .box:before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 4px;
        width: 100%;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(100%);
      }

      .box:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(-100%);
      }

      .box:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
      }


      button {
        color: black;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
      }
    }

    .search {
      width: 60%;
      padding: 10px;

      .container-input {
        position: relative;
      }

      #dropdown_span {
        width: 100px;
        border: 0;
        outline: 0;
      }

      #dropdown_span :focus {
        max-width: 100px;
        outline: none;
      }

      .el-dropdown-link {
        cursor: pointer;
        color: black;
        display: flex;
        align-items: center;
      }

      .input__container {
        position: relative;
        background: rgba(255, 255, 255, 0.664);
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border-radius: 22px;
        max-width: 300px;
        height: 50px;
        transition: transform 400ms;
        transform-style: preserve-3d;
        transform: rotateX(15deg) rotateY(-20deg);
        perspective: 500px;
        transition: 0.7s ease-in-out;
      }

      #search_button {
        width: 60px;
      }


      .input__button__shadow {
        cursor: pointer;
        border: none;
        background: none;
        transition: transform 400ms, background 400ms;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        padding: 5px;
      }

      .input__button__shadow:hover {
        background: rgba(255, 255, 255, 0.411);
      }

      .input__search {
        width: 1000px;
        height: 30px;
        border-radius: 20px;
        outline: 1px solid rgb(45, 118, 80);
        border: none;
        padding: 20px;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        transition: 0.7s;
      }

      .input__search:hover {
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
          rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
          rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
        transition: 0.7s;
      }

    }

    .menu2 {
      width: 15%;
      line-height: 60px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;

      .btn {
        margin-top: 5px;

        .box {
          width: 100%;
          height: auto;
          float: left;
          transition: 0.1s linear;
          position: relative;
          display: block;
          overflow: hidden;
          padding: 15px;
          text-align: center;
          margin: 0 5px;
          background: transparent;
          text-transform: uppercase;
          font-weight: 900;
          border-radius: 10px;
        }
      }

      // background-color: rgb(255, 192, 192);

      .box:before {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        height: 4px;
        width: 100%;
        border-bottom: 4px solid transparent;
        border-left: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(100%);
      }

      .box:after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        box-sizing: border-box;
        transform: translateX(-100%);
      }

      .box:hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 2px 0px;
      }

      button {
        color: black;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
      }
    }
  }

  .res:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
    transition: 0.2s;
  }

  .author_holder {
    /* border: 1px solid black; */
    max-height: 21px;
    overflow: hidden;
  }

  .res {
    height: 145px;
    border: 1px;
    /*background-color: pink;*/
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    background-color: #fafafa;
    border-radius: 5px;
    transition: 0.2s;

    .title {
      padding-left: 30px;
      padding-top: 5px;
      height: 40px;
      line-height: 40px;
      /*background-color: #00810f;*/
      font-weight: 15px;
      font-size: 19px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
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

    .author :hover {
      background-color: rgb(45, 118, 80);
      color: white;
    }
  }
}
</style>
