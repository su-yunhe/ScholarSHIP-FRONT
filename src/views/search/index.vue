<template>
  <div class="pageHeader">
    <div class="logo-box" @click="goToHome">
      <img src="../../assets/images/scholarAvator.jpg" class="logo-img" />
    </div>
    <div class="search-btn" @click="dialogVisible = !dialogVisible">
      <span>高级检索</span>
    </div>
    <el-dialog title="高级检索" width="70%" v-model="dialogVisible">
      <el-card>
        <div>高级检索</div>
        <div v-for="(searchItem, i) in searchRequests" :key="i" style="margin-bottom: 0">
          <el-select v-model="searchItem.select" mutiple placeholder="选项">
            <el-option v-for="a in areaChoices" :label="a" :value="a" :key="a"></el-option>
          </el-select>
          <el-select v-model="searchItem.relation" mutiple placeholder="选项">
            <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
          </el-select>
          <el-select v-model="searchItem.method" mutiple placeholder="选项">
            <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
          </el-select>
          <el-input v-model="searchItem.str"></el-input>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-input
      v-model="input"
      placeholder="搜索"
      style="width: 600px; margin-top: 30px; margin-bottom: 20px"
    ></el-input>
    <el-button
      style="width: 80px; margin-top: 30px; margin-left: 30px; margin-bottom: 20px"
      >搜索</el-button
    >
  </div>
  <div>
    <div style="float: left; width: 250px; margin-left: 150px; margin-right: 20px">
      <div style="font-size: 18px; height: 80px">
        <div
          style="
            float: left;
            text-align: center;
            margin-top: 20px;
            font-size: 20px;
            margin-left: 0px;
          "
        >
          筛选方式
        </div>
      </div>
      <el-card width="" height="">
        <el-select v-model="minyear" mutiple placeholder="最早年份">
          <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
        </el-select>
        <div style="text-align: center">|</div>
        <el-select v-model="maxyear" mutiple placeholder="最晚年份">
          <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
        </el-select>
        <el-divider></el-divider>
        <el-table :data="journalList">
          <el-table-column prop="name" label="期刊"> </el-table-column>
          <el-table-column prop="status" label="信息"> </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <el-table :data="authorList">
          <el-table-column prop="name" label="作者"> </el-table-column>
          <el-table-column prop="status" label="信息"> </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-card>
    </div>
    <div v-for="item in paginatedData" style="margin-top: 15px">
      <el-card>
        <div>
          <div>{{ item.title }}</div>
          <span
            v-for="a in item.authors"
            style="
              border: solid 1px;
              color: orange;
              margin-left: 10px;
              margin-right: 10px;
            "
            >{{ a }}</span
          >
          <div>{{ item.brief }}</div>
          <span
            v-for="k in item.keywords"
            style="border: solid 1px; color: green; margin-left: 10px; margin-right: 10px"
            >{{ k }}</span
          >
        </div>
        <div>
          <el-button
            style="
              background-color: transparent;
              box-shadow: none;
              font-weight: 300;
              float: left;
              text-align: left;
            "
            @click="cite(item)"
          >
            引用<el-icon><Link /></el-icon>
          </el-button>
          <el-button
            style="
              background-color: transparent;
              box-shadow: none;
              font-weight: 300;
              float: left;
              text-align: left;
            "
            @click="toDocument(item.title, item.id)"
          >
            详情<el-icon><DataAnalysis /></el-icon>
          </el-button>
          <el-button
            style="
              background-color: transparent;
              box-shadow: none;
              font-weight: 300;
              float: left;
              text-align: left;
            "
            @click="changeCollectIconToTrue(item.id)"
          >
            收藏<el-icon><FolderAdd /></el-icon>
          </el-button>
          <el-button
            style="
              background-color: transparent;
              box-shadow: none;
              font-weight: 300;
              float: left;
              text-align: left;
            "
            @click="gourl(item)"
          >
            来源<el-icon><Position /></el-icon>
          </el-button>
          <el-button
            style="
              background-color: transparent;
              box-shadow: none;
              font-weight: 300;
              float: left;
              text-align: left;
            "
            @click="pdf(item.pdf)"
          >
            下载<el-icon><Download /></el-icon>
          </el-button>
          <span
            style="
              float: right;
              text-align: right;
              margin-top: 8px;
              color: grey;
              font-size: 15px;
              margin-right: 150px;
            "
          >
            被引次数：
            <span style="color: #2d94d4">
              {{ item.n_citation }}
            </span>
          </span>
          <span
            style="
              float: right;
              text-align: right;
              margin-top: 8px;
              color: grey;
              font-size: 15px;
              margin-right: 50px;
            "
          >
            发表时间：
            <span style="color: #2d94d4">
              {{ item.year }}
            </span>
          </span>
        </div>
      </el-card>
    </div>
    <div class="footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="items.length"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
const areaChoices = ["标题","期刊","作者","领域","机构","关键词"]
const relationChoices = ["且","或","非"]
const methodChoices = ["精确","模糊"]
const searchRequests = ref([
  {
    select:"标题",
    relation:"且",
    method:"精确",
    str: "",
  },
  {
    select:"标题",
    relation:"且",
    method:"精确",
    str: "",
  },
])
const searchChoice = ref("")
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
const dialogVisible = ref(false);
const minyear = ref();
const maxyear = ref();
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
const authorList = ref([
  {
    name: "adam",
    status: "b",
  },
  {
    name: "bane",
    status: "b",
  },
  {
    name: "cypher",
    status: "b",
  },
]);
const journalList = ref([
  {
    name: "first",
    status: "b",
  },
  {
    name: "second",
    status: "b",
  },
  {
    name: "third",
    status: "b",
  },
]);
const getList = async () => {
  // await httpInstance
  //   .post('/page_get', {
  //     workId: userStore.pages.proId,
  //   })
  //   .then((res) => {
  //     console.log(res.results)
  //     items.value = res.results
  //     //url.value = res.results[0].protoInclude;
  //     // router.push({ path: '/project' })
  //   })
  items.value = [
    {
      title: "alpha",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "beta",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "cythor",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "destine",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "ethic",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "forkk",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
    {
      title: "grabit",
      authors: ["aa", "aa1"],
      brief: "thanks",
      keywords: ["avba", "gfdb"],
      n_citation: 100,
      year: 1991,
    },
  ];
};
const currentPage = ref(1);
const pageSize = ref(5);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
// watchEffect(() => {
//   console.log('value:', value.value)
// })
// watchEffect(() => {
//   console.log('lazyValue:', lazyValue.value)
// })
// function onChange (e: Event) {
//   console.log('change e:', e)
// }
// function onEnter (e: KeyboardEvent) {
//   console.log('enter e:', e)
// }
onMounted(async () => {
  getList();
});
// export default {
//   data() {
//     return {
//       search: "",
//       collectShow: false,
//       tab: null,
//       page: 1,
//       pageSize: 10,
//       pageNum: "1",
//       Num: 0,
//       CurrentPageData: [],
//       selects: ["默认", "出版年份", "引用数"],
//       selectMethod: "推荐排序",
//       paperInfo: [],
//       orderBy: "default",
//       overlay: false,
//       absolute: false,
//       opacity: 0.5, //透明度
//       citeStyle: [{ name: "引用类型", text: "引用文本" }],
//       keyword: null,
//       TypeNum: [],
//       tagData: [],
//       posturl: "gan",
//       formdata: {},
//       paperID: "",
//       isCollect: false,
//       tag_list: "",
//       authorList: [{
//           name: "adam",
//           status: "b",
//         },{
//           name: "bane",
//           status: "b",
//         },{
//           name: "cypher",
//           status: "b",
//         },],
//       journalList: [
//         {
//           name: "first",
//           status: "b",
//         },{
//           name: "second",
//           status: "b",
//         },{
//           name: "third",
//           status: "b",
//         },
//       ],
//       new: 0,
//       journal: "",
//       author: "",
//       minyear: "",
//       maxyear: "",
//       years: [1984, 2077],
//       pickauthor: "",
//       pickjournal: "",
//     };
//   },
// };
</script>
<style scoped>
.logo-img {
  height: 100%;
  margin-top: auto;
}
.pageHeader {
  background-color: white;
  height: 10vh;
  display: flex;
  flex-direction: row;
}
.logo-box {
  margin-left: 5vw;
  display: flex;
  margin-right: 5vw;
  cursor: pointer;
}
.search-btn {
  text-align: center;
  line-height: 10vh;
  margin-right: 3vw;
}
.search-btn span {
  cursor: pointer;
  font-size: 17px;
  transition: 0.3s;
}
.search-btn span:hover {
  color: #1e88e5;
}
.login-btn {
  margin-left: 10vw;
  line-height: 10vh;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.login-btn span {
  cursor: pointer;
  font-size: 17px;
  transition: 0.3s;
}
.login-btn span:hover {
  color: #1e88e5;
}
.user-box {
  margin-left: 7vw;
  line-height: 10vh;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.aa {
  transition: all 0.3s;
  cursor: pointer;
}
.go {
  transform: rotate(-180deg);
  transition: all 0.3s;
  cursor: pointer;
}
.select-box {
  position: absolute;
  top: 10vh;
  right: 1vw;
  width: 15%;
  z-index: 1000;
}
.search-box {
  margin-left: 5vw;
  margin-right: 5vw;
  width: 40%;
}
.text-ellipsis-two {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.focusChange:hover {
  text-decoration: underline;
  color: #006064;
  cursor: pointer;
}
.paper-title:hover {
  cursor: pointer;
}
.clickchange:hover {
  text-decoration: underline;
  color: #006064;
  cursor: pointer;
}
</style>
