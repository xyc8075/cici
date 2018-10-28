const merge = require('lodash.merge')
const defaultConfig = require('./default')

const env = process.env.NODE_ENV
console.log('current env:', env)
let envConfig = {}
try {
  env && (envConfig = require(`./${env}`)) // eslint-disable-line
} catch (e) {
  console.error(`config ${env}.js is not exist `)
}
module.exports = merge({}, defaultConfig, envConfig)
