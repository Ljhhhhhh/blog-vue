const Article = require('../models/article')
const Category = require('../models/category')
const Tag = require('../models/tag')

class ArticleController {
  async getList(page, size) {
    const articles = await Article
      .find({
        del: false
      }, {
        content: 0
      })
      .skip((page - 1) * size)
      .limit(size)
      .sort({
        'createdAt': -1
      });
    const total = await Article.find({
      del: false
    }).countDocuments();
    return {
      articles,
      total
    };
  }

  async getDetail(id) {
    const detail = await Article.findOne({
      _id: id
    })
    return detail
  }

  async handleArticle(body) {
    const {
      title,
      intro,
      content,
      category,
      tags
    } = body;
    let id = null;
    if (body.id) {
      id = body.id;
    }
    const hasCategory = await Category.findOne({
      name: category
    })
    if (!hasCategory) {
      const newCategory = new Category({
        name: category,
        total: 1
      })
      await newCategory.save();
    } else {
      await hasCategory.update({
        $inc: {
          total: 1
        }
      })
    }
    tags.forEach(async tag => {
      const hasTag = await Tag.findOne({
        name: tag
      })
      if (!hasTag) {
        const newTag = new Tag({
          name: tag,
          total: 1,
        })
        await newTag.save();
      } else {
        await hasTag.update({
          $inc: {
            total: 1
          }
        })
      }
    });

    let article = null;
    let res = null;
    const data = {
      title,
      intro,
      content,
      category,
      tags
    }
    if (!id) {
      article = new Article(data)
      res = await article.save();
    } else {
      res = await Article.findOneAndUpdate({
        _id: id
      }, data);
    }
    return res
  }

  async delArticle(id) {
    const result = await Article.findById(id)
    const {
      tags,
      category
    } = result
    await Category.findOneAndUpdate({
      name: category
    }, {
      $inc: {
        total: -1
      }
    })

    tags.forEach(async tag => {
      await Tag.findOneAndUpdate({
        name: tag
      }, {
        $inc: {
          total: -1
        }
      })
    })

    const res = await result.update({
      del: true
    })
    return res
  }
}

module.exports = ArticleController;