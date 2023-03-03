<template>
  <the-header></the-header>
  <router-view ></router-view>
  <the-footer></the-footer>

</template>

<script>
import axios from "axios";
import TheHeader from "./components/nav/TheHeader.vue";
import TheFooter from "./components/nav/TheFooter.vue";


export default {
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return { foods: [] };
  },
  mounted() {
    this.$store.dispatch('fetchCarts')
    axios
      .get("https://634918dfa59874146b171fc0.mockapi.io/api/food")
      .then((response) => {
        // Sử dụng map để cập nhật mảng foods
        this.foods = response.data.map((food) => {
          return {
            id: food.id,
            name: food.name,
            image: food.image,
            price: food.price,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get("https://634918dfa59874146b171fc0.mockapi.io/api/cart")
    //   .then((response) => {
    //     // Sử dụng map để cập nhật mảng foods
    //     this.carts = response.data.map((cart) => {
    //       return {
    //         createdAt: cart.createdAt,
    //         items: food.name,
    //         image: food.image,
    //         price: food.price,
    //       };
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  provide() {
    return {
      foods: this.foods,
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
