<template>
  <div class="container">
    <div class="search" :class="isShowSearch ? '' : 'search-all-bottom'">
      <button type="button" @click="HighSearch">高级选项</button>
      <input
        :class="isShowSearch ? 'input2' : ''"
        v-model="inputValue"
        @input="getSearch"
        @focus="showSearch"
        @blur="hideSearch"
        placeholder="请输入"
      />
      <button type="button" @click="getAccurateSearch">搜索</button>
    </div>
    <div class="search-box" v-show="isHighSearch">
      <div
        v-for="item in searchChoices"
        class="search-list"
      >
        <a :href="item.url" target="_blank" @click="aHideSearch2">
          <div :class="item.url == mouseKey ? 'search-title' : ''">{{ item.title }}</div>
        </a>
      </div>
    </div>
    <div class="search-box" v-show="isShowSearch">
      <div
        v-for="item in showData"
        class="search-list"
        @mouseenter="getSearchList(item.url)"
        @mouseleave="clearSearchList"
      >
        <a :href="item.url" target="_blank" @click="aHideSearch2">
          <div :class="item.url == mouseKey ? 'search-title' : ''">{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      showData: [],
      mouseKey: "",
      isShowSearch: false, //显示搜索详情区域
      isControlShow: true,
      isHighSearch: false,
      searchChoices: [
        
      ],
      // 模拟接口获取的数据
      sourceData: [
        {
          title: "js获取url的参数",
          url:
            "https://blog.csdn.net/qq_41793354/article/details/121564827?spm=1001.2014.3001.5501",
        },
        {
          title: "后台返回数字，前端显示对应的文字",
          url:
            "https://blog.csdn.net/qq_41793354/article/details/121636702?spm=1001.2014.3001.5501",
        },
        {
          title: "js过滤数组对象中的重复对象",
          url:
            "https://blog.csdn.net/qq_41793354/article/details/120492138?spm=1001.2014.3001.5501",
        },
        {
          title: "js统计字符串中每一个字符出现的个数",
          url:
            "https://blog.csdn.net/qq_41793354/article/details/121208449?spm=1001.2014.3001.5501",
        },
        {
          title: "vue+element-ui实现表格分页",
          url:
            "https://blog.csdn.net/qq_41793354/article/details/120648691?spm=1001.2014.3001.5501",
        },
      ],
      // 模拟接口获取的推荐数据
      recommendedData: [
        {
          title: "看看我的博客",
          url: "https://blog.csdn.net/qq_41793354?spm=1001.2101.3001.5343",
        },
        {
          title: "去B站学习",
          url: "https://www.bilibili.com/",
        },
        {
          title: "去百度学习",
          url: "https://www.baidu.com/",
        },
        {
          title: "学习element-ui",
          url: "https://element.eleme.cn/#/zh-CN",
        },
        {
          title: "学习vant",
          url: "https://vant-contrib.gitee.io/vant/#/zh-CN/home",
        },
      ],
    };
  },
  methods: {
    /**
     * 模仿百度输入框的效果
     * 根据输入的值进行本地的模糊搜索
     * 聚焦输入框的时候，没有输入字段，先展示推荐内容
     * 如果输入字段，有则显示匹配信息，没有则不显示
     * */
    getSearch() {
      let keyWord = this.inputValue.toLowerCase();
      let arr = [];
      // sourceData: 数据源
      arr = this.sourceData.filter((item) => {
        if (item.title.toLowerCase().indexOf(keyWord) !== -1) {
          return item;
        }
      });
      // showData:展示的数据
      this.showData = arr;
      // 聚焦输入框的时候，没有输入字段，先展示推荐内容
      this.inputValue == "" ? (this.showData = this.recommendedData) : "";
      // 输入字段有匹配到信息，显示下拉框，没有则隐藏下拉框
      this.showData.length == 0
        ? (this.isShowSearch = false)
        : (this.isShowSearch = true);
    },
    // 监听输入框获取焦点
    showSearch() {
      if (this.inputValue == "") {
        this.isShowSearch = true;
        this.showData = this.recommendedData;
      } else {
        // 输入字段没有匹配到信息,隐藏下拉框
        if (this.showData.length == 0) {
          this.isShowSearch = false;
        } else {
          this.isShowSearch = true;
        }
      }
    },
    /**
     * 输入框失去焦点的时候触发
     * 判断是不是进入搜索详情区域的失去焦点
     * 如果是点击搜索详情区域的，搜索详情区域不隐藏
     * 点击其它区域，搜索详情区域隐藏
     * */
    hideSearch() {
      this.showData.length == 0 ? (this.isShowSearch = false) : "";
      this.isControlShow ? "" : (this.isShowSearch = false);
    },
    // 点击的时候隐藏搜索详情区域
    aHideSearch2() {
      this.isShowSearch = false;
    },
    // 鼠标移入搜索详情区域的时候改变文字颜色
    getSearchList(e) {
      this.mouseKey = e;
      this.isControlShow = true;
    },
    // 鼠标移出搜索详情区域的时候清空文字颜色
    clearSearchList() {
      this.mouseKey = "";
      this.isControlShow = false;
    },
    /**
     * 发送给后台进行深层次的模糊搜索
     * */
    getAccurateSearch() {
      // axios.post ...
    },
    HighSearch(){
        this.isHighSearch = true;
    }
  },
  created() {
    this.showData = JSON.parse(JSON.stringify(this.sourceData));
  },
};
</script>
<style scoped="scoped" lang="scss">
.container {
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  .search {
    display: flex;

    input {
      padding: 0 0 0 14px;
      width: 550px;
      font-size: 14px;
      height: 40px;
      border: 2px solid #ccc;
      border-radius: 5px 0 0 5px;
    }

    .input2 {
      border-radius: 5px 0 0 0px;
      outline: none;
      border: 2px solid #4662d9;
      box-sizing: border-box;
      border-bottom: 0;
    }

    input:focus {
      border-radius: 5px 0 0 0px;
      outline: none;
      border: 2px solid #4662d9;
      box-sizing: border-box;
      border-bottom: 0;
    }

    button {
      background-color: #4662d9;
      color: white;
      width: 80px;
      border: 2px solid #4662d9;
      cursor: pointer;
    }
  }

  .search-all-bottom {
    input:focus {
      border: 2px solid #4662d9;
    }
  }

  .search-box {
    width: 550px;
    padding: 5px 0 10px 14px;
    border: 2px solid #4662d9;
    border-top: 0;

    .search-list {
      width: 550px;
      margin-top: 5px;

      .search-title {
        color: blue;
      }
    }
  }
}
</style>
