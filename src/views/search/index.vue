<template>
  <div class="header">
    <div class="menu1" @click="gotoAdvancedSearch">高级搜索</div>
    <el-select v-model="searchType" mutiple placeholder="文献" style="margin-top:15px">
      <el-option v-for="s in searchTypes" :label="s" :value="s" :key="s"></el-option>
    </el-select>
    <div class="search">
      <div class="form-control">
        <input class="input input-alt" placeholder="搜索......" required="" type="text">
        <span class="input-border input-border-alt"></span>
      </div>
    </div>
    <div class="menu2">
      <button class="btn">
        <span class="box">
          个人中心
        </span>
      </button>
    </div>
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
import { useRouter } from 'vue-router'
const router = useRouter()
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
const minyear = ref();
const maxyear = ref();
const years = ref([1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,]);
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
const searchType = ref("");
const searchTypes = ["文献","作者","机构"]
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
const gotoAdvancedSearch = () =>{
  router.push({name:'advancedSearch'})
}
onMounted(async () => {
  getList();
});
</script>
<style scoped lang="scss">
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
.header {
  height: 60px;
  display: flex;
  margin: 0px 20px 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border-bottom-left-radius: 5px;  /* 左下角 */
  border-bottom-right-radius: 5px; /* 右下角 */

  .logo {
    width: 25%;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    // background-color: pink;
  }

  .menu1 {
    width: 10%;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  }

  .search {
    width: 50%;
    padding: 10px;

    .input {
      color: #000000;
      font-size: 0.9rem;
      background-color: transparent;
      width: 100%;
      box-sizing: border-box;
      padding-inline: 0.5em;
      padding-block: 0.7em;
      border: none;
      border-bottom: var(--border-height) solid var(--border-before-color);
      box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
      border-radius: 15px
    }

    .input-border {
      position: absolute;
      background: var(--border-after-color);
      width: 0%;
      height: 2px;
      bottom: 0;
      left: 0;
      transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }

    .input:focus {
      outline: none;
    }

    .input:focus+.input-border {
      width: 100%;
    }

    .form-control {
      position: relative;
      --width-of-input: 300px;
    }

    .input-alt {
      font-size: 1.2rem;
      padding-inline: 1em;
      padding-block: 0.8em;
    }

    .input-border-alt {
      height: 3px;
      background: linear-gradient(90deg, #FF6464 0%, #FFBF59 50%, #47C9FF 100%);
      transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1.00);

    }

    

    .input-alt:focus+.input-border-alt {
      width: 100%;
    }

    // line-height: 60px;
    // text-align: center;
    // font-weight: bold;
    // font-size: 18px;
    // background-color: rgb(192, 255, 225);

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
        transition: .1s linear;
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
</style>
