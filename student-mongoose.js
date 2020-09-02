var mongoose = require('mongoose')

var Schema = mongoose.Schema

// 1. 连接数据库
mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true, useUnifiedTopology: true})

// 2. 设计文档结构
var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
        
    },
    age: {
        type: Number
    },
    major: {
        type: String
    }
})

// 3. 将文档对象发布为模型
var Student = mongoose.model('Student', studentSchema)

// 导出模型对象
module.exports = Student
