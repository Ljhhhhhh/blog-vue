<template>
  <div class="container">
    <head-info />
    <el-row type="flex" justify="center" class="content">
      <el-col :xs="22" :sm="20" :lg="18" :xl="14" class="article_wrap optionIn">
        <h1 class="slideInLeft"><strong>{{tag}}</strong><small>标签</small></h1>
        <el-row class="article_item animated slideDown" v-for="article in articles" :key="article._id">
          <el-col :span="24">
            <article>
              <nuxt-link :to="'/detail/' + article._id">
                <small>{{article.time}}</small><span>{{article.title}}</span>
              </nuxt-link>
            </article>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    getArticlesByTag
  } from '@@/api/index'
  import dayjs from 'dayjs'

  export default {
    head() {
      return {
        title: `${this.tag} | Ljhhhhhh\'s Blog`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.tag},卢洁辉的个人博客` }
        ]
      }
    },
    async asyncData({
      params
    }) {
      const tag = params.tag;
      const {
        articles
      } = await getArticlesByTag(tag);
      articles.forEach(article => {
        article.time = dayjs(article.createdAt).format('MM-DD')
      });
      return {
        articles,
        tag
      }
    },
  }

</script>
<style lang="scss" scoped>
  .content {
    margin-bottom: 80px;
  }

  .article_wrap {
    position: relative;
    animation-delay: 2s;
    -webkit-animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-duration: 0.5s;
    animation-fill-mode: both;

    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 20px;
      width: 4px;
      height: calc(100% - 20px);
      background: #f5f5f5;
      margin-left: -2px;
      z-index: -1;
    }

    h1 {
      position: relative;
      padding-left: 20px;
      margin-bottom: 60px;
      -webkit-animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-delay: 2s;

      strong {
        vertical-align: bottom;
      }

      small {
        display: inline-block;
        // margin-left: 5px;
        vertical-align: bottom;
      }

      &:before {
        position: absolute;
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #bbb;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
      }

      strong {
        color: #555;
      }

      small {
        color: #bbb;
      }
    }

    .article_item {
      // margin: 0 25px;
      margin-left: 3px;
      animation-delay: 2s;

      article {
        margin: 45px auto;
        padding: 25px;
        box-shadow: 0 0 5px #bbb;

        &:last-child {
          margin-bottom: 0;
        }

        a {
          line-height: 30px;
          padding: 10px;
          border-bottom: 1px dashed #ccc;
          color: #555;
          position: relative;
          display: block;
          cursor: pointer;
          transition: all 0.3s;

          &::before {
            content: '';
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #bbb;
            left: 0;
            top: 50%;
            margin-top: -3px;
            transition: all 0.3s;
          }

          &:hover{
            border-bottom: 1px dashed #333;
            &::before{
              background: #333;
            }
            small{
              color: #333;
            }
            span{
              color: #333;
            }
          }
        }

        small {
          font-size: 12px;
          margin: 0 5px 0 10px;
          vertical-align: middle;
          line-height: 30px;
          color: #555;
          transition: all 0.3s;
        }

        span {
          font-size: 16px;
          vertical-align: middle;
          line-height: 30px;
          color: #666;
          transition: all 0.3s;
        }
      }
    }
  }

</style>
