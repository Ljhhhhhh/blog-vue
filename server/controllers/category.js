const Article = require('../models/article')
const Category = require('../models/category')

class CategoryController {
  async getArticleByCategory() {
    const list = await Article.aggregate([
      {
        $match: { del: false}
      },
      {$group: {
        _id: "$category",
        list: {
          $push: {id: "$_id", title: "$title", createdAt: "$createdAt"},
          // $push: "$$ROOT"
        }
      }}
    ])
    return list;
  }

  async getList() {
    const categorys = await Category.find()
    return {
      categorys
    }
  }
}

module.exports = CategoryController