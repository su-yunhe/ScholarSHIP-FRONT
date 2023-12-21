<template>
  <div class="searchBox">
    <div class="menu1" @click="gotoAdvancedSearch">高级搜索</div>
    <!-- <el-select v-model="searchType" mutiple placeholder="文献" style="margin-top:15px">
      <el-option v-for="s in searchTypes" :label="s" :value="s" :key="s"></el-option>
    </el-select> -->
    <div class="search">
      <div class="searchbar">
        <div class="searchbar-wrapper">
          <div class="searchbar-left">
            <div class="search-icon-wrapper">
              <span class="search-icon searchbar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>

          <div class="searchbar-center">
            <div class="searchbar-input-spacer"></div>

            <input
              type="text"
              class="searchbar-input"
              maxlength="2048"
              name="q"
              autocapitalize="off"
              autocomplete="off"
              title="Search"
              role="combobox"
              placeholder="search in ScholarSHIP"
            />
          </div>

          <div class="searchbar-right">
            <svg
              class="voice-search"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285f4"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              ></path>
              <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
              <path
                fill="#fbbc05"
                d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
              ></path>
              <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="result">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="left">
          <div class="conditionBox">
            <div class="title">筛选方式</div>
            <div class="main">
              <div class="year">
                <div style="text-align: center; font-weight: bold; color: #7e7e7e">
                  年份
                </div>
                <el-row :gutter="6">
                  <el-col :span="11">
                    <el-select
                      v-model="minyear"
                      mutiple
                      placeholder="最早年份"
                      style="margin: 5px 0 5px 10px"
                    >
                      <el-option
                        v-for="y in years"
                        :label="y"
                        :value="y"
                        :key="y"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <div style="text-align: center; line-height: 40px">~</div>
                  </el-col>
                  <el-col :span="11">
                    <el-select
                      v-model="maxyear"
                      mutiple
                      placeholder="最晚年份"
                      style="margin: 5px 10px 5px 0"
                    >
                      <el-option
                        v-for="y in years"
                        :label="y"
                        :value="y"
                        :key="y"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div class="paper">
                <div
                  style="
                    margin: 10px 0 10px 0;
                    text-align: center;
                    font-weight: bold;
                    color: #7e7e7e;
                  "
                >
                  期刊
                </div>
                <div v-for="i in institutionList">
                  <el-checkbox @click="getIns(i.name)" size="large" />
                  {{i.name}}&nbsp({{i.count}})
                </div>
              </div>
              <div class="paper">
                <div
                  style="
                    margin: 10px 0 10px 0;
                    text-align: center;
                    font-weight: bold;
                    color: #7e7e7e;
                  "
                >
                  作者
                </div>
                <div v-for="i in authorList">
                  <el-checkbox @click="getIns(i.name)" size="large" />
                  {{i.name}}&nbsp({{i.count}})
                </div>
              </div>
              <div class="paper">
                <div
                  style="
                    margin: 10px 0 10px 0;
                    text-align: center;
                    font-weight: bold;
                    color: #7e7e7e;
                  "
                >
                  主题
                </div>
                <div v-for="i in conceptList">
                  <el-checkbox @click="getIns(i.name)" size="large" />
                  {{i.name}}&nbsp({{i.count}})
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right">
          <div v-for="item in items" style="margin-top: 15px">
            <div class="res">
              <div>{{ item.title }}</div>
              <span
                v-for="a in item.author"
                style="
                  border: solid 1px;
                  color: rgb(255, 205, 113);
                  margin: 15px 10px 0 10px;
                  padding: 0 5px 0 5px;
                  border-radius: 5px;
                "
                @click=gotoAuthor(a)
                >{{ a }}</span
              >
              <div>{{ item.abstract }}</div>
              <span
                v-for="k in item.keywords"
                style="
                  border: solid 1px;
                  color: green;
                  margin-left: 10px;
                  margin-right: 10px;
                "
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
                引用<el-icon>
                  <Link />
                </el-icon>
              </el-button>
              <el-button
                style="
                  background-color: transparent;
                  box-shadow: none;
                  font-weight: 300;
                  float: left;
                  text-align: left;
                "
                @click="toDocument(item.id)"
              >
                详情<el-icon>
                  <DataAnalysis />
                </el-icon>
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
                收藏<el-icon>
                  <FolderAdd />
                </el-icon>
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
                来源<el-icon>
                  <Position />
                </el-icon>
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
                下载<el-icon>
                  <Download />
                </el-icon>
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
                  {{ item.cite }}
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
                  {{ item.date }}
                </span>
              </span>
            </div>
            <br />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

  <div>
    <!-- <div style="float: left; width: 250px; margin-left: 150px; margin-right: 20px">
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
    </div>
    <div v-for="item in items" style="margin-top: 15px">
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
            引用<el-icon>
              <Link />
            </el-icon>
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
            详情<el-icon>
              <DataAnalysis />
            </el-icon>
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
            收藏<el-icon>
              <FolderAdd />
            </el-icon>
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
            来源<el-icon>
              <Position />
            </el-icon>
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
            下载<el-icon>
              <Download />
            </el-icon>
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
    </div> -->
    <el-divider></el-divider>
    <div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="pageFullLength"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
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
const authorList = ref([]);
const conceptList = ref([]);
const institutionList = ref([]);
const searchType = ref("");
const searchTypes = ["文献", "作者", "机构"];
const currentPage = ref(1);
const pageSize = ref(7);
const pageFullLength = ref();
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const getList = async () => {
  pageFullLength.value = 7;
  items.value = [
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
    {
      id: "W2160378127",
      title:
        "MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability",
      abstract:
        "We report a major update of the MAFFT multiple sequence alignment program. This version has several new features, including options for adding unaligned sequences into an existing alignment, adjustment of direction in nucleotide alignment, constrained alignment and parallel processing, which were implemented after the previous major update. This report shows actual examples to explain how these features work, alone and in combination. Some examples incorrectly aligned by MAFFT are also shown to clarify its limitations. We discuss how to avoid misalignments, and our ongoing efforts to overcome such limitations.",
      organization: "Oxford University Press",
      author: ["Kazutaka Katoh", "Daron M. Standley"],
      cite: 28654,
      date: "2013-01-16",
      keywords: ["sequence"],
      source: "Molecular Biology and Evolution",
    },
  ];
  institutionList.value = [
    {
      name: "Carnegie Mellon University",
      count: 1548,
    },
    {
      name: "French National Centre for Scientific Research",
      count: 1300,
    },
    {
      name: "Beihang University",
      count: 971,
    },
    {
      name: "Software (Spain)",
      count: 966,
    },
    {
      name: "Technical University of Munich",
      count: 875,
    },
    {
      name: "Tsinghua University",
      count: 807,
    },
    {
      name: "University of California, Irvine",
      count: 759,
    },
    {
      name: "Chinese Academy of Sciences",
      count: 734,
    },
    {
      name: "University of Maryland, College Park",
      count: 733,
    },
    {
      name: "University of Southern California",
      count: 725,
    },
  ];
  authorList.value = [
    {
      name: "Shigeru Yamada",
      count: 352,
    },
    {
      name: "Barry Boehm",
      count: 287,
    },
    {
      name: "Alain Abran",
      count: 270,
    },
    {
      name: "Jan Bosch",
      count: 256,
    },
    {
      name: "Victor R. Basili",
      count: 239,
    },
    {
      name: "Taghi M. Khoshgoftaar",
      count: 228,
    },
    {
      name: "P. K. Kapur",
      count: 184,
    },
    {
      name: "Tadashi Dohi",
      count: 182,
    },
    {
      name: "Nasa Nasa",
      count: 178,
    },
    {
      name: "Rafael Prikladnicki",
      count: 176,
    },
  ];
  conceptList.value = [
    {
      name: "Computer science",
      count: 395171,
    },
    {
      name: "Software",
      count: 334865,
    },
    {
      name: "Programming language",
      count: 218097,
    },
    {
      name: "Operating system",
      count: 175872,
    },
    {
      name: "Software engineering",
      count: 164045,
    },
    {
      name: "Engineering",
      count: 160045,
    },
    {
      name: "Software development",
      count: 93776,
    },
    {
      name: "Mathematics",
      count: 75815,
    },
    {
      name: "Physics",
      count: 68818,
    },
    {
      name: "Artificial intelligence",
      count: 67502,
    },
  ];
  for (var i = 0; i < items.value.length; i++) {
    items.value[i].abstract = items.value[i].abstract.substr(0, 20) + "...";
  }
};
const getIns = (name) => {
  console.log(name)
};
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
const toDocument = (id) => {
  var str = "/academic/" + id;
  router.push({ path: str });
};
const gotoAdvancedSearch = () => {
  router.push({ name: "advancedSearch" });
};
const gotoAuthor = (name) => {
  var str = "/scholar/" + name;
  router.push({ path:str });
};
onMounted(async () => {
  getList();
});
</script>
<style scoped lang="scss">
.searchBox {
  height: 60px;
  display: flex;
  margin: 40px 20px 20px 20px;
  // box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
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
  }

  .search {
    width: 60%;
    padding: 10px;

    .searchbar {
      font-size: 14px;
      font-family: arial, sans-serif;
      color: #202124;
      display: flex;
      z-index: 3;
      height: 50px;
      background: white;
      border: 1px solid #dfe1e5;
      box-shadow: none;
      border-radius: 24px;
      margin: 0 auto;
      width: auto;
      max-width: 1000px;
    }

    .searchbar:hover {
      box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
      border-color: rgba(223, 225, 229, 0);
    }

    .searchbar-wrapper {
      flex: 1;
      display: flex;
      padding: 5px 8px 0 14px;
    }

    .searchbar-left {
      font-size: 14px;
      font-family: arial, sans-serif;
      color: #202124;
      display: flex;
      align-items: center;
      padding-right: 13px;
      margin-top: -5px;
    }

    .search-icon-wrapper {
      margin: auto;
    }

    .search-icon {
      margin-top: 3px;
      color: #9aa0a6;
      height: 20px;
      line-height: 20px;
      width: 20px;
    }

    .searchbar-icon {
      display: inline-block;
      fill: currentColor;
      height: 24px;
      line-height: 24px;
      position: relative;
      width: 24px;
    }

    .searchbar-center {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
    }

    .searchbar-input-spacer {
      color: transparent;
      flex: 100%;
      white-space: pre;
      height: 34px;
      font-size: 16px;
    }

    .searchbar-input {
      background-color: transparent;
      border: none;
      margin: 0;
      padding: 0;
      color: rgba(0, 0, 0, 0.87);
      word-wrap: break-word;
      outline: none;
      display: flex;
      flex: 100%;
      margin-top: -37px;
      height: 34px;
      font-size: 16px;
      max-width: 100%;
      width: 100%;
    }

    .searchbar-right {
      display: flex;
      flex: 0 0 auto;
      margin-top: -5px;
      align-items: stretch;
      flex-direction: row;
    }

    .searchbar-clear-icon {
      margin-right: 12px;
    }

    .voice-search {
      flex: 1 0 auto;
      display: flex;
      cursor: pointer;
      align-items: center;
      border: 0;
      background: transparent;
      outline: none;
      padding: 0 8px;
      width: 2.8em;
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

    // .box:hover:before {
    //   border-color: #262626;
    //   height: 100%;
    //   transform: translateX(0);
    //   transition: .3s transform linear, .3s height linear .3s;
    // }

    // .box:hover:after {
    //   border-color: #262626;
    //   height: 100%;
    //   transform: translateX(0);
    //   transition: .3s transform linear, .3s height linear .5s;
    // }

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
  height: 1000px;
  margin: 40px 20px 20px 20px;

  .left {
    .conditionBox {
      margin: 0 20px 0 0;
      height: 600px;
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
        border-bottom: 1px solid rgb(222, 222, 222);
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
    .res {
      border: 1px;
    }
  }
}
</style>
