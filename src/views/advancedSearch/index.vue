<template>
  <el-row>
    <el-col :span="15"
      ><el-card>
        <div>高级检索</div>
        <el-divider></el-divider>
        <div>搜索条件</div>
        <div
          v-for="(searchItem, i) in searchRequests"
          :key="i"
          style="margin-top: 10px; margin-buttom: 10px"
        >
          <span v-if="i === 0" style="margin-right: 100px"> </span>
          <el-select
            v-model="searchItem.relation"
            mutiple
            placeholder="与"
            style="width: 100px"
            v-if="i"
          >
            <el-option
              v-for="r in relationChoices"
              :label="r"
              :value="r"
              :key="r"
            ></el-option>
          </el-select>
          <el-select
            v-model="searchItem.select"
            mutiple
            placeholder="选项"
            style="width: 100px"
          >
            <el-option
              v-for="a in areaChoices"
              :label="a"
              :value="a"
              :key="a"
            ></el-option>
          </el-select>
          <el-select
            v-model="searchItem.method"
            mutiple
            placeholder="选项"
            style="width: 100px"
          >
            <el-option
              v-for="m in methodChoices"
              :label="m"
              :value="m"
              :key="m"
            ></el-option>
          </el-select>
          <el-input v-model="searchItem.str" style="width: 300px"></el-input>
          <el-button v-show="i" @click="removeStr(i)" style="margin-left: 20px"
            ><el-icon><Minus /></el-icon></el-button
          ><el-button v-show="isLast(i)" @click="addStr()" style="margin-left: 20px"
            ><el-icon><Plus /></el-icon
          ></el-button>
        </div>

        <el-divider></el-divider>
        <div>时间范围</div>
        <el-select v-model="minyear" mutiple placeholder="最早年份">
          <el-option
            v-for="y in years"
            :label="y"
            :value="y"
            :key="y"
          ></el-option> </el-select
        ><el-select v-model="maxyear" mutiple placeholder="最晚年份">
          <el-option v-for="y in years" :label="y" :value="y" :key="y"></el-option>
        </el-select>
        <el-divider></el-divider>
        <el-button @click="searchAdvanced()" style="width: 100px; margin-top: 10px"
          >开始搜索<el-icon><Search /></el-icon
        ></el-button> </el-card
    ></el-col>
    <el-col :span="9">
      <el-card>
        <div>高级检索使用说明</div>
        <el-divider></el-divider>
        <div>高级检索支持使用运算符*、+、-、''、""、()进行同一检索项内多个检索词的组合运算，检索框内输入的内容不得超过120个字符。

输入运算符*(与)、+(或)、-(非)时，前后要空一个字节，优先级需用英文半角括号确定。

若检索词本身含空格或*、+、-、()、/、%、=等特殊符号，进行多词组合运算时，为避免歧义，须将检索词用英文半角单引号或英文半角双引号引起来。

例如：
（1）篇名检索项后输入：神经网络 * 自然语言，可以检索到篇名包含“神经网络”及“自然语言”的文献。

（2）主题检索项后输入：(锻造 + 自由锻) * 裂纹，可以检索到主题为“锻造”或“自由锻”，且有关“裂纹”的文献。

（3）如果需检索篇名包含“digital library”和“information service”的文献，在篇名检索项后输入：'digital library' * 'information service'。

（4）如果需检索篇名包含“2+3”和“人才培养”的文献，在篇名检索项后输入：'2+3' * 人才培养。</div>
      </el-card>
    </el-col>
  </el-row>
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
