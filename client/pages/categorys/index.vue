<template>
  <div class="container">
    <head-info />
    <el-row type="flex" justify="center" class="category_wrap animated slideDown">
      <el-col :xs="22" :sm="20" :lg="18" :xl="14">
        <div class="category-title">分类</div>
        <div class="category-count">目前共计有{{total}}个分类</div>
        <div class="category_content">
          <ul class="ul_one">
            <li v-for="category in articlesByCategory" :key="category._id" class="li_one">
              <h3 :id="category._id"><i>#</i><span>{{category._id}}</span></h3>
              <!-- <i class="iconfont icon-category" /> -->
              <ul class="ul_cld">
                <li v-for="article in category.list" :key="article.id" class="li_cld">
                  <nuxt-link :to="'/detail/' + article.id">{{article.title}}</nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
          <!-- {{articlesByCategory}} -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    getArticleByCategorys
  } from '@@/api/category';

  export default {
    head() {
      return {
        title: '分类 | Ljhhhhhh\'s Blog',
        meta: [{
          hid: 'description',
          name: 'description',
          content: '分类查看,卢洁辉的个人博客'
        }]
      }
    },
    async asyncData() {
      const {
        articlesByCategory,
        total
      } = await getArticleByCategorys();
      return {
        articlesByCategory,
        total
      }
    },
  }

</script>
<style lang="scss" scoped>
  .category_wrap {
    animation-delay: 2s;
    overflow: hidden;

    .category-title {
      text-align: center;
      font-size: 24px;
      color: #999;
    }

    .category-count {
      color: #555;
      font-size: 14px;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 20px;
    }

    .category_content {
      margin: 60px auto;

      ul,
      li {
        list-style-type: none;
        padding: 0;
      }

      .ul_one {
        list-style-type: none;
        padding-inline-start: 0px;

        .li_one {
          list-style-type: none;
          margin: 30px 0;
          padding-bottom: 20px;

          h3 {
            font-size: 20px;
            line-height: 40px;
            color: #666;

            i,
            span {
              vertical-align: middle;
            }

            i {
              margin-right: 5px;
              color: #bbb;
              font-style: normal;
            }
          }

          .ul_cld {
            list-style-type: none;
            padding-left: 1em;

            .li_cld {
              padding: 5px 0;

              a {
                border-bottom: 1px solid transparent;

                &:hover {
                  border-bottom: 1px solid #ccc;
                }
              }
            }
          }
        }


      }
    }
  }

</style>
