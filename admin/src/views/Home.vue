<template>
  <div>
    <el-button type="primary" @click="addArticle">新建文章</el-button>
    <p>文章列表：</p>
    <el-table :data="articles" stripe style="width: 100%">
      <el-table-column prop="time" label="发布日期">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="category" label="分类">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="updateArticle(scope.row._id)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="delArticle(scope.row._id)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        :page-size="size"
        layout="prev, pager, next"
        :total="total"
        @current-change="setPage"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request';
  import dayjs from 'dayjs'

  export default {
    data() {
      return {
        articles: [],
        total:null,
        size: 10,
        page: 1,
      }
    },
    created() {
      this.getArticles();
    },
    methods: {
      addArticle() {
        this.$router.push({
          name: 'create'
        })
      },
      setPage(p) {
        this.page = p;
        this.getArticles();
      },
      updateArticle(id) {
        this.$router.push({
          name: 'create',
          query: {
            id
          }
        })
      },
      delArticle(id) {
        request({
          url: '/delArticle',
          method: 'post',
          data: {
            id
          }
        }).then((res) => {
          if (res.code === 0) {
            this.articles.forEach((article, i) => {
              if (article._id === id) {
                this.articles.splice(i, 1)
              }
            });
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
      },
      getArticles() {
        request({
          url: '/articles',
          method: 'post',
          data: {
            size: this.size,
            page: this.page
          }
        }).then(res => {
          res.articles && res.articles.forEach(article => {
            article.time = dayjs(article.createdAt).format('YYYY-MM-DD HH:mm')
          });
          this.articles = res.articles;
          this.total = res.total;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page{
    text-align: center;
    margin: 20px 0 50px;
  }
  .el-button{
    margin: 15px 0;
  }
  .cell .el-button {
    margin: 0 10px;
  }
</style>
