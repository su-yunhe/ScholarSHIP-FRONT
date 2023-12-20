import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpInstance from '@/utils/http'

export const useScholarStore = defineStore('scholar', () => {
    const scholarInfo = {
        scholar_id:1,
<<<<<<< Updated upstream
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
=======
        institution:'BUAA',
        name:'S.Harmost',
        essayNum: 7,//处理
        citation: 6,
        hIndex: 1,
    }

    // const essayList = [
    //     {
    //         id:1,
    //         title: '论文1',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:2,
    //         title: '论文2',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:3,
    //         title: '论文3',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:4,
    //         title: '论文4',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:5,
    //         title: '论文5',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:6,
    //         title: '论文6',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    //     {
    //         id:7,
    //         title: '论文7',
    //         year:2023,
    //         n_citation:10,
    //         //url,doi,
    //         authors:[
    //             {
    //                 name:'作者1',
    //             },
    //             {
    //                 name:'作者2',
    //             }
    //         ],
    //         abstract:'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala',
    //         keywords:['xxx','bbb'],
    //     },
    // ]

    let essayList = []
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
    // const graph_data = {
    //     'rootId': '13',
    //     'nodes': [
    //         { 'id': '1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e', },
    //         { 'id': '2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">李达康</div></div>' },
    //         { 'id': '3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">祁同伟</div></div>' },
    //         { 'id': '4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陈岩石</div></div>' },
    //         { 'id': '5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陆亦可</div></div>' },
    //         { 'id': '6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高育良</div></div>' },
    //         { 'id': '7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">沙瑞金</div></div>' },
    //         { 'id': '8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高小琴</div></div>' },
    //         { 'id': '9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高小凤</div></div>' },
    //         { 'id': '10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">赵东来</div></div>' },
    //         { 'id': '11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">程度</div></div>' },
    //         { 'id': '12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">吴惠芬</div></div>' },
    //         { 'id': '13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">赵瑞龙</div></div>' },
    //         { 'id': '14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">赵立春</div></div>' },
    //         { 'id': '15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陈海</div></div>' },
    //         { 'id': '16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">梁璐</div></div>' },
    //         { 'id': '17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">刘新建</div></div>' },
    //         { 'id': '18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">欧阳菁</div></div>' },
    //         { 'id': '19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">吴心怡</div></div>' },
    //         { 'id': '20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">蔡成功</div></div>' },
    //         { 'id': '22', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">丁义珍</div></div>' }
    //     ],
    //     'lines': [
    //         { 'from': '6', 'to': '1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '6', 'to': '3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '14', 'to': '6', 'text': '前领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '14', 'to': '13', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '14', 'to': '17', 'text': '前部队下属', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '2', 'to': '14', 'text': '前任秘书', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '4', 'to': '15', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '5', 'to': '15', 'text': '属下', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '7', 'to': '4', 'text': '故人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '15', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '1', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '1', 'to': '15', 'text': '同学，生死朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '6', 'to': '12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '15', 'to': '10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '8', 'to': '9', 'text': '双胞胎', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '10', 'to': '5', 'text': '爱慕', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '6', 'to': '9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '13', 'to': '3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '2', 'to': '10', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, 
    //         { 'from': '13', 'to': '11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '7', 'to': '2', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '7', 'to': '6', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '12', 'to': '16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '2', 'to': '18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '13', 'to': '17', 'text': '洗钱工具', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '13', 'to': '8', 'text': '勾结，腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '13', 'to': '9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '19', 'to': '5', 'text': '母女', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '19', 'to': '12', 'text': '姐妹', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '20', 'to': '1', 'text': '发小', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '20', 'to': '18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
    //         { 'from': '18', 'to': '17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
    //         { 'from': '17', 'to': '13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' },
    //         { 'from': '2', 'to': '22', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '8', 'to': '22', 'text': '策划出逃', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '3', 'to': '22', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' },
    //         { 'from': '13', 'to': '22', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }
    //     ] 
    // }

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    const getEssayList = async(scholarID, userID) => {
        await httpInstance.post('/login', loginForm).then(res => {
            console.log("res:", res)
            userInfo.value = res.data
          })
=======
    const getEssayList = async(IDForm) => {
>>>>>>> Stashed changes
    }

    const getPersonalScholarInfo = async(scholarID, userID) => {

    }

    const getGraphData = async(root_id) => {
<<<<<<< Updated upstream
        await httpInstance.post('/get_relation_map', root_id).then(res => {
            console.log("get_relation_map res:", res);
            graph_data = res.data;
          })
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        getEssayList,
>>>>>>> Stashed changes
        getPersonalScholarInfo,
        getGraphData,
        graphLineDisplay
    }
}, {
    persist: true,
  })