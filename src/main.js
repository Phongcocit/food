import { createApp } from 'vue'
import router  from './router.js';
import App from './App.vue'
import store from './store'
import Vue from 'vue'

Vue.config.productionTip = false
new Vue({
    store,
    render: h => h(App),
    mounted() {
      this.$store.dispatch('fetchCarts')
    }
  }).$mount('#app')



const app = createApp(App);
app.use(router);
app.mount('#app');