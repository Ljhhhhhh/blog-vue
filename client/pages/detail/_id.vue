<template>
  <div class='container'>
    <head-info />
    <el-row type="flex" justify="center">
    <el-col class="article-wrap " :xs="22" :sm="22" :md="18" :lg="16">
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
      <el-row>
        <el-col>
          <mavon-editor ref="mavon" v-model="detail.content" :navigation="false" defaultOpen="preview" :editable="false" :toolbarsFlag="false" :subfield="false" :boxShadow="false"></mavon-editor>
        </el-col>
      </el-row>
    </el-col>
    </el-row>
    <!-- {{detail}} -->
  </div>
</template>
<script>
  import {
    getArticleDetail
  } from '@@/api/article'
  import dayjs from 'dayjs'
  import {
    mavonEditor
  } from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';

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
      return {
        toolbars: {
          header: true, // 标题
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          readmodel: true, // 沉浸式阅读
          navigation: true, // 导航目录
        }
      }
    },
    components: {
      mavonEditor
    }
  }

</script>
<style lang="scss" scoped>
  /deep/ .v-note-wrapper .v-note-panel{
      border: none;
    }
  /deep/ .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{
    background: transparent;
    padding: 8px 15px;
  }
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
      margin: 30px auto 60px;
      text-align: center;
      color: #555;
    }
    .article-content{
      margin: 60px auto 100px;
    }
  }

</style>
