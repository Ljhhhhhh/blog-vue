const Tag = require('../models/tag')
const Article = require('../models/article')

class TagController {
  async getList() {
    const tags = await Tag.find().sort({
      'createdAt': -1
    });;
    const total = await Tag.find().countDocuments();

    return {
      tags,
      total
    }
  }

  async articlesByTag(tag) {
    const res = await Article
      .find({
        tags: tag,
        del: false
      }, {
        title: 1,
        createdAt: 1,
        category: 1
      })
      .sort({
        'createdAt': -1
      });
    return res;
  }
}

module.exports = TagController