<template>
  <div class="aside-content">
    <img src="http://thirdwx.qlogo.cn/mmopen/3jiaYjme3ZEjLwZoTq82FKZRkD2XjxEl2hBOPGDsSZt6RHoPic0U0y4DM3iaZmibMlPpMARheIYY9g1qibXkZuibxfjMrzicZ0nOjVn/132"
      class="avatar">
    <p class="name">Ljhhhhhh</p>
    <p class="explain">一个简简单单的技术类博客</p>
    <div class="slide-menu_box">
      <!-- TODO:: 链接 -->
      <nuxt-link class="slide-menu" to="/">
        <span>{{$store.state.countData.articleTotal}}</span>
        <span>日志</span>
      </nuxt-link>
      <nuxt-link class="slide-menu" to="/categorys">
        <span>{{$store.state.countData.categoryTotal}}</span>
        <span>分类</span>
      </nuxt-link>
      <a class="slide-menu" to="/tags">
        <span>{{$store.state.countData.tagTotal}}</span>
        <span>标签</span>
      </a>
    </div>
    <div class="contact_box">
      <el-tooltip class="link" effect="light" placement="top">
        <img slot="content" class="tooltip_img" src="@/assets/qrcode-qq.png">
        <div><i class="iconfont icon-qq" /><span>QQ</span></div>
      </el-tooltip>
      <el-tooltip class="link" effect="light" placement="top">
        <div><i class="iconfont icon-wechat" /><span>wechat</span></div>
        <img slot="content" class="tooltip_img" src="@/assets/qrcode-wechat.png">
      </el-tooltip>
      <div class="link"><i class="iconfont icon-github" />
        <span>
          <a target="_blank" href="https://github.com/Ljhhhhhh">github</a>
        </span></div>
    </div>
  </div>
</template>
<script>
  import {
    elBotton
  } from 'element-ui'
  import {
    getCount
  } from '@@/api/common'
  export default {
    data() {
      return {}
    },
    created() {
      this.initData();
    },
    methods: {
      async initData() {
        if (JSON.stringify(this.$store.state.countData) === '{}') {
          const data = await getCount();
          this.$store.commit('setCountData', data)
        }
      }
    },
    components: {
      elBotton
    }
  }

</script>

<style lang="scss" scoped>
  .aside-content {
    color: #999;
    height: 100%;
    width: 100%;
    padding-top: 50px;
    text-align: center;

    img {
      border-radius: 50%;
      width: 105px;
      height: auto;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: rotate(360deg) scale(1.2);
      }
    }
  }

  p {
    width: 100%;
  }

  p.name {
    margin: 5px 0;
    line-height: 30px;
    color: #f5f5f5;
  }

  p.explain {
    font-size: 14px;
    line-height: 20px;
  }

  .slide-menu_box {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .slide-menu {
      display: inline-flex;
      flex-direction: column;
      margin: 0 10px;
      border-bottom: none;
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      span:first-child {
        font-size: 18px;
      }

      span {
        font-size: 12px;
      }
    }
  }

  .iconfont {
    margin-right: 4px;
  }

  .icon-github {
    margin-right: 0;

    &+span {
      position: relative;
      top: -2px;
    }
  }

  .icon-wechat {
    font-size: 1.2em;
    vertical-align: -2px;
    top: -3px;
    position: relative;

    &+span {
      position: relative;
      top: -4px;
    }
  }

  .contact_box {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    padding: 0 30px;
    position: relative;
  }

  .link {
    cursor: pointer;
    margin: 0 10px;
  }

  .link span a {
    // border-bottom: none;
    color: #999;
  }

  .link:hover a {
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  .link span {
    transition: all 0.3s;
  }

  .link:hover {
    color: #fff;
  }

  .el-tooltip__popper {
    font-size: 16px;
  }

  .tooltip_img {
    width: 80px;
  }

</style>
