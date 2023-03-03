import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    carts: []
  },
  mutations: {
    setCarts(state, carts) {
      state.carts = carts
    }
  },
  actions: {
    async fetchCarts({ commit }) {
      const response = await axios.get('https://634918dfa59874146b171fc0.mockapi.io/api/cart')
      commit('setCarts', response.data)
    }
  },
  getters: {
    carts: state => state.carts
  }
})

export default store
