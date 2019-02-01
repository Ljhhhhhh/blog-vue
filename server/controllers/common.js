const Article = require('../models/article')
const Category = require('../models/category')
const Tag = require('../models/tag')

class CommonController {
  async getCount() {
    const categoryTotal = await Category.find().countDocuments();
    const tagTotal = await Tag.find().countDocuments();
    const articleTotal = await Article.find({
      del: false
    }).countDocuments();
    return {
      categoryTotal,
      tagTotal,
      articleTotal
    }
  }
}

module.exports = CommonController