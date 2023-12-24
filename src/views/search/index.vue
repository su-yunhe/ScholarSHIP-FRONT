<template>
  <div class="searchBox">
    <div class="menu1">
      <button class="btn" @click="gotoAdvancedSearch()">
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
                  <el-dropdown-item command="a" @click="ok = '文献'"
                    >文献</el-dropdown-item
                  >
                  <el-dropdown-item command="b" @click="ok = '学者'"
                    >学者</el-dropdown-item
                  >
                  <el-dropdown-item command="c" @click="ok = '机构'"
                    >机构</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <input
            @keydown.enter="search"
            type="text"
            name="text"
            id="text"
            class="input__search"
            placeholder="在此处搜索"
            style="font-size: 14px"
            v-model="input"
          />
          <button class="input__button__shadow" id="search_button" @click="search">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              height="20px"
              width="20px"
            >
              <path
                d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                fill-rule="evenodd"
                fill="#17202A"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="result">
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="left">
          <div class="conditionBox">
            <div class="title">筛选方式</div>
            <div class="main">
              <div class="paper">
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="日期" name="1">
                    <el-row :gutter="6">
                      <el-col :span="11">
                        <el-select
                          v-model="minyear"
                          mutiple
                          placeholder="最早年份"
                          style="margin: 5px 0 5px 5px"
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
                          style="margin: 5px 5px 5px 0"
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
                  </el-collapse-item>
                  <el-collapse-item title="作者" name="2">
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
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="right">
          <div v-for="item in paginatedData" style="margin-top: 15px">
            <div class="res">
              <div class="title">{{ item.title }}</div>
              <!-- <div>{{ item.title }}</div> -->
              <div class="info1">
                <el-row>
                  <el-col :span="12">
                    <div>
                      <span style="margin-left: 30px; font-size: 12px">作者：</span>
                      <span
                        class="author"
                        v-for="a in item.author"
                        @click="gotoAuthor(a)"
                        >{{ a }}</span
                      >
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span style="margin-left: 30px; font-size: 12px">关键词：</span>
                    <span
                      v-for="k in item.keywords"
                      style="
                        background-color: rgb(45, 118, 80);
                        margin: 15px 5px 0 0;
                        padding: 0 5px 0 5px;
                        border-radius: 5px;
                        color: rgb(255, 255, 255);
                        font-size: 12px;
                      "
                      >{{ k }}</span
                    >
                  </el-col>
                </el-row>
              </div>
              <div
                style="
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
                "
              >
                {{ item.abstract }}
              </div>

              <div style="margin-left: 27px; margin-top: 8px">
                <el-button
                  size="small"
                  type="primary"
                  plain
                  style="
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
                  size="small"
                  type="success"
                  plain
                  style="
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
                  size="small"
                  type="success"
                  plain
                  style="
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
                  size="small"
                  type="warning"
                  plain
                  style="
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
                  size="small"
                  type="warning"
                  plain
                  style="
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
                    margin-top: 3px;
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
                    margin-top: 3px;
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
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

  <div>
    <div class="footer">
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
import httpInstance from "@/utils/http";
const router = useRouter();
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
const minyear = ref();
const maxyear = ref();
const activeName = ref("1");
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
const pageSize = ref(20);
const pageFullLength = ref();
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const search = async () => {
  getList(input.value, 1);
};
const getList = async (input, num) => {
  httpInstance.post(`/SearchManager/SearchWork`, { content: input, page: num }).then((res) => {
                console.log(res);
            }).catch((error)=>{
                console.log(error);
                // pageFullLength.value = error.data.count;,
                // items.value = error.data.data;
            });
  // httpInstance
  //   .post(`/SearchManager/SearchWork`, { content: input, page: num })
  //   .then((res) => {
  //     console.log(1, pageFullLength.value);
  //   })
  //   .catch((error) => {
  //     pageFullLength.value = error.data.count;,
  //     items.value = error.data.data;
  //   });
// httpInstance
      //   .post(`/SearchManager/SearchTopAuthor`, (content: input))
      //   .then((res) => {
      //     console.log(1, pageFullLength.value);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     authorList.value = error.data.data;
      //   });
  // authorList.value = [
  //   {
  //     name: "Shigeru Yamada",
  //     count: 352,
  //   },
  //   {
  //     name: "Barry Boehm",
  //     count: 287,
  //   },
  //   {
  //     name: "Alain Abran",
  //     count: 270,
  //   },
  //   {
  //     name: "Jan Bosch",
  //     count: 256,
  //   },
  //   {
  //     name: "Victor R. Basili",
  //     count: 239,
  //   },
  //   {
  //     name: "Taghi M. Khoshgoftaar",
  //     count: 228,
  //   },
  //   {
  //     name: "P. K. Kapur",
  //     count: 184,
  //   },
  //   {
  //     name: "Tadashi Dohi",
  //     count: 182,
  //   },
  //   {
  //     name: "Nasa Nasa",
  //     count: 178,
  //   },
  //   {
  //     name: "Rafael Prikladnicki",
  //     count: 176,
  //   },
  // ];
  // conceptList.value = [
  //   {
  //     name: "Computer science",
  //     count: 395171,
  //   },
  //   {
  //     name: "Software",
  //     count: 334865,
  //   },
  //   {
  //     name: "Programming language",
  //     count: 218097,
  //   },
  //   {
  //     name: "Operating system",
  //     count: 175872,
  //   },
  //   {
  //     name: "Software engineering",
  //     count: 164045,
  //   },
  //   {
  //     name: "Engineering",
  //     count: 160045,
  //   },
  //   {
  //     name: "Software development",
  //     count: 93776,
  //   },
  //   {
  //     name: "Mathematics",
  //     count: 75815,
  //   },
  //   {
  //     name: "Physics",
  //     count: 68818,
  //   },
  //   {
  //     name: "Artificial intelligence",
  //     count: 67502,
  //   },
  // ];
  // for (var i = 0; i < items.value.length; i++) {
  //   items.value[i].abstract = "摘要：" + items.value[i].abstract;
  // }
};
const getIns = (name) => {
  console.log(name);
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
  router.push({ path: str });
};
onMounted(async () => {
  getList();
});
</script>
<style scoped lang="scss">
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

    // .input__container :hover{
    //   width: 60vw;
    //   transition: 0.7s ease-in-out;
    // }

    // .input__container :focus{
    //   width: 60vw;
    //   transition: 0.7s ease-in-out;
    // }

    #search_button {
      width: 60px;
    }

    // .shadow__input {
    //   content: "";
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   left: 0;
    //   bottom: 0;
    //   z-index: -1;
    //   filter: blur(10px);
    //   border-radius: 20px;
    //   background-color: #999cff;
    //   background-image: radial-gradient(at 85% 51%, hsla(60, 60%, 61%, 1) 0px, transparent 50%),
    //     radial-gradient(at 74% 68%, rgb(231, 237, 156) 0px, transparent 50%),
    //     radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
    //     radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
    //     radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
    //     radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
    //     radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
    // }

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
      // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      transition: 0.7s;
    }

    .input__search:hover {
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
        rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
        rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
      transition: 0.7s;
    }

    // .searchbar {
    //   font-size: 14px;
    //   font-family: arial, sans-serif;
    //   color: #202124;
    //   display: flex;
    //   z-index: 3;
    //   height: 50px;
    //   background: white;
    //   border: 1px solid #dfe1e5;
    //   box-shadow: none;
    //   border-radius: 24px;
    //   margin: 0 auto;
    //   width: auto;
    //   max-width: 1000px;
    // }

    // .searchbar:hover {
    //   box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    //   border-color: rgba(223, 225, 229, 0);
    // }

    // .searchbar-wrapper {
    //   flex: 1;
    //   display: flex;
    //   padding: 5px 8px 0 14px;
    // }

    // .searchbar-left {
    //   font-size: 14px;
    //   font-family: arial, sans-serif;
    //   color: #202124;
    //   display: flex;
    //   align-items: center;
    //   padding-right: 13px;
    //   margin-top: -5px;
    // }

    // .search-icon-wrapper {
    //   margin: auto;
    // }

    // .search-icon {
    //   margin-top: 3px;
    //   color: #9aa0a6;
    //   height: 20px;
    //   line-height: 20px;
    //   width: 20px;
    // }

    // .searchbar-icon {
    //   display: inline-block;
    //   fill: currentColor;
    //   height: 24px;
    //   line-height: 24px;
    //   position: relative;
    //   width: 24px;
    // }

    // .searchbar-center {
    //   display: flex;
    //   flex: 1;
    //   flex-wrap: wrap;
    // }

    // .searchbar-input-spacer {
    //   color: transparent;
    //   flex: 100%;
    //   white-space: pre;
    //   height: 34px;
    //   font-size: 16px;
    // }

    // .searchbar-input {
    //   background-color: transparent;
    //   border: none;
    //   margin: 0;
    //   padding: 0;
    //   color: rgba(0, 0, 0, 0.87);
    //   word-wrap: break-word;
    //   outline: none;
    //   display: flex;
    //   flex: 100%;
    //   margin-top: -37px;
    //   height: 34px;
    //   font-size: 16px;
    //   max-width: 100%;
    //   width: 100%;
    // }

    // .searchbar-right {
    //   display: flex;
    //   flex: 0 0 auto;
    //   margin-top: -5px;
    //   align-items: stretch;
    //   flex-direction: row;
    // }

    // .searchbar-clear-icon {
    //   margin-right: 12px;
    // }

    // .voice-search {
    //   flex: 1 0 auto;
    //   display: flex;
    //   cursor: pointer;
    //   align-items: center;
    //   border: 0;
    //   background: transparent;
    //   outline: none;
    //   padding: 0 8px;
    //   width: 2.8em;
    // }
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
  height: 1000px;
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
      }

      .info {
      }

      .author {
        // background-color: greenyellow;
        border: solid 1px;
        color: rgb(45, 118, 80);
        margin: 15px 5px 0 0;
        padding: 0 5px 0 5px;
        border-radius: 5px;
        /* background-color: gray; */
        font-size: 12px;
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
