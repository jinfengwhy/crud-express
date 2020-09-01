/**
 * student.js
 * 职责：
 *  操作文件中的数据，只处理数据，不关心业务
 */


 var fs = require('fs')

 var dbPath = './db.json'

 /**
  * 获取所有学生列表
  * callback 中的参数
  *     第一个参数是 err
  *         成功是 null
  *         失败是 错误对象
  *     第二个参数是 data
  *         成功是 数组
  *         失败是 undefined
  * return []
  */
 exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
 }

 /**
  * 保存学生
  */
 exports.save = function (student, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var fileData = JSON.stringify({
            "students": students
        })

        fs.writeFile('./db.json', fileData, function (err) {
            if (err) {
                // 失败 传错误对象到上层（调用者）
                return callback(err)
            }
            // 成功 传 null 到上层
            callback(null)
        })
    })
 }

 /**
  * 更新学生
  */
 exports.update = function () {

 }

 /**
  * 删除学生
  */
 exports.delete = function () {

 }
