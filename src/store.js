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
      async addToCart({ commit, state }, { food, quantity }) {
        const unpaidCart = state.carts.find(cart => !cart.paid);
        let id = unpaidCart ? unpaidCart.id : null;
        const data = {
          items: [
            {
              id: Number(food.id),
              name: food.name,
              price: Number(food.price),
              quantity: quantity,
            },
          ],
          paid: false
        };
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch(`https://634918dfa59874146b171fc0.mockapi.io/api/cart/${id}`, config);
        const cart = await response.json();
        const updatedCarts = state.carts.map(item => item.id === cart.id ? cart : item);
        commit('setCarts', updatedCarts);
      }
    },
    getters: {
      carts: state => state.carts,
    },
  });
  

export default store
