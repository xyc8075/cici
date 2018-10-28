module.exports = [
  {
    path: [
      /\/(?!(api))/
    ],
    view: 'index.js',
    async controller() {
      this.render({
        pageName: 'index',
        title: '首页',
      })
    }
  }
]
