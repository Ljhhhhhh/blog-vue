<template>
  <div class='container'>
    <head-info />
    <el-row type="flex" justify="center">
    <el-col class="article-wrap animated slideDown" :xs="22" :sm="22" :md="18" :lg="16">
      <div class="article-head">
        <p class="title">{{ detail.title }}</p>
        <p class="info">
          <span><i class="iconfont icon-liwu" /><i>发表于{{ detail.time }}</i></span>
          <span>
            <i class="iconfont icon-folder" /><i>分类于</i>
            <nuxt-link :to="'/categorys/#' + detail.category">{{ detail.category }}</nuxt-link>
          </span>
        </p>
      </div>
      <div class="article-intro">{{detail.intro}}</div>
      <div class="article-content" v-html="detail.content"></div>
    </el-col>
    </el-row>
    <!-- {{detail}} -->
  </div>
</template>
<script>
  import {
    getArticleDetail
  } from '@@/api'
  import dayjs from 'dayjs'

  export default {
    head() {
      return {
        title: `${this.detail.title}`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.detail.title},卢洁辉的个人博客` }
        ]
      }
    },
    async asyncData({
      params
    }) {
      const id = params.id;
      const {
        data
      } = await getArticleDetail(id);
      return {
        detail: data
      }
    },
    data() {
      return {}
    },
  }

</script>
<style lang="scss" scoped>
  .article-wrap {
    animation-delay: 2s;
    .article-head {
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
    }
    .article-intro{
      margin-top: 30px;
      text-align: center;
      color: #555;
    }
    .article-content{
      margin: 60px auto 100px;
    }
  }

</style>
