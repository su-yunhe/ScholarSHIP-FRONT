import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpInstance from '@/utils/http'

export const useScholarStore = defineStore('scholar', () => {
    const scholarInfo = {
        scholar_id:1,
        organization:'BUAA',
        introdunction:'balabala',
        real_name:'S.Harmost',
        essayNum: 7,//处理
        citationNum: 6,
        impactIndex: 1,
    }

    const essayList = [
        {
            id:1,
            title: '论文1',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:2,
            title: '论文2',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:3,
            title: '论文3',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:4,
            title: '论文4',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:5,
            title: '论文5',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:6,
            title: '论文6',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:7,
            title: '论文7',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
    ]

    const removedEssayList = [
        {
            id:1,
            title: '论文1',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:2,
            title: '论文2',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:3,
            title: '论文3',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:4,
            title: '论文4',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:5,
            title: '论文5',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:6,
            title: '论文6',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
        {
            id:7,
            title: '论文7',
            year:2023,
            n_citation:10,
            //url,doi,
            authors:[
                {
                    name:'作者1',
                },
                {
                    name:'作者2',
                }
            ],
            abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
            keywords:['xxx','bbb'],
        },
    ]
    const graph_data ={
        "root_id": "A5023888391",
        "nodes": [
          {
            "id": "A5089455644",
            "text": "Scott Lapinski"
          },
          {
            "id": "A5048491430",
            "text": "Heather Piwowar"
          },
          {
            "id": "A5023888391",
            "text": "Jason Priem"
          },
          {
            "id": "A5091019754",
            "text": "Kristi Holmes"
          },
          {
            "id": "A5062858343",
            "text": "Caitlin Aptowicz Trasande"
          },
          {
            "id": "A5087757869",
            "text": "Andrew E. Gelman"
          },
          {
            "id": "A5063165341",
            "text": "Costello Kaitlin"
          },
          {
            "id": "A5058270881",
            "text": "Tyler Dzuba"
          },
          {
            "id": "A5014077037",
            "text": "Stefanie Haustein"
          },
          {
            "id": "A5051954808",
            "text": "Isabella Peters"
          },
          {
            "id": "A5001893735",
            "text": "Judit Bar‐Ilan"
          },
          {
            "id": "A5055957807",
            "text": "Hadas Shema"
          },
          {
            "id": "A5007913994",
            "text": "Jens Terliesner"
          },
          {
            "id": "A5034085206",
            "text": "James Howison"
          },
          {
            "id": "A5058608862",
            "text": "Heather Piwowar"
          }
        ],
        "lines": [
          {
            "from": "A5089455644",
            "to": "A5048491430",
            "text":"合著",
            "article": "Riding the crest of the altmetrics wave: How librarians can help prepare faculty for the next generation of research impact metrics"
          },
          {
            "from": "A5089455644",
            "to": "A5023888391",
            "text":"合著",
            "article": "Riding the crest of the altmetrics wave: How librarians can help prepare faculty for the next generation of research impact metrics"
          },
          {
            "from": "A5048491430",
            "to": "A5023888391",
            "text":"合著",
            "article": "Riding the crest of the altmetrics wave: How librarians can help prepare faculty for the next generation of research impact metrics"
          },
          {
            "from": "A5023888391",
            "to": "A5091019754",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5023888391",
            "to": "A5062858343",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5023888391",
            "to": "A5087757869",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5091019754",
            "to": "A5062858343",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5091019754",
            "to": "A5087757869",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5062858343",
            "to": "A5087757869",
            "text":"合著",
            "article": "Measuring Scholarly Impact: The Influence of 'Altmetrics'"
          },
          {
            "from": "A5023888391",
            "to": "A5063165341",
            "text":"合著",
            "article": "Prevalence and use of Twitter among scholars"
          },
          {
            "from": "A5023888391",
            "to": "A5058270881",
            "text":"合著",
            "article": "Prevalence and use of Twitter among scholars"
          },
          {
            "from": "A5063165341",
            "to": "A5058270881",
            "text":"合著",
            "article": "Prevalence and use of Twitter among scholars"
          },
          {
            "from": "A5014077037",
            "to": "A5051954808",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5014077037",
            "to": "A5001893735",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5014077037",
            "to": "A5023888391",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5014077037",
            "to": "A5055957807",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5014077037",
            "to": "A5007913994",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5051954808",
            "to": "A5001893735",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5051954808",
            "to": "A5023888391",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5051954808",
            "to": "A5055957807",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5051954808",
            "to": "A5007913994",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5001893735",
            "to": "A5023888391",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5001893735",
            "to": "A5055957807",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5001893735",
            "to": "A5007913994",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5023888391",
            "to": "A5055957807",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5023888391",
            "to": "A5007913994",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5055957807",
            "to": "A5007913994",
            "text":"合著",
            "article": "Coverage and adoption of altmetrics sources in the bibliometric community"
          },
          {
            "from": "A5034085206",
            "to": "A5058608862",
            "text":"合著",
            "article": "Grant proposal: Improving the visibility of scholarly software work"
          },
          {
            "from": "A5034085206",
            "to": "A5023888391",
            "text":"合著",
            "article": "Grant proposal: Improving the visibility of scholarly software work"
          },
          {
            "from": "A5058608862",
            "to": "A5023888391",
            "text":"合著",
            "article": "Grant proposal: Improving the visibility of scholarly software work"
          }
        ]
      }

    const getScholarInfo = async(scholarID, userID) => {

    }

    const getPersonalScholarInfo = async(scholarID, userID) => {

    }

    const getGraphData = async(root_id) => {
        await httpInstance.post('/get_relation_map', root_id).then(res => {
            console.log("get_relation_map res:", res);
            graph_data = res.data;
          })

    }
    const graphLineDisplay = (fromID, toID) => {
        for(let i = 0; i < graph_data.lines.length; i++){
            let line = graph_data.lines[i];
            if(line.from == fromID && line.to == toID){
                line.text = line.article;
             }else if(line.text != "合著"){
                line.text = "合著";
            }
        }
    }

    return{
        scholarInfo,
        essayList,
        removedEssayList,
        graph_data,
        getScholarInfo,
        getPersonalScholarInfo,
        getGraphData,
        graphLineDisplay
    }
}, {
  persist: true,
})