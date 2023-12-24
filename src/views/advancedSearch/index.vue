<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="15">
        <el-card>
          <div class="title">高级检索</div>
          <el-divider></el-divider>
          <div class="title1">搜索条件</div>
          <div v-for="(searchItem, i) in searchRequests" :key="i" style="margin-top: 10px; margin-buttom: 10px">
            <span v-if="i === 0" style="margin-right: 100px"> </span>
            <el-select v-model="searchItem.relation" mutiple placeholder="与" style="width: 100px" v-if="i">
              <el-option v-for="r in relationChoices" :label="r" :value="r" :key="r"></el-option>
            </el-select>
            <el-select v-model="searchItem.select" mutiple placeholder="选项" style="width: 100px">
              <el-option v-for="a in areaChoices" :label="a" :value="a" :key="a"></el-option>
            </el-select>
            <el-select v-model="searchItem.method" mutiple placeholder="选项" style="width: 100px">
              <el-option v-for="m in methodChoices" :label="m" :value="m" :key="m"></el-option>
            </el-select>
            <el-input v-model="searchItem.str" style="width: 300px"></el-input>
            <el-button v-show="i" @click="removeStr(i)" style="margin-left: 20px"><el-icon>
                <Minus />
              </el-icon></el-button><el-button v-show="isLast(i)" @click="addStr()" style="margin-left: 20px"><el-icon>
                <Plus />
              </el-icon></el-button>
          </div>

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
import { ref, watchEffect, computed, onMounted } from "vue";
const areaChoices = ["标题", "期刊", "作者", "领域", "机构", "关键词"];
const relationChoices = ["且", "或", "非"];
const methodChoices = ["精确", "模糊"];
const searchRequests = ref([
  {
    select: "标题",
    relation: "且",
    method: "精确",
    str: "",
  },
  {
    select: "标题",
    relation: "且",
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
const addStr = () => {
  searchRequests.value.push({
    select: "标题",
    relation: "且",
    method: "精确",
    str: "",
  });
};
const removeStr = (i) => {
  searchRequests.value.splice(i, 1);
};
const isLast = (index) => {
  return index === searchRequests.value.length - 1;
};
const search = () => {
  let keyword = [];
  for (var i = 0; i < searchRequests.value.length; i++) {
    // console.log(searchRequests.value[i])
    if (searchRequests.value[i].str == "") {
      window.alert("搜索字符串不能为空");
      return;
    }
    keyword.push(searchRequests.value[i]);
  }
  let formdata = { minyear: minyear, maxyear: maxyear, keyword: keyword };
  console.log(formdata);
};
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

  .timeSearch {}

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
