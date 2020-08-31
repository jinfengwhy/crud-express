var express = require('express')
var fs = require('fs')

var app = express()

// 开放目录资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))

app.get('/', function (req, res) {
    fs.readFile('./db.json', function(error, data) {
        if (error) {
            res.status(500).send('Server error.')
        }
        res.render('index.html', {
            "students": JSON.parse(data.toString()).students
        })
    })
})

app.listen(3000, function () {
    console.log('app is running ...')
})