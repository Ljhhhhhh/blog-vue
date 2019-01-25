<template>
  <div class="container">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入简介"
          v-model="intro">
        </el-input>
      </el-form-item>
      <p>文章详情</p>
      <tinymce :height="400" v-model="content" />
    </el-form>
    <div class="category">
      <el-form>
        <el-col :span="6">
          <el-form-item label="文章标签">
            <el-select v-model="articleTags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
              <el-option v-for="item in tags" :key="item._id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章分类">
            <el-select v-model="articleCate" filterable allow-create default-first-option placeholder="请选择文章标签">
              <el-option v-for="item in categorys" :key="item._id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-button type="primary" @click="submit" class="btn">{{this.id ? '更新文章' : '发布文章'}}</el-button>
    <el-button type="info" @click="$router.back()" class="btn">取消</el-button>
    </div>
    <div class="submit">
    </div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import request from '@/utils/request';

  export default {
    name: 'Create',
    components: {
      Tinymce
    },
    data() {
      return {
        id: null,
        title: '',
        intro: '',
        content: '',
        tags: [],
        articleTags: [],
        categorys: [],
        articleCate: ''
      }
    },
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.getDetail()
      }
      this.getTags();
      this.getCategory();
    },
    methods: {
      submit() {
        if (!this.title) {
          this.$message({
            message: '请填写标题',
            type: 'error'
          });
          return;
        }
        if (!this.intro) {
          this.$message({
            message: '请填写简介',
            type: 'error'
          });
          return;
        }
        if (!this.content) {
          this.$message({
            message: '请填写文章详情',
            type: 'error'
          });
          return;
        }
        if (!this.articleTags.length) {
          this.$message({
            message: '请选择标签',
            type: 'error'
          });
          return;
        }
        if (!this.articleCate) {
          this.$message({
            message: '请选择分类',
            type: 'error'
          });
          return;
        }
        const data = {
          title: this.title,
          intro: this.intro,
          content: this.content,
          tags: this.articleTags,
          category: this.articleCate
        }
        if (this.id) {
          data.id = this.id
        }
        request({
          url: '/handleArticle',
          method: 'post',
          data,
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$message({
              message: '发布失败，请检查',
              type: 'error'
            });
          }
        })
      },
      getDetail() {
        request({
          url: `/articles/${this.id}`,
          method: 'post'
        }).then(res => {
          const data = res.data;
          this.title = data.title;
          this.intro = data.intro;
          this.content = data.content;
          this.articleTags = data.tags;
          this.articleCate = data.category;
        })
      },
      getTags() {
        request({
          url: '/tags',
          method: 'get',
        }).then(res => {
          this.tags = res.tags
        })
      },
      getCategory() {
        request({
          url: '/categorys',
          method: 'get',
        }).then(res => {
          this.categorys = res.categorys
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .category {
    margin: 30px 0;
  }
</style>