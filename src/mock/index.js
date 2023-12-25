import Mock from 'mockjs'

const testData = Mock.mock('/test_tags','post',{
	status:200, //请求成功状态码
	dataList:[
        '默认收藏夹',
        '自然科学',
        '计算机科学',
        '编译技术',
        '深度学习'
    ]
})

Mock.mock('/test_followings','post',{
    status:200,
    dataList:[
        {
            name: "xqf",
            intro: "软件学院大三"
        },
        {
            name: "abc",
            intro: "国内知名计算机科学家"
        },
        {
            name: "def",
            intro: "中科院院士"
        },
        {
            name: "hij",
            intro: "原神启动"
        }
    ]
})
Mock.mock('get_institution_basic', 'post',{
    work_cout: {
        "works_count": 6979
    },
    cite_cout: {
        "cited_by_count": 201859
    },
    author_count: 1584,
    authors: [
        {
            "id": 1,
            "name": "B. Todd Heniford"
        },
        {
            "id": 2,
            "name": "David A. Iannitti"
        },
        {
            "id": 3,
            "name": "Kevin M. Ryan"
        },
        {
            "id": 4,
            "name": "Ronald F. Sing"
        },
        {
            "id": 5,
            "name": "László Littmann"
        },
        {
            "id": 6,
            "name": "Mark W. Russo"
        },
        {
            "id": 7,
            "name": "Sarah L. Price"
        },
        {
            "id": 8,
            "name": "John B. Martinie"
        },
        {
            "id": 9,
            "name": "Dionisios Vrochides"
        },
        {
            "id": 10,
            "name": "Brent D. Matthews"
        },
        {
            "id": 11,
            "name": "Michael J. Bosse"
        },
        {
            "id": 12,
            "name": "Addison K. May"
        },
        {
            "id": 13,
            "name": "Richard H. Haug"
        },
        {
            "id": 14,
            "name": "Peter B. Lockhart"
        },
        {
            "id": 15,
            "name": "Kent W. Kercher"
        }
    ],
    homepage_url: {
        "homepage_url": "http://www.carolinashealthcare.org/cmc"
    }
})
Mock.mock('/test_history','post',{
    dataList:[
        {
            title: "论文1",
            author: "xqf"
        },
        {
            title: "论文2",
            author: "xqf"
        },
        {
            title: "论文3",
            author: "xqf"
        },
        {
            title: "论文4",
            author: "xqf"
        },
        {
            title: "论文5",
            author: "xqf"
        }
    ]
})

Mock.mock('/test_','post',{
    res:1,
    data:[
        {
            "userName": "xfy",
            "userEmail": "123456@qq.com",
            "userRealName": "夏凡郁",
            "usertype": 1
        },
        {
            "userName": "zbj",
            "userEmail": "2677169656@qq.com",
            "userRealName": "周宝驹",
            "usertype": 3
        },
        {
            "userName": "syh",
            "userEmail": "2677169656@qq.com",
            "userRealName": "苏云鹤",
            "usertype": 2
        }
    ]
})


Mock.mock('/test/type','post',{
    res:1,
    data:1
})

Mock.mock('/test/addAdmin','post',{
    res:1,
    data:1
})
export default testData