/**
 * router.js 路由模块
 * 职责：
 *  根据请求方法+请求路径匹配不同的请求处理函数
 * 模块职责要单一
 */
var fs = require('fs')
var express = require('express')
var Student = require('./student-mongoose.js')

// 1. 创建路由对象
var router = express.Router()

// 2. 把路由都挂载到 router 对象中
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            res.status(500).send('Server error.')
        }
        res.render('index.html', {
            "students": students
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
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        // 得异步操作结束之后，才能做重定向
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    Student.findById(req.query.id, function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    Student.findByIdAndUpdate(req.body.id, req.body, function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    Student.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

// 3. 把 router 导出
module.exports = router
