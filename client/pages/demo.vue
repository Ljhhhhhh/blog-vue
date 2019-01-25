<template>
  <section class="container">
    <head-info/>
    <!-- <van-button size="large">来点我呀</van-button>
    <van-button type="primary">主要按钮</van-button> -->
    <!-- <van-rate v-model="value" /> -->
    <!-- <p>{{ me.name }}</p>
    <p>{{ me.age }}</p> -->
    <p class="b">hello world</p>
  </section>
</template>

<script>
import headInfo from '@/components/headInfo'
import {getArticles} from '@@/api/index'

export default {
  components: {
    headInfo
  },
  // async asyncData({ $axios }) {
  //   const me = await $axios.$get('/api/login')
  //   return { me }
  // },
  data() {
    return {
      value: 3,
      result: {}
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      // const res = await this.$axios.$get('/api/login')
      const res = await getArticles(1)
      console.log(res, 'this is result')
    }
  }
}
</script>

<style>
</style>
