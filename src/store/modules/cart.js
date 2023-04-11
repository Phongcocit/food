import axios from 'axios'

export default{
    namespaced:true,
    state(){
        return{
            carts: [],
            currentCart,
        }
    },
    getters: {
        allCarts: (state) => state.carts
    },
    actions: {
        async fetchCarts({ commit }) {
            const response = await axios.get("https://634918dfa59874146b171fc0.mockapi.io/api/cart")
            // tim cart chua paid
            // neu co cart chua paid thi set currentCart bang cai do
            // neu khong co thi tao cart moi bang POST
            // lay gio hang vua tao gan vao currentCart
            commit('setCarts', response.data)
        },
        async addToCart(context, { id, items }) {
            //goi api cap nhat gio hang

            //cap nhat cart trong store
        },
        async payCart(context, { id, items }) {
            //goi api cap nhat gio hang

            //cap nhat cart trong store
        }
    },
    mutations: {
        setCarts: (state, carts) => state.carts = carts
    }
}
