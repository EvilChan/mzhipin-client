# Vue 全栈项目 - 码者直聘（前端）

> 运行环境
>
> Node

> 项目下载（嫌慢的把github换成gitee）

```
git clone https://github.com/CoderAlchemy/mzhipin-client.git
cd mzhipin-client
npm install
npm run serve
```

> 后端项目传送门：http://github.com/CoderAlchemy/mzhipin-server.git

## 项目描述：

1. 此项目为一个前后台分离的招聘的 SPA，包括前端应用和后端应用
2. 包括用户**注册/登录，大神老板列表，实时聊天**等模块
3. 前端：使用 **Vue 全家桶 + ES6 + Webpack** 等技术
4. 后端：使用 **Node + koa+ mongodb + socketIO** 等技术
5. 采用**模块化、组件化、工程化**的模式开发

## 技术选型：

1. 前台数据展现/交互/组件化：**vue + vue-router + vuex + vant**
2. 后台项目：**node + koa + mongodb + mongoose + socket.io**
3. 前后台交互：
   1. ajax 请求：**axios + async / await**
   2. 测试 API 接口：**postman**
4. 模块化：**ES6 + babel**
5. 项目构建/工程化：**webpack + vue-cli3 + eslint**
6. 其它相关库：**blueimp-md5 + js-cookie + rc-queue-anim**

## 前端路由

### 注册

- /register
- Register.vue

### 登陆

- /login
- Login.vue

### 主界面：Main.vue

- 老板主界面

  - /laoban
  - Laoban.vue

- 大神主界面

  - /dashen
  - Dashen.vue

- 消息列表界面

  - /message
  - Message.vue

- 个人中心界面

  - /personal
  - Personal.vue

- 老板信息完善界面

  - /laobaninfo
  - LaobanInfo.vue

- 大神信息完善界面

  - /dasheninfo
  - DashenInfo.vue

- 聊天界面

  - /chat/:userid
  - Chat.vue

## API 接口

### 全称：前后台交互 API 接口

### 重要概念

- API（接口）
- 接口文档
- 测试接口
- 对接口
- 调接口
- 联调
- 前后台分离
- mock（模拟）数据

## 学到什么

### 流程及开发方法

1. 熟悉一个项目的开发流程
2. 学会模块化、组件化、工程化的开发模式
3. 掌握使用 @vue/cli 脚手架初始化 vue 项目开发
4. 学会使用 node + koa + mongoose + mongodb 搭建后台开发

### Vue 插件或第三方库

1. 学会使用 @vue/cli 开发单页应用
2. 学会使用 axios 与后端进行数据交互
3. 学会使用 vuex 管理应用组件状态
4. 学会使用 vant 组件库构件界面
5. 学会使用 mongoose 操作 mongodb 数据库
6. 学会使用 koa 搭建后台路由
7. 学会使用 socket.io 实现实时通信
8. 学会使用 blueimp-md5 对密码进行 MD5 加密处理
9. 学会使用 js-cookies 操作浏览器端 cookie 数据
