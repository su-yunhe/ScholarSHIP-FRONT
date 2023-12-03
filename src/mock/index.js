import Mock from 'mockjs'

const testData = Mock.mock('/test','post',{
	status:200, //请求成功状态码
	dataList:[
        {
            groupId:1,
            groupName:"六个核桃",
            groupBuilder:"Alex",
            buildTime:"2023-08-25T01:52:05.296Z",
            occupation:"member"
        },
        {
            groupId:2,
            groupName:"六个胡桃",
            groupBuilder:"aaaa",
            buildTime:"2023-08-23T11:52:05.296Z",
            occupation:"member"
        },
        {
            groupId: 3,
            groupName:"六个黄桃",
            groupBuilder:"bbbbbbb",
            buildTime:"2023-08-26T08:52:05.296Z",
            occupation:"manager"
        }
    ]
})

Mock.mock('/test/team','post',{
    res:1,
    data:"六个核桃",
})

Mock.mock('/test/create','post',{
    res:1,
    data:{
        id:23,
        info:"abcde"
    },
})

Mock.mock('/test/memberlist','post',{
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