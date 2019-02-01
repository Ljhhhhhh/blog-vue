<template>
  <div class="container">
    <head-info />
    <el-row type="flex" justify="center" class="about_content animated bounce">
      <el-col :xs="22" :sm="20" :lg="18" :xl="14">
        <h1 class="title">关于</h1>
        <div class="info">
          <h3>个人信息</h3>
          <ul>
            <li>卢洁辉/男/1995</li>
            <li>大专/浙江经贸职业技术学院/电子商务</li>
            <li>开始工作：2016</li>
            <li>工作职位：Web前端工程师</li>
            <li>博客：<a href="http://ljh.cixi518.com">ljh.cixi518.com</a></li>
            <li>github：<a href="https://github.com/Ljhhhhhh">github.com/Ljhhhhhh</a></li>
          </ul>
        </div>
        <div class="contact">
          <h3>联系方式</h3>
          <ul>
            <li>手机：<a href="tel:13216698987">13216698987</a></li>
            <li>Email：<a href="mailto:13216698987@163.com">13216698987@163.com</a></li>
            <li>QQ：2322294987</li>
            <li>微信：rose18358437640</li>
          </ul>
        </div>
        <div class="experience">
          <h3>项目经验</h3>
          <h5>H5开发项目</h5>
          <ul>
            <li>人车人商城(微信公众号：人车人社区服务)</li>
            <li>小蜜蜂装修网<a href="http://www.xmfzxw.com">www.xmfzxw.com</a></li>
            <li>佳帝科技官网<a href="http://www.ledjiadi.com/">www.ledjiadi.com/</a></li>
          </ul>
          <h5>ERP系统开发项目</h5>
          <ul>
            <li>人车人后台管理系统</li>
            <li>苏溪镇政府管理系统</li>
            <li>商翔ERP微信版</li>
            <li>嘉奇食品管理系统</li>
          </ul>
          <h5>全栈开发项目</h5>
          <ul>
            <li>虔信草帽厂官网<a href="http://www.qxhat.com">www.qxhat.com</a></li>
            <li>慈溪二手车交易小程序(小程序搜索)</li>
            <li>订单管理系统<a href="http://www.cixi518.com">www.cixi518.com</a></li>
            <li>个人博客<a href="http://ljh.cixi518.com">ljh.cixi518.com</a></li>
          </ul>
          <h5>开源项目</h5>
          <ul>
            <li>nodejs+koa2+mongodb+vue全家桶+nuxt+vue-cli3+elementUI搭建个人博客<a href="https://github.com/Ljhhhhhh/blog">github.com/Ljhhhhhh/blog</a></li>
            <li>thinkphp5模仿百度糯米<a href="https://github.com/Ljhhhhhh/imooc_o2o">github.com/Ljhhhhhh/imooc_o2o</a></li>
            <li>vue+koa+nuxt制作美团<a href="https://github.com/Ljhhhhhh/vue-koa-ssr">github.com/Ljhhhhhh/vue-koa-ssr</a></li>
            <li>vue模仿QQ音乐APP<a href="https://github.com/Ljhhhhhh/music-spa">github.com/Ljhhhhhh/music-spa</a></li>
            <li>JavaScript设计模式理解<a href="https://github.com/Ljhhhhhh/design_pattern">github.com/Ljhhhhhh/design_pattern</a></li>
            <li>Koa2+mongodb制作网站<a href="https://github.com/Ljhhhhhh/imooc-koa2-movie">github.com/Ljhhhhhh/imooc-koa2-movie</a></li>
            <li>Vue核心知识<a href="https://github.com/Ljhhhhhh/vue-core-technology">github.com/Ljhhhhhh/vue-core-technology</a></li>
            <li>php+mysql+tp5制作响应式企业官网<a href="https://github.com/Ljhhhhhh/qxhat">github.com/Ljhhhhhh/qxhat</a></li>
            <li>es6入门<a href="https://github.com/Ljhhhhhh/es6-caipiao">github.com/Ljhhhhhh/es6-caipiao</a></li>
          </ul>
        </div>
        <div class="skill">
          <h3>技能清单</h3>
          <ul>
            <li>前端相关：JavaScript/jQuery/Vue/TypeScript/ES6/ES7/scss/less/小程序/公众号/mockjs/canvas/WebSocket</li>
            <li>框架相关：bootstrap/element-ui/iview/vux/vant/mui/mint-ui</li>
            <li>后台相关：nodejs/mongodb/koa2/php/mysql/tp5</li>
            <li>工具相关：webpack/gulp/git/svn/eslint/npm/yarn</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        title: '关于 | Ljhhhhhh\'s Blog',
        meta: [{
          hid: 'description',
          name: 'description',
          content: '关于,卢洁辉的个人博客'
        }]
      }
    },
  }

</script>
<style lang="scss" scoped>
  .about_content{
    animation-delay: 2s;
  }
  h1.title{
    font-size: 24px;
    text-align: center;
    color: #999;
  }
  .info,
  .contact,
  .experience,
  .skill {
    margin: 60px auto;
    position: relative;
    padding-bottom: 60px;
    &::after{
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: #ddd;
      background: repeating-linear-gradient(-45deg, #ddd, #ddd 4px, transparent 4px, transparent 8px);
    }
    h3{
      color: #555;
      font-size: 18px;
      margin: 20px auto 15px;
    }
    h5{
      color: #999;
      font-size: 16px;
      margin: 10px auto;
    }
    ul > li {
      list-style-type:circle;
      font-size: 14px;
      line-height: 2;
      word-break: break-word;
    }
  }
</style>
