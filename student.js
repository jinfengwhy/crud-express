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
  * 根据 id 查找学生
  * @param {Number} id 
  * @param {Function} callback 
  */
 exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        var ret = students.find(function (item) {
            return item.id === id
        })
        return callback(null, ret)
    })
 }

 /**
  * 保存学生
  */
 exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = students[students.length - 1].id + 1
        students.push(student)
        var fileData = JSON.stringify({
            "students": students
        })

        fs.writeFile(dbPath, fileData, function (err) {
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
 exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = parseInt(student.id)

        // EcmaScript 6 中的一个数组方法：find
        // 需要接收一个函数作为参数
        // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
        var stu = students.find(function (item) {
            return item.id === student.id
        })

        // 遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            'students': students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
 }

/**
 * 删除学生
 * @param {Number} id 
 * @param {Function} callback 
 */
 exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err)
        }
        var students = JSON.parse(data).students

        // findIndex 方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === id
        })

        // 第一个参数是删除的起始下标 第二个参数是要删除的数量
        students.splice(deleteId, 1)

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                callback(err)
            }
            callback(null)
        })
    })
 }
