module.exports = {
  dbs: 'mongodb://blog_api.cixi518.com:27017/blog',
  redis: {
    get host() {
      return 'localhost'
    },
    get port() {
      return 6379
    }
  },
}