<template>
  <el-row class="container" type="flex" justify="center">
    <el-col :xs="22" :sm="12" :lg="8" :xl="4" class="content">
      <h3>后台登录</h3>
      <el-input placeholder="请输入账号" prefix-icon="el-icon-star-on" v-model="account">
      </el-input>
      <el-input placeholder="请输入密码" prefix-icon="el-icon-star-off" type="password" v-model="password">
      </el-input>
      <el-button type="primary" size="medium" @click="submit">登录</el-button>
    </el-col>
  </el-row>
</template>
<script>
  import md5 from 'crypto-js/md5'
  import request from '@/utils/request';
  import { mapMutations } from 'vuex';
  import cookie from 'js-cookie';

  export default {
    data() {
      return {
        account: '',
        password: ''
      }
    },
    created() {
      if (cookie.get('token')) {
        this.$router.push({
          name: 'home'
        })
      }
    },
    methods: {
      submit() {
        const data = {
          account: this.account,
          password: md5(this.password).toString()
        }
        request({
          url: '/login',
          method: 'post',
          data
        }).then(res => {
          if (res.code === 0) {
            this.setToken(res.token);
            cookie.set('token', res.token,{ expires: 3 });
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000
            })
            setTimeout(() => {
              this.$router.push({
              name: 'home'
            })
            }, 1000)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      },
      ...mapMutations({
        'setToken': 'setToken'
      })
    }
  }
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    margin-top: 80px;
    max-width: 375px;
    padding: 15px;
    h3{
      font-size: 24px;
      line-height: 40px;
      text-align: center;
    }
    .el-input{
      margin: 15px 0;
    }
    .el-button{
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>