<template>
  <div class="container">
    <head-info />
    <el-row type="flex" justify="center">
      <el-col class="tags-wrap animated slideDown" :xs="22" :sm="20" :lg="18" :xl="14">
        <div class="tag-title">标签</div>
        <div class="tag-count">目前共计有{{total}}个标签</div>
        <el-row>
          <el-col class="tag-list">
            <nuxt-link class="tag" v-for="tag in tags" :key="tag._id" :style="{fontSize: tag.fontSize,color: tag.color}" :to="'/tags/' + tag.name">
              {{tag.name}}
            </nuxt-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- {{tags}}
    --
    {{total}} -->
  </div>
</template>
<script>
  import {
    getTags
  } from '@@/api/index'

  export default {
    head() {
      return {
        title: '标签 | Ljhhhhhh\'s Blog',
        meta: [
          { hid: 'description', name: 'description', content: '标签列表,卢洁辉的个人博客' }
        ]
      }
    },
    async asyncData() {
      const {
        tags,
        total
      } = await getTags()
      const initFontSize = 6;
      let tagCount = 0;
      tags.forEach(tag => {
        tagCount += tag.total
      });
      const pjz = Math.round(tagCount / total)
      tags.forEach(tag => {
        const fontSize = (initFontSize + (tag.total - pjz)) * 3
        tag.fontSize = fontSize + 'px'
        if (tag.fontSize > 42) {
          tag.fontSize = 42
        }
        if (tag.fontSize < 12) {
          tag.fontSize = 12
        }
        const L = 80 - fontSize * 2;
        tag.color = `hsl(0, 0%, ${L}%)`;
        console.log(tag);
      })
      return {
        tags,
        total
      }
    },
  }

</script>
<style lang="scss" scoped>
  .tags-wrap {
    animation-delay: 2s;
    overflow: hidden;
    .tag-title{
      text-align: center;
      font-size: 24px;
      color: #999;
    }
    .tag-count{
      color: #555;
      font-size: 14px;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 20px;
    }
    .tag-list{
      text-align: center;
      .tag{
        display: inline-block;
        margin: 5px 10px;
        text-decoration: none;
        border-bottom: 1px solid currentColor;
        word-wrap: break-word;
        line-height: 1.5em;
        cursor: pointer;
        &:hover{
          color: #000!important;
          border-bottom: 1px solid transparent;
          // filter: blur(0.5px);
          text-shadow: -2px 2px 2px #333;
        }
      }
    }
  }

</style>
