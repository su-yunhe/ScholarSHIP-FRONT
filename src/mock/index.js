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