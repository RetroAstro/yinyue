const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const routers = require('./routers/router')()

const app = new Koa()

// 加载静态资源
app.use(static(
    path.join(__dirname, './../static')
))

// 模板引擎渲染
app.use(views(path.join(__dirname, './views'), {
    map: { html: 'nunjucks' }
}))

// 处理post请求数据
app.use(bodyParser())

// 加载路由
app.use(routers.routes()).use(routers.allowedMethods())

app.listen(3000)
