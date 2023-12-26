<template>
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
  <div class="searchBox">
    <div class="menu1">
      <button class="btn" @click="toAdvancedSearch">
        <span class="box">
          <el-icon style="position: relative; top: 2px">
            <Search />
          </el-icon>
          高级搜索
        </span>
      </button>
    </div>
    <div class="search">
      <div style="padding-top: 10px; margin-left: 50px">
        <div class="input__container">
          <div class="shadow__input"></div>
          <span id="dropdown_span">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="font-weight: 10px; font-size: 14px">
                {{ ok }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a" @click="ok = '文献'; clean()">文献</el-dropdown-item>
                  <el-dropdown-item command="b" @click="ok = '学者'; clean()">学者</el-dropdown-item>
                  <el-dropdown-item command="c" @click="ok = '机构'; clean()">机构</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <input @keydown.enter="search" type="text" name="text" id="text" class="input__search" placeholder="在此处搜索"
            style="font-size: 14px" v-model="input" />
          <button class="input__button__shadow" id="search_button" @click="search">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
              <path
                d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                fill-rule="evenodd" fill="#17202A"></path>
            </svg>
          </button>
        </div>
      </div>
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
        <div id="single-chart-dialog1" style="height: 80vh; width: 40vw"></div>
        <div id="single-chart-dialog2" style="height: 80vh; width: 40vw"></div>
      </div>
    </el-dialog>
  </div>
  <div class="result">
    <el-row :gutter="10">
      <el-col :span="5">
        <transition transition name="fade">
          <div class="left" v-show="show_left">
            <div class="conditionBox">
              <div class="title">筛选方式</div>
              <div class="main">
                <div class="paper">
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="日期" name="1">
                      <el-row :gutter="6">
                        <el-col :span="11">
                          <el-select v-model="minyear" mutiple placeholder="最早年份" style="margin: 5px 0 5px 5px">
                            <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="2">
                          <div style="text-align: center; line-height: 40px">~</div>
                        </el-col>
                        <el-col :span="11">
                          <el-select v-model="maxyear" mutiple placeholder="最晚年份" style="margin: 5px 5px 5px 0">
                            <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="作者" name="2" v-show="!(ok === '学者')">
                      <div v-for="i in authorList" style="font-size: 13px">
                        <el-checkbox @click="getIns(i.name)" />
                        {{ i.name }}&nbsp({{ i.count }})
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="主题" name="3">
                      <div v-for="i in conceptList" style="font-size: 13px">
                        <el-checkbox @click="getIns(i.name)" />
                        {{ i.name }}&nbsp({{ i.count }})
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="机构" name="4" v-show="!(ok === '机构')">
                      <div v-for="i in institutionList" style="font-size: 13px">
                        <el-checkbox @click="getIns(i.name)" />
                        {{ i.name }}&nbsp({{ i.count }})
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </el-col>
      <el-col :span="19">
        <el-skeleton style="width: 100%" :loading="!rendered" animated :throttle="500" :count="pageSize">
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
            <div class="right">
              <div v-for="item in paginatedData" style="margin-top: 15px">
                <div class="res">
                  <div class="title" v-show="ok === '文献'" :title="item.title" style="cursor: pointer;"
                    @click="toDocument(item.id)">{{ item.title }}</div>
                  <div class="title" v-show="ok === '学者'" :title="item.name" style="cursor: pointer;"
                    @click="toAuthor(item.id)">{{ item.name }}</div>
                  <div class="title" v-show="ok === '机构'" :title="item.name" style="cursor: pointer;"
                    @click="toInstitution(item.id)">{{ item.name }}</div>
                  <div class="info1">
                    <el-row v-show="ok === '文献'">
                      <el-col :span="12">
                        <div class="author_holder">
                          <span style="margin-left:30px; font-size: 12px; position: relative; top: -5px;">作者：</span>
                          <span style="cursor: pointer; " class="author" v-for="a in item.author" @click=gotoAuthor(a)
                            :title="a">{{ a
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
                    <el-row v-show="ok === '学者'">
                      <el-col :span="12">
                        <div class="author_holder">
                          <span style="
                          margin-left: 30px;
                          font-size: 12px;
                          position: relative;
                          top: -5px;
                        ">机构：</span>
                          <span style="cursor: pointer" class="author" :title="item.institution">{{ item.institution
                          }}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="author_holder">
                          <span style="
                          margin-left: 30px;
                          font-size: 12px;
                          position: relative;
                          top: -5px;
                        ">领域：</span>
                          <span class="concept_holder" :title="item.concept">{{
                            item.concept
                          }}</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row v-show="ok === '机构'">
                      <el-col :span="12">
                        <div class="author_holder">
                          <span style="
                          margin-left: 30px;
                          font-size: 12px;
                          position: relative;
                          top: -5px;
                        ">地址：</span>
                          <span style="cursor: pointer" class="author" :title="item.city + ',' + item.country">{{
                            item.city }}, {{ item.country }}</span>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="author_holder">
                          <span style="
                          margin-left: 30px;
                          font-size: 12px;
                          position: relative;
                          top: -5px;
                        ">领域：</span>
                          <span class="concept_holder" v-for="k in item.concept" :title="k">{{
                            k
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

                  <div style="margin-left: 27px; margin-top: 8px" v-show="ok === '文献'">
                    <el-button size="small" type="primary" plain style="
                    box-shadow: none;
                    font-weight: 300;
                    float: left;
                    text-align: left;
                  " @click="cite(item.id)">
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
                  <div style="margin-left: 27px; margin-top: 8px" v-show="!(ok === '文献')">
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
                      作品数：
                      <span style="color: #2d94d4">
                        {{ item.works_count }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <el-affix style="z-index: 0;" v-if="!paginatedData.length && rendered">
              <el-empty description="这里空空如也" />
            </el-affix>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>
    <el-divider v-if="paginatedData.length != 0"></el-divider>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
      :total="pageFullLength" v-if="rendered && paginatedData.length != 0" />
    <el-divider v-if="paginatedData.length != 0"></el-divider>
  </div>

  <!-- <div>
    <el-divider></el-divider>
    <div class="footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="pageFullLength"
      />
    </div>
  </div> -->
</template>
<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { DataAnalysis, Histogram, TrendCharts } from "@element-plus/icons-vue";
import * as echarts from "echarts";
import httpInstance from "@/utils/http";
import axios from 'axios';
const router = useRouter();
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
const minyear = ref(1900);
const maxyear = ref(2023);
const activeName = ref("1");
const years = ref([
  // 1999,
  // 2000,
  // 2001,
  // 2002,
  // 2003,
  // 2004,
  // 2005,
  // 2006,
  // 2007,
  // 2008,
  // 2009,
  // 2010,
  // 2011,
  // 2012,
  // 2013,
  // 2014,
  // 2015,
  // 2016,
  // 2017,
  // 2018,
  // 2019,
  // 2020,
  // 2021,
  // 2022,
  // 2023,
]);
const show_left = ref(false);
const authorList = ref([]);
const conceptList = ref([]);
const institutionList = ref([]);
const searchType = ref("");
const searchTypes = ["文献", "作者", "机构"];
const currentPage = ref(1);
const pageSize = ref(10);
const pageFullLength = ref();
onMounted(() => {
  var i = 1900;
  while(i<2024){
    years.value.push(i)
  }
  if (router.currentRoute.value.fullPath.split('/')[1]=='search'){
    getWenList("",1);
    return;
  }
  var type=router.currentRoute.value.fullPath.split('type=')[1].split('&id')[0];
  var id=router.currentRoute.value.fullPath.split('id=')[1];
  id=id.replace("+"," ");
  id = decodeURIComponent(id);
  input.value=id;
  if (type=="1"){
    getWenList(id, 1);
  } else if (type=="2"){
    ok.value="学者";
    getXueList(id, 1);
  } else {
    ok.value="机构";
    getJiList(id, 1);
  }
});
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const showDataChartDialog = ref(false);
const selectList = ref([]);
const showDataChart = ref(false);
const showSingleChart = ref(false);
const ok = ref("文献");
const rendered = ref(false);
const citeOp = -1;
const citeString = ref("")
const citeStringIEEE = ref("")
const citeStringGB = ref("")
const citeStringBib = ref("")
const citeStringChicago = ref("")
const citeDialogVisible = ref(false)
// const search = async () => {
//   rendered.value = false;
//   const cite = (id) => {
//     httpInstance
//       .get(`/get_citation`, { work_id: id, citation_type: "GB/T7714" })
//       .then((res) => {
//         const textToCopy = res.data.result;
//         navigator.clipboard.writeText(textToCopy)
//           .then(() => {
//             console.log("已成功复制到剪贴板");
//             // 可以显示成功提示或执行其他操作
//           })
//           .catch((error) => {
//             console.error("复制到剪贴板失败", error);
//             // 可以显示错误提示或执行其他操作
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }
const clean = () => {
  items.value = [];
  authorList.value = [];
  conceptList.value = [];
  institutionList.value = [];
}
const gourl = (id) => {
  httpInstance
    .post(`/SearchManager/WorkLocation`, { id: id })
    .then((res) => {
      window.open(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
const search = async () => {
  rendered.value = false;
  clean();
  currentPage.value = 1;
  if (ok.value == "文献") {
    getWenList(input.value, 1);
  } else if (ok.value == "学者") {
    getXueList(input.value, 1);
  } else {
    getJiList(input.value, 1);
  }
};
const cite = async (id) => {
  // httpInstance
  //   .get(`/get_citation?work_id=${id}&citation_type=GB/T7714`)
  //   .then((res) => {
  //     console.log(res);
  //     const textToCopy = res.result;
  //     navigator.clipboard.writeText(textToCopy)
  //       .then(() => {
  //         console.log("已成功复制到剪贴板");
  //         ElMessage({
  //           message: '已成功复制到剪贴板',
  //           grouping: true,
  //           type: 'success',
  //         })
  //       })
  //       .catch((error) => {
  //         console.error("复制到剪贴板失败", error);
  //         // 可以显示错误提示或执行其他操作
  //         ElMessage({
  //           message: '复制到剪贴板失败',
  //           grouping: true,
  //           type: 'warning',
  //         })
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
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
const getTopInstitution = async (input) => {
  httpInstance
    .post(`/SearchManager/SearchTopInstitution`, { content: input })
    .then((res) => {
      // console.log(res);
      institutionList.value = res.top_institution;
    })
    .catch((error) => {
      console.log(error);
    });
};
const getTopConcept = async (input) => {
  httpInstance
    .post(`/SearchManager/SearchTopConcept`, { content: input })
    .then((res) => {
      // console.log(res);
      conceptList.value = res.top_concept;
    })
    .catch((error) => {
      console.log(error);
    });
};
const getTopAuthor = async (input) => {
  httpInstance
    .post(`/SearchManager/SearchTopAuthor`, { content: input })
    .then((res) => {
      // console.log(res);
      authorList.value = res.top_author;
    })
    .catch((error) => {
      console.log(error);
    });
};
const getWenList = async (input, num) => {
  httpInstance
    .post(`/SearchManager/SearchWork`, { content: input, page: num })
    .then((res) => {
      console.log(res)
      // console.log(1);
      pageFullLength.value = res.count > 10000 ? 10000 : res.count;
      // console.log(pageFullLength.value)
      if (pageFullLength.value==0){
        items.value=[];
      } else {
        items.value = res.data;
      }
      rendered.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
  getTopAuthor(input);
  getTopConcept(input);
  getTopInstitution(input);
};
const getXueList = async (input, num) => {
  httpInstance
    .post(`/SearchManager/SearchAuthor`, { content: input, page: num })
    .then((res) => {
      // console.log(1);
      console.log(res);
      pageFullLength.value = res.data.length > 10000 ? 10000 : res.data.length; // 后端传来的数据没有res.count字段
      // console.log(pageFullLength.value)
      if (pageFullLength.value==0){
        items.value=[];
      } else {
        items.value = res.data;
      }
      rendered.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
  getTopConcept(input);
  getTopInstitution(input);
};
const getJiList = async (input, num) => {
  httpInstance
    .post(`/SearchManager/SearchInstitution`, { content: input, page: num })
    .then((res) => {
      // console.log(1);
      console.log(res);
      pageFullLength.value = res.data.length > 10000 ? 10000 : res.data.length; // 后端传来的数据没有res.count字段
      // console.log(pageFullLength.value)
      if (pageFullLength.value==0){
        items.value=[];
      } else {
        items.value = res.data;
      }
      rendered.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
  getTopConcept(input);
  getTopAuthor(input);
};
const getIns = (name) => {
  console.log(name);
};
const handleCurrentChange = (n) => {
  if (ok.value == "文献") {
    getWenList(input.value, n);
  } else if (ok.value == "学者") {
    getXueList(input.value, n);
  } else {
    getJiList(input.value, n);
  }
  currentPage.value = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const toDocument = (id) => {
  var str = "/academic/" + id;
  router.push({ path: str });
};
const toAdvancedSearch = () => {
  router.push({ name: "advancedSearch" });
};
const toAuthor = (name) => {
  var str = "/scholar/" + name;
  router.push({ path: str });
};
onMounted(async () => {
  show_left.value = true;
});
const toInstitution = (id) => {
  var str = "/institution/" + id;
  router.push({ path: str });
};
const pdf = async (id) => {
  httpInstance
    .post(`/SearchManager/DownloadWork`, { id: id })
    .then((res) => {
      // window.open(res.data, '_blank');
      console.log(res.data)
      const response = axios.get(res.data, {
        responseType: 'blob', // 必须指定为blob类型才能下载
      });
      console.log("download", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ScholarSHIP文献下载.pdf');
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.log(error);
    });
};
const cited_by_count = ref([]);
const reference_count = ref([]);
const related_count = ref([]);
const counts_by_year = ref();
const concepts = ref();
const authorships = ref();
async function request_multi_article() {
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
async function confirmSelect() {
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
async function request_single_article(id) {
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
async function analyzeStatic(id) {
  showSingleChart.value = true;
  if (chart1 != null) chart1.showLoading()
  if (chart2 != null) chart2.showLoading()
  await request_single_article(id);
  const charDom1 = document.getElementById("single-chart-dialog1");
  chart1 = echarts.init(charDom1);
  const charDom2 = document.getElementById("single-chart-dialog2");
  chart2 = echarts.init(charDom2);
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
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter-from,
.fade-leave-to

/* .fade-leave-active, 2.1.8 版本以下 */
  {
  opacity: 0;
  transform: translateX(-50px);
}

#single_all {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

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
      // max-width: 300px;
      height: 50px;
      transition: transform 400ms;
      transform-style: preserve-3d;
      // transform: rotateX(15deg) rotateY(-20deg);
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

.result {
  // height: 1000px;
  margin: 40px 20px 20px 20px;

  .left {
    .conditionBox {
      margin: 15px 20px 0 0;
      // height: 600px;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      background-color: #fafafa;

      .title {
        margin: 0 20px;
        padding-top: 10px;
        height: 60px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        // border-bottom: 1px solid rgb(222, 222, 222);
      }

      .main {
        margin-top: 10px;

        .paper {
          margin: 10px 20px 0 10px;
          border-top: 1px solid rgb(222, 222, 222);
        }
      }
    }
  }

  .right {
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
      // background-color: pink;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      background-color: #fafafa;
      border-radius: 5px;
      transition: 0.2s;

      .title {
        padding-left: 30px;
        padding-top: 5px;
        height: 40px;
        line-height: 40px;
        // background-color: #00810f;
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
}

::v-deep .el-collapse-item__header {
  color: #7e7e7e;
  font-weight: bold;
  text-align: center;
  background-color: #fafafa !important;
  position: relative;
  margin-left: 10px;
}

::v-deep .el-collapse-item__content {
  text-align: left;
  margin-left: 10px;
  background-color: #fafafa;
}

.footer {
  height: 50px;
}
</style>
