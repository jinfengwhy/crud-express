/**
 * router.js 路由模块
 * 职责：
 *  根据请求方法+请求路径匹配不同的请求处理函数
 * 模块职责要单一
 */
var fs = require('fs')
var express = require('express')

// 1. 创建路由对象
var router = express.Router()

// 2. 把路由都挂载到 router 对象中
router.get('/students', function (req, res) {
    fs.readFile('./db.json', function(error, data) {
        if (error) {
            res.status(500).send('Server error.')
        }
        res.render('index.html', {
            "students": JSON.parse(data.toString()).students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 返回结果      
    console.log(req.body)
    res.send('hello')
})

router.get('/students/edit', function (req, res) {
})

router.post('/students/edit', function (req, res) {
})

router.get('/students/delete', function (req, res) {
})

// 3. 把 router 导出
module.exports = router
