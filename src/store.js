import Vuex from 'vuex';
// import axios from 'axios'



const store = new Vuex.Store({
    state: {
      carts: [],
    },
    mutations: {
      setCarts(state, carts) {
        state.carts = carts;
      },
    },
    actions: {
      async fetchCarts({ commit }) {
        const response = await fetch('https://634918dfa59874146b171fc0.mockapi.io/api/cart');
        const carts = await response.json();
        commit('setCarts', carts);
      },
    },
    getters: {
      carts: state => state.carts,
    },
  });
  

export default store
