import { host, staticPort } from '../../config'

const IS_ONLINE = process.env.IS_ONLINE

const assets = IS_ONLINE === 1 ? require('../../dist/assets.json') : {}

const matchCSSFile = (pageName) => {
  const reg = new RegExp(`^${pageName}\\..+\\.css$`)
  let file = ''
  let isFirstMatch = true
  assets.forEach((item) => {
    if (isFirstMatch && reg.test(item.name)) {
      file = item.name
      isFirstMatch = false
    }
  })
  return file
}

const matchVendorFile = () => {
  const vendorJson = require('../../dist/vendor.json') // eslint-disable-line
  return `${vendorJson.name}.js`
}

//const matchCSSFile = (pageName, common = false) => {
//  const reg = common ? new RegExp(`^${pageName}\\.common\\..+\\.css$`) : new RegExp(`^${pageName}\\.(?!common).+\\.css$`)
//  let file = ''
//  let isFirstMatch = true
//  assets.forEach((item) => {
//    if (isFirstMatch && reg.test(item.name)) {
//      file = item.name
//      isFirstMatch = false
//    }
//  })
//  return file
//}

const matchJSFile = (pageName) => {
  const reg = new RegExp(`^${pageName}\\..+\\.bundle\\.js$`)
  let file = ''
  let isFirstMatch = true
  assets.forEach((item) => {
    if (isFirstMatch && reg.test(item.name)) {
      file = item.name
      isFirstMatch = false
    }
  })
  return file
}

module.exports = (pageName) => {
  if (IS_ONLINE) {
    const commonCssFile = matchCSSFile(pageName, true)
    const projectCssFile = matchCSSFile(pageName)
    return {
      stylesheet: `<link rel="stylesheet" type="text/css" href="${matchCSSFile(pageName)}" />`,
      script: `
        <script src=http://${host}:${staticPort}/${matchVendorFile()} ></script>
        <script src=http://${host}:${staticPort}/dist/${pageName}.bundle.js ></script>
      `
    }
  }
  return {
    stylesheet: ``,
    script: `
      <script src=http://${host}:${staticPort}/${matchVendorFile()} ></script>
      <script src=http://${host}:${staticPort}/dist/${pageName}.bundle.js ></script>
    `
  }

}
