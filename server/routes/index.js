const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const Image = require('../models/image')
const Article = require('../models/article')
const Category = require('../models/category')
const Tag = require('../models/tag')

router.post('/articles', async (ctx, next) => {
  const {
    size,
    page
  } = ctx.request.body;
  const articles = await Article
    .find({
      del: false
    })
    .skip((page - 1) * size)
    .limit(size)
    .sort({
      'createdAt': -1
    });
  const total = await Article.find({
    del: false
  }).count();
  if (articles) {
    ctx.body = {
      articles,
      total,
      code: 0,
    }
  } else {
    ctx.body = {
      code: 10001
    }
  }
})

router.post('/articles/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const res = await Article.findOne({
    _id: id
  })
  if (res) {
    ctx.body = {
      code: 0,
      data: res
    }
  } else {
    ctx.body = {
      code: 1,
    }
  }
})

router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files.file;
  const name = Date.now();
  const ext = file.name.split('.').pop();
  const reader = fs.createReadStream(file.path);
  let uploadPath = `../public/images/${name}.${ext}`;
  let filePath = path.join(__dirname, uploadPath);
  const savePath = `/images/${name}.${ext}`
  const upSteam = fs.createWriteStream(filePath);
  reader.pipe(upSteam);
  const image = new Image({
    savePath
  })
  const res = await image.save();
  if (res) {
    ctx.body = {
      url: 'http://127.0.0.1:1234' + savePath
    }
  }
})

router.post('/handleArticle', async (ctx, next) => {
  const {
    title,
    intro,
    content,
    category,
    tags
  } = ctx.request.body;
  let id = null;
  if (ctx.request.body.id) {
    id = ctx.request.body.id;
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
  if (res) {
    ctx.body = {
      code: 0,
      msg: '提交成功'
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '删除失败'
    }
  }
})


router.post('/delArticle', async (ctx, next) => {
  const {
    id
  } = ctx.request.body;
  const result = await Article.findById(id)
  const {tags, category} = result
  await Category.findOneAndUpdate({name: category}, {
    $inc: {
      total: -1
    }
  })

  tags.forEach(async tag => {
    await Tag.findOneAndUpdate({name: tag}, {
      $inc: {
        total: -1
      }
    })
  })

  const res = await result.update({del: true})
  // const res = await Article.findOneAndUpdate({
  //   _id: id
  // }, {
  //   del: true
  // });
  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: 1
    }
  }
})

router.get('/tags', async (ctx, next) => {
  const tags = await Tag.find();
  const total = await Tag.find().count();
  ctx.body = {
    code: 0,
    tags,
    total,
  }
})

router.get('/categorys', async (ctx, next) => {
  const categorys = await Category.find();
  const total = await Category.find().count();
  ctx.body = {
    code: 0,
    categorys,
    total,
  }
})

router.get('/getCount', async (ctx, next) => {
  const categoryTotal = await Category.find().count();
  const tagTotal = await Tag.find().count();
  const articleTotal = await Article.find({
    del: false
  }).count();
  ctx.body = {
    code: 0,
    categoryTotal,
    tagTotal,
    articleTotal,
  }
})


module.exports = router