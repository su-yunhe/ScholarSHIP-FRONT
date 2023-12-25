<template>
  <div class="main">
    <div @click="test()">测试</div>
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
            高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。
            输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。
            若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。
            例如： （1）篇名检索项后输入：神经网络 *
            自然语言，可以检索到篇名包含“神经网络”及“自然语言”的文献。
            （2）主题检索项后输入：(锻造 + 自由锻) *
            裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。
            （3）如果需检索篇名包含“digital library”和“information
            service”的文献，在篇名检索项后输入：'digital library' * 'information service'。
            （4）如果需检索篇名包含“2+3”和“人才培养”的文献，在篇名检索项后输入：'2+3' *
            人才培养。
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, watchEffect, computed, onMounted } from "vue"
import httpInstance from '@/utils/http'
const relationChoices = ["包含", "不包含"]
const methodChoices = ["精确", "模糊"]
const titleRequests = ref([
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
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
  {
    relation: "包含",
    method: "精确",
    str: "",
  },
]);
const searchChoice = ref("");
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
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


const testForm = ref({
  search: {
    min_year: 2000,
    max_year: 2015,
    search_list: [
      { op: 1, type: 2, name: "song" },
      { op: 1, type: 3, name: "Peking" },
      { op: 0, type: 3, name: "beihang" },
      { op: 1, type: 1, name: "software" },
      { op: 1, type: 4, name: "network" }]
  }
})

const data = {
  search: {
    min_year: 2000,
    max_year: 2015,
    search_list: [
      { op: 1, type: 2, name: "song" },
      { op: 1, type: 3, name: "Peking" },
      { op: 0, type: 3, name: "beihang" },
      { op: 1, type: 1, name: "software" },
      { op: 1, type: 4, name: "network" }]
  }
}



const test = async () => {
  await httpInstance.post('/SearchManager/AdvancedSearchWork', {
    min_year: 2000,
    max_year: 2015,
    op: [1, 1, 0, 1, 1],
    type: [2, 3, 3, 1, 4],
    name: ["song", "Peking", "beihang", "software", "network"]
    // search_list: [
    //   { op: 1, type: 2, name: "song" },
    //   { op: 1, type: 3, name: "Peking" },
    //   { op: 0, type: 3, name: "beihang" },
    //   { op: 1, type: 1, name: "software" },
    //   { op: 1, type: 4, name: "network" }]

  }).then(res => {
    console.log(res)
  })
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
};
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
};

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
};

const search = async() => {
  let op1 = []
  let type1 = []
  let name1 = []
  /* 标题 */
  for (var i = 0; i < titleRequests.value.length; i++) {
    // console.log(titleRequests.value[i])
    if (titleRequests.value[i].str == "") {
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
  console.log(minyear)
  console.log(maxyear)
  console.log(op1)
  console.log(type1)
  console.log(name1)
  await httpInstance.post('/SearchManager/AdvancedSearchWork', {
    min_year: minyear.value,
    max_year: maxyear.value,
    op: op1,
    type: type1,
    name: name1
  }).then(res => {
    console.log(res)
  })

}
</script>
<style scoped>
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
</style>
