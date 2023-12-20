<template>
    <div>
      <div style="margin-top:50px;width: calc(100% - 10px);height:100vh;">
        <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick"/>
      </div>
    </div>
  </template>
   
  <script>
  import {useScholarStore} from '../../stores/scholar'
  // const scholarStore = useScholarStore();
  export default {
    name: 'links',
    components: { },
    data() {
      return {
        scholarStore : useScholarStore(),
        g_loading: true,
        demoname: '---',
        graphOptions: {
          defaultNodeBorderWidth: 0,//默认的节点边框粗细（像素）
          defaultNodeColor: 'rgba(238, 178, 94, 1)',//默认的节点背景颜色
          //defaultNodeFontColor 默认节点文字颜色
          //defaultNodeBorderColor 默认节点边框颜色
          allowSwitchLineShape: true,
          allowSwitchJunctionPoint: true,
          defaultLineShape: 1,
          'layouts': [
            {
              'label': '自动布局',
              'layoutName': 'force',
              'layoutClassName': 'seeks-layout-force'
            }
          ],
          defaultJunctionPoint: 'border'
           }
      };
    },
    created() {
    },
    mounted() {
      this.demoname = this.$route.params.demoname;
      this.setGraphData();
    },
    methods: {
        setGraphData() {
            //id就是学者id，text就是学者真实姓名,color是圆形节点背景色，borderColor是圆形边框色
            const scholarStore = useScholarStore();
            const graph_data = scholarStore.graph_data;
            console.log("graph_data:",graph_data);
            this.$refs.graphRef.setJsonData(graph_data, (graphInstance) => {
            // 这些写上当图谱初始化完成后需要执行的代码
            });
        },
        onNodeClick(nodeObject){
            console.log('点击节点:',nodeObject);
            //可以借此跳转门户
        },
        onLineClick(lineObject, linkObject, $event) {
          console.log('点击连线:', lineObject);
          const scholarStore = useScholarStore();
          // scholarStore.graphLineDisplay(lineObject.from,lineObject.to);
          const links = this.$refs.graphRef.getLinks();
          for(let i = 0; i < links.length; i++){
            let line = links[i].relations[0];
            if(line.from == lineObject.from && line.to == lineObject.to){
                line.text = scholarStore.graph_data.lines[i].article;

             }else if(line.text != "合著"){
                line.text = "合著";
            }
        }
        },
    }
  };
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
    .c-my-node{
      background-position: center center;
      background-size: 100%;
      border:#ff8c00 solid 2px;
      height:80px;
      width:80px;
      border-radius: 40px;
    }
    .c-node-name{
      width:160px;margin-left:-40px;text-align:center;margin-top:85px;
    }
  </style>