import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    account: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setAccount(state, account) {
      state.account = account
    }
  },
  actions: {
    
  }
})
