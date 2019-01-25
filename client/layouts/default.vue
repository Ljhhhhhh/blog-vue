<template>
  <div class="wrap-box">
    <el-row>
      <div
        ref="main"
        class="main">
        <!-- <el-row>
          <el-col><head-info /></el-col>
          <el-col><nuxt/></el-col>
        </el-row> -->
        <nuxt/>
      </div>
      <div
        ref="aside"
        :class="{active: $store.state.slideShow}"
        class="aside"><my-aside/></div>
      <div
        ref="slideToggle"
        :class="[$store.state.slideShow ? 'hide' : 'show']"
        class="slidebar-toggle_wrap"
        @click="closeAside">
        <span class="slidebar_line line-first"/>
        <span class="slidebar_line line-middle"/>
        <span class="slidebar_line line-last"/>
      </div>
      <div
        :class="backTop"
        class="back-top"
        @click.stop="backToTop">
        <i class="iconfont icon-shang"/>
      </div>
    </el-row>
  </div>
</template>
<script>
import myAside from '@/components/myAside'
import { debounce } from '@/utils'

export default {
  components: {
    myAside
  },
  data() {
    return {
      asideActive: false,
      backTop: false
    }
  },
  watch: {
    '$store.state.slideShow'(val) {
      // console.log(val, 'val')
      if (val) {
        this.$refs.main.style.width =
          document.documentElement.clientWidth - 320 + 'px'
      } else {
        this.$refs.main.style.width = '100%'
      }
      // this.initAside()
    }
  },
  mounted() {
    setTimeout(() => {
      this.initAside()
    }, 2500)
    const doc = document.documentElement
    window.onresize = debounce(this.initAside, 300)
    let me = this
    window.onscroll = function() {
      const top = doc.scrollTop
      me.backTop = top > 500 ? 'active' : ''
    }
  },
  methods: {
    backToTop() {
      var gotoTop = function() {
        var currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop
        currentPosition -= 30
        if (currentPosition > 0) {
          window.scrollTo(0, currentPosition)
        } else {
          window.scrollTo(0, 0)
          clearInterval(timer)
          timer = null
        }
      }
      var timer = setInterval(gotoTop, 1)
    },
    initAside() {
      const slideBar = window.getComputedStyle(
        document.querySelector('.slidebar-toggle_wrap'),
        null
      ).display
      if (document.documentElement.clientWidth >= 990) {
        this.$refs.main.style.width =
          document.documentElement.clientWidth - 320 + 'px'
        if (!this.$store.state.slideShow) {
          this.$store.commit('toggleSlide')
        }
        if (slideBar === 'none') {
          document.querySelector('.slidebar-toggle_wrap').style.display =
            'block'
        }
      } else {
        this.$refs.main.style.width = '100%'
        if (slideBar === 'block') {
          document.querySelector('.slidebar-toggle_wrap').style.display = 'none'
        }
        if (this.$store.state.slideShow) {
          this.$store.commit('toggleSlide')
        }
      }
    },
    closeAside() {
      if (document.documentElement.clientWidth >= 990) {
        this.$store.commit('toggleSlide', !this.$store.state.slideShow)
      }
    }
  }
}
</script>
<style lang="scss">
html {
  font-family: 'Lato', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.wrap-box {
  max-width: 100%;
  overflow-x: hidden;
}
$theme_color: #262a30;
.main {
  border-top: 3px solid $theme_color;
  transition: all 0.3s cubic-bezier(0, 0.81, 0.34, 0.99);
  width: 100%;
  max-width: 100%;
}
.aside {
  background: $theme_color;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -320px;
  min-width: 320px;
  max-width: 320px;
  transition: all 0.3s cubic-bezier(0, 0.81, 0.34, 0.99);
  opacity: 0;
  &.active {
    right: 0;
    opacity: 1;
  }
}

.slidebar-toggle_wrap {
  position: fixed;
  bottom: 60px;
  right: 30px;
  padding: 5px;
  background: #262a30;
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
  &.hide span.slidebar_line {
    transition: all 0.3s ease-in-out;
    display: block;
    width: 100%;
    height: 2px;
    background: #87daff;
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1px;
    &.line-middle {
      opacity: 0;
      transform: scale(0);
      transition: all 0s ease-in-out;
    }
    &.line-first {
      width: 100%;
      transform: translate(-50%, -50%) rotateZ(-45deg);
    }
    &.line-last {
      width: 100%;
      transform: translate(-50%, -50%) rotateZ(45deg);
    }
  }
}
@keyframes first-close {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
@keyframes last-close {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.slidebar-toggle_wrap.show {
  span.slidebar_line {
    transition: all 0.3s ease-in-out;
    position: relative;
    display: block;
    margin-bottom: 3.5px;
    width: 100%;
    height: 2px;
    background: #87daff;
    font-size: 0;
    line-height: 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.slidebar-toggle_wrap.show:hover {
  span.line-first {
    width: 50%;
    transform: rotateZ(-45deg);
    top: 2.5px;
  }
  span.line-last {
    width: 50%;
    transform: rotateZ(45deg);
    top: -2.5px;
  }
}
.back-top {
  position: fixed;
  bottom: -30px;
  right: 30px;
  padding: 5px;
  background: #262a30;
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0, 0.98, 0, 0.98);
  &.active {
    bottom: 30px;
  }
  i {
    color: #87daff;
    position: relative;
    right: 1px;
  }
}
</style>
