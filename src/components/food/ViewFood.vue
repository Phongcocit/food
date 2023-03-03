<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css"
  />
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="food in foods" :key="food.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="food.image" :alt="food.name" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <router-link :to="{ name: 'food-id', params: { id: food.id } }">{{
                food.name
              }}</router-link>
            </div>
            <div class="content" style="color: red">{{ food.price }}$</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
export default {
  data() {
    return { foods: [] };
  },
  // props: ["foods"]
  mounted() {
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
  },
  provide(){
    return {
      foods: this.foods
    }
  },
  created() {
    console.log('ppppppppppppp')
    console.log(this.foods); // => "bar"
  },
};
</script>
