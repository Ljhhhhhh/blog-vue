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
            <nuxt-link :to="'/categorys/#' + article.category">{{ article.category }}</nuxt-link>
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
import dayjs from 'dayjs'
import '@/assets/styles/page.scss'

export default {
  head() {
      return {
        title: '首页 | Ljhhhhhh\'s Blog',
        meta: [
          { hid: 'description', name: 'description', content: '博客首页,卢洁辉的个人博客' }
        ]
      }
    },
  async asyncData({app, params, store}) {
    // let pageTotal;
    const PAGESIZE = 5
    // if (!store.state.countData.articleTotal) {
    //   const result = await getCount()
    //   pageTotal = result.articleTotal / PAGESIZE
    // } else {
    //   pageTotal = store.state.countData.articleTotal / PAGESIZE
    // }
    // let page;
    // if (!/^\d+$/.test(params.page)) {
    //   app.router.push({
    //     name: 'index-page',
    //     params: {
    //       page: 1
    //     }
    //   })
    // } else {
    //   page = Number(params.page)
    //   page = page > pageTotal ? 1 : page
    // }
    const {articles, total} = await getArticles(1)
    articles.forEach(article => {
      article.time = dayjs(article.createdAt).format('YYYY-MM-DD HH:MM')
    });
    const curPage = 1
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
        name: 'page-page',
        params: {
          page
        }
      })
    },
  }
}
</script>
