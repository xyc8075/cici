import fs from 'fs'
import path from 'path'
import React from 'react'

const router = require('koa-router')()

const initController = () => {
  let result = []
  const absolutePath = path.join(__dirname, '../controller')
  const routerFileList = fs.readdirSync(absolutePath)
  routerFileList.forEach((file) => {
    const routerConfig = require(path.join(absolutePath, file)) // eslint-disable-line
    if (routerConfig && routerConfig.length) {
      result = result.concat(routerConfig)
    }
  })
  return result
}

const render = (ctx, View) => (props) => {
  ctx.type = 'text/html'
  ctx.body = `<!DOCTYPE html>${View(props)}`
}

const initRouter = (routerConfig) => {
  routerConfig.forEach((config) => {
    const { method = 'get', view, controller } = config
    const Page = require(path.join(__dirname, '../view', view)) // eslint-disable-line
    router[method.toLowerCase()](config.path, async (ctx, next) => {
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      ctx.render = render(ctx, Page)
      const result = await controller.call(ctx, next)
      if (typeof result !== 'undefined') {
        ctx.type = 'application/json'
        ctx.body = result
      }
    })
  })
}

const routes = initController()

module.exports = {
  routes,
  use: (app) => {
    initRouter(routes)
    app.use(router.routes()).use(router.allowedMethods())
  }
}
