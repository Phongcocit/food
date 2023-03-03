import axios from 'axios'

export default{
    namespaced:true,
    state(){
        return{
            carts: []
        }
    },
    getters: {
        allCarts: (state) => state.carts
    },
    actions: {
        async fetchCarts({ commit }) {
            const response = await axios.get("https://634918dfa59874146b171fc0.mockapi.io/api/cart")
            commit('setCarts', response.data)
        }
    },
    mutations: {
        setCarts: (state, carts) => state.carts = carts
    }
}
