<template>
  <div class="pageHeader">
    <div class="logo-box" @click="goToHome">
      <img src="../../assets/images/scholarAvator.jpg" class="logo-img" />
    </div>
    <div class="search-btn" @click="dialogVisible = true">
      <span>高级检索</span>
    </div>
    <el-dialog
      title="高级检索"
      v-model="dialogVisible"
      width="70%"
    >
      <div><span>这是一段信息</span></div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-input
      v-model="input"
      placeholder="搜索"
      style="width: 600px; margin-top: 50px"
    ></el-input>
    <el-button style="width: 80px; margin-top: 50px; margin-left: 30px">搜索</el-button>
  </div>
  <div>
    <div style="float: left; width: 250px; margin-left: 150px; margin-right: 20px">
      <div style="font-size: 18px; height: 80px">
        <span
          style="
            float: left;
            text-align: right;
            margin-top: 20px;
            color: grey;
            font-size: 15px;
            margin-left: 0px;
          "
        >
          筛选方式
        </span>
      </div>
      <el-card width="" height="">
        <el-subheader>时间</el-subheader>
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
    <div style="float: left"></div>
    <div v-for="item in paginatedData">
      {{ item.name }}
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
import Input from "../../utils/Input.vue";
import { ref, watchEffect, computed, onMounted } from "vue";
const value = ref("");
const input = ref("");
const lazyValue = ref("");
const items = ref([]);
const dialogVisible = ref(false);
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
    { name: "a" },
    { name: "b" },
    { name: "c" },
    { name: "d" },
    { name: "e" },
    { name: "f" },
    { name: "g" },
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
