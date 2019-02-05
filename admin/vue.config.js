module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: 'blog_api.cixi518.com',
    port: 1235,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
  },
}