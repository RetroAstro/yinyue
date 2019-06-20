const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const TS = require('./utils/index')

const ts = new TS()
const app = new Koa()

app.use(cors())

app.use(bodyParser())

app.use(async ctx => {
  ts.receive(ctx)
  let data = await ts.fetch()
  ctx.response.body = data
})

module.exports = app.callback()
