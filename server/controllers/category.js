const Article = require('../models/article')

class CategoryController {
  async getList() {
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
}

module.exports = CategoryController