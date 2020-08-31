/**
 * app.js 入口模块
 * 职责：
 *  创建服务
 *  做一些服务相关配置
 */
var express = require('express')
var router = require('./router')

var app = express()

// 开放目录资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

app.use(router)

app.listen(3000, function () {
    console.log('app is running ...')
})