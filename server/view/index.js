/**
 * @description pc端页面模版
 */
import { minify } from 'html-minifier'
import creator from '../service/creator'
import { client } from '../../config'

function escapeHTML(content) {
  return content.replace(/[<]/g, '\\u003c')
}

export default (config) => {
  console.log(config)
  const clientConfig = `var __CLIENT_CONFIG__ = ${escapeHTML(JSON.stringify(client))}`
  const links = creator(config.pageName)
  return minify(`
    <html lang="zh-cmn-Hans">
      <head>
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <title>${config.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        ${links.stylesheet}
        <script>${clientConfig}</script>
      </head>
      <body>
        <div id="app"></div>
        ${links.script}
      </body>
    </html>`, {
    caseSensitive: true,
    collapseWhitespace: true
  })
}
