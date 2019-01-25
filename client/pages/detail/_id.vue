<template>
<div class='container'>
  {{detail}}
</div>
</template>
<script>
import {getArticleDetail} from '@@/api'
export default {
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const id = params.id;
    const {data} = await getArticleDetail(id);
    return {detail: data}
  },
  data() {return {}}
}
</script>
<style lang="scss" scoped>
</style>
