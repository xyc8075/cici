import Koa from 'koa'
import staticServer from 'koa-static'
import bodyParser from 'koa-bodyparser'
import favicon from 'koa-favicon'
import router from './service/router'
import { port } from '../config'


// import { MongoClient } from 'mongodb'
// import assert from 'assert'

// const url = 'mongodb://localhost:27017'

// const dbName = 'ye'

// MongoClient.connect(url, (error, client) => {
//   assert.equal(null, error)
//   console.log('Connected successfully to server')
//   const db = client.db(dbName)
// })

const app = new Koa()

app.use(bodyParser({ multipart: true, strict: false }))

app.use(staticServer('./dist/', { maxage: 30 * 24 * 3600 * 1000 }))

app.use(favicon('./favicon.ico'))

router.use(app)

app.listen(port, () => {
  console.log(`Koa service listening on port ${port}`)
})

app.on('error', (err) => {
  console.error('===================server error: ', err)
})

module.exports = app
