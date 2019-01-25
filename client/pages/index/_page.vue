<template>
  <div>
    <head-info/>
    <el-row
      class="article_wrap animated bounce"
      type="flex"
      justify="center">
      <el-col
        v-for="article in articles"
        :xs="22"
        :sm="20"
        :lg="18"
        :xl="14"
        :key="article.id"
        class="article">
        <p class="title">{{ article.title }}</p>
        <p class="info">
          <span><i class="iconfont icon-liwu"/><i>发表于{{ article.time }}</i></span>
          <span>
            <i class="iconfont icon-folder"/><i>分类于</i>
            <a href="/">{{ article.category }}</a>
          </span>
        </p>
        <p class="intro">{{ article.intro }}</p>
        <span class="read-detail" @click="detail(article._id)">阅读全文<i>»</i></span>
        <span class="division"/>
      </el-col>
    </el-row>
      <el-pagination
        :total="total"
        :page-size="PAGESIZE"
        class="page animated bounce"
        background
        :current-page="curPage"
        @current-change="setPage"
        layout="prev, pager, next"
      />
  </div>
</template>
<script>
import {getArticles, getCount} from '@@/api/index'
import headInfo from '@/components/headInfo'
import dayjs from 'dayjs'

export default {
  components: {
    headInfo
  },
  async asyncData({app, params, store}) {
    let pageTotal;
    const PAGESIZE = 10
    if (!store.state.countData.articleTotal) {
      const result = await getCount()
      pageTotal = result.articleTotal / PAGESIZE
    } else {
      pageTotal = store.state.countData.articleTotal / PAGESIZE
    }
    let page;
    if (!/^\d+$/.test(params.page)) {
      app.router.push({
        name: 'index-page',
        params: {
          page: 1
        }
      })
    } else {
      page = Number(params.page)
      page = page > pageTotal ? 1 : page
    }
    const {articles, total} = await getArticles(page)
    articles.forEach(article => {
      article.time = dayjs(article.createdAt).format('YYYY-MM-DD HH:MM')
    });
    const curPage = page
    return {articles, total, curPage, PAGESIZE}
  },
  methods: {
    detail(id) {
      this.$router.push({
        name: 'detail-id',
        params: {
          id
        }
      })
    },
    setPage(page) {
      this.$router.push({
        name: 'index-page',
        params: {
          page
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.article_wrap {
  padding-top: 70px;
  flex-wrap: wrap;
  animation-delay: 2s;
  .article {
    padding: 25px;
    border-radius: 10px;
    margin: 50px auto 0;
    border: 1px solid #e3e4e5;
    box-shadow: 0 0 4px #d3d4d5;
    min-width: 52%;
    p.title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 10px;
    }
    p.info {
      font-size: 13px;
      color: #999;
      text-align: center;
      span {
        padding: 0 10px;
        &:first-child {
          border-right: 1px solid #ddd;
        }
        i {
          margin-right: 3px;
          vertical-align: middle;
          font-style: normal;
        }
        a {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    p.intro {
      font-size: 14px;
      color: #333;
      margin-top: 50px;
    }
    span.read-detail {
      line-height: 34px;
      height: 34px;
      width: 120px;
      color: #fff;
      background: #222;
      display: block;
      text-align: center;
      margin: 40px auto;
      transition: all 0.3s;
      box-sizing: border-box;
      border: 2px solid #222;
      cursor: pointer;
      i {
        font-style: normal;
        margin-left: 5px;
      }
      &:hover {
        color: #222;
        background: #fff;
      }
    }
    span.division {
      display: block;
      width: 90px;
      height: 1px;
      background: #ccc;
      margin: 50px auto;
      animation: changeWidth 2s ease-in-out infinite;
    }
    @keyframes changeWidth {
      0% {
        // width: 90px;
        transform: scaleX(1);
        background: #ccc;
      }
      50% {
        // width: 300px;
        transform: scaleX(1.2);
        background: #eee;
      }
      100% {
        // width: 90px;
        transform: scale(1);
        background: #ccc;
      }
    }
  }
}
.page {
  margin: 15px auto;
  animation-delay: 2s;
  text-align: center;
}
</style>
