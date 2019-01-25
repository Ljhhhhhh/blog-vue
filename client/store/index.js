import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      slideShow: false,
      countData: {}
    },
    mutations: {
      toggleSlide(state) {
        state.slideShow = !state.slideShow
      },
      setCountData(state, data) {
        state.countData = data
      }
    }
  })

export default store
