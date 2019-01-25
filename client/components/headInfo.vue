<template>
  <div class="head-info">
    <nuxt-link
      class="head-info_link"
      to="/"
      exact>
      <span class="animated slideInDown ib">Ljhhhhhh's Blog</span>
    </nuxt-link>
    <p class="head-info_personalized animated slideInDown">
      “难”绝对是生命中幸福的开始，“容易”绝对不是该庆幸的事。
    </p>
    <div class="head-info_menus hidden-xs-only animated slideInDown">
      <nuxt-link to="/index/1">
        <i class="iconfont icon-home"/>
        <span>首页</span>
      </nuxt-link>
      <nuxt-link to="/demo">
        <i class="iconfont icon-me"/>
        <span>关于</span>
      </nuxt-link>
      <nuxt-link to="/b">
        <i class="iconfont icon-tag"/>
        <span>标签</span>
      </nuxt-link>
      <nuxt-link to="/c">
        <i class="iconfont icon-category"/>
        <span>分类</span>
      </nuxt-link>
      <nuxt-link to="/d">
        <i class="iconfont icon-guidang"/>
        <span>归档</span>
      </nuxt-link>
    </div>
    <div
      class="hidden-sm-and-up menus_toggle"
      @click="toggleMenu">
      <span class="bar"/>
    </div>
    <div
      :class="{active:mobileMenusShow}"
      class="small_menus"
      @click="closeMenu">
      <nuxt-link
        to="/index/1">
        <i class="iconfont icon-home"/>
        <span>首页</span>
      </nuxt-link>
      <nuxt-link to="/demo">
        <i class="iconfont icon-me"/>
        <span>关于</span>
      </nuxt-link>
      <nuxt-link to="/b">
        <i class="iconfont icon-tag"/>
        <span>标签</span>
      </nuxt-link>
      <nuxt-link to="/c">
        <i class="iconfont icon-category"/>
        <span>分类</span>
      </nuxt-link>
      <nuxt-link to="/d">
        <i class="iconfont icon-guidang"/>
        <span>归档</span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobileMenusShow: false
    }
  },
  methods: {
    toggleMenu() {
      this.mobileMenusShow = !this.mobileMenusShow
    },
    closeMenu() {
      this.mobileMenusShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ib {
  display: inline-block;
}
.head-info {
  width: auto;
  height: auto;
  padding: 100px 0 70px;
  text-align: center;
  position: relative;
  .menus_toggle {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 15px 10px;
    .bar {
      display: block;
      height: 2px;
      width: 22px;
      border-radius: 1px;
      background: #555;
      box-shadow: 0 -6px #454545, 0 6px #454545;
    }
  }
}
.small_menus {
  height: auto;
  overflow: hidden;
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: #999;
  z-index: 9;
  opacity: 0;
  padding: 0;
  transform: scaleY(0);
  transition: all 0.3s ease-in-out;
  transform-origin: top center;
  border-bottom: 1px solid #ddd;
  &.active {
    height: auto;
    padding: 20px 15px;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
    transform: scaleY(1);
    background: #fff;
    opacity: 1;
  }
  a {
    margin: 5px 0;
    border-bottom: none;
    text-align: left;
    font-size: 14px;
    span {
      margin-left: 3px;
    }
  }
}
.head-info_link {
  background: #222;
  padding: 10px 40px;
  color: #fff;
  border-bottom: none;
  font-size: 20px;
  line-height: 36px;
  span {
    animation-delay: 0.5s;
  }
}
.head-info_personalized {
  font-size: 13px;
  color: #797979;
  margin-top: 20px;
  animation-delay: 1s;
}
.head-info_menus {
  margin-top: 30px;
  animation-delay: 1.5s;
  a {
    display: inline-flex;
    flex-direction: column;
    font-size: 13px;
    width: 40px;
    margin: 0 8px;
    border-bottom: none;
    &.nuxt-link-exact-active,
    &:hover {
      border-bottom: 1px solid #222;
    }
    i.iconfont {
      font-size: 13px;
    }
    span {
      margin: 7px 0 3px;
    }
  }
}
</style>
