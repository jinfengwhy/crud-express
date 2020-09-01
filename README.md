## 基于 node.js 的 express 框架

* 做学生管理系统的增删改查
* 首页：http://127.0.0.1:3000/students


### 路由设计

请求方法 | 请求路径 | GET参数 | POST参数 | 备注
:-: | :-: | :-: | :-: | :-:
GET | /students | | | 渲染首页
GET | /students/new | | | 渲染添加学生页面
POST | /students/new | | name,age,gender,major | 处理添加学生请求
GET | /students/edit | id | | 渲染编辑学生页面
POST | /students/edit | | id,name,age,gender,major| 处理编辑学生请求
GET | /students/delete | id | | 处理删除学生请求