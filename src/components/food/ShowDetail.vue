<template>
  <div class="product-detail">
    <div class="columns">
      <div class="column is-5" style="margin-left: 60px">
        <figure class="image">
          <img :src="food.image" :alt="food.name" />
        </figure>
      </div>
      <div class="column is-7">
        <div class="content" style="margin-right: 120px">
          <h1 class="title">{{ food.name }}</h1>
          <p>{{ food.description }}</p>
          <p class="has-text-danger">{{ food.price }}$</p>

          <!-- <div class="buttons"> -->
          <button
            class="button is-primary"
            style="background-color: red"
            @click="decreaseQuantity()"
          >
            -
          </button>
          <button class="button is-primary" @click="addToCart()">
            <p>
              Add <strong style="color: red">{{ quantity }}</strong> to Cart
            </p>
          </button>

          <button
            class="button is-primary"
            style="background-color: red"
            @click="increaseQuantity()"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { mapState } from "vuex";

export default {
  data() {
    return {
      food: {},
      quantity: 1,
      // carts: [],
      unpaidCart: null,
      isCheckPaid: false,
    };
  },
  computed: {
    ...mapState(["carts"]),
  },
  props: ["id"],
  mounted() {
    axios
      .get(`https://634918dfa59874146b171fc0.mockapi.io/api/food/${this.id}`)
      .then((response) => {
        this.food = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.carts.forEach((cart) => {
      if (!cart.paid) {
        console.log(cart.id);
        this.unpaidCart = cart.id;
        this.isCheckPaid = true;
      }
    });

    //tim gio hang chua duoc thang toan
    //gan gio hang chua duoc thanh toan vao unpaidCart
  },
  methods: {
    addToCart() {
      let id = this.unpaidCart;
      let data = {
        items: [
          {
            id: Number(this.food.id),
            name: this.food.name,
            price: Number(this.food.price),
            quantity: this.quantity,
          },
        ],
      };

      console.log(data);
      // L???y th??ng tin ?????i t?????ng cart t??? API
      axios
        .get(`https://634918dfa59874146b171fc0.mockapi.io/api/cart/${id}`)
        .then((response) => {
          // Th??m ?????i t?????ng m???i v??o m???ng items
          response.data.items.push({
            id: Number(this.food.id),
            name: this.food.name,
            price: Number(this.food.price),
            quantity: this.quantity,
          });

          // C???p nh???t l???i ?????i t?????ng cart v???i m???ng items m???i
          axios
            .put(`https://634918dfa59874146b171fc0.mockapi.io/api/cart/${id}`, {
              items: response.data.items,
              total:
                Number(this.food.price) * this.quantity + response.data.total,
            })
            .then((response) => {
              console.log(response.data.total);
              alert("B???n ???? th??m m??n ??n v??o gi??? h??ng th??nh c??ng");
              router.go(0);

              console.log(response.data);
              this.quantity = 1;
            })
            .catch((error) => {
              console.log(error);
              console.log("-------------------------");
              console.log(error.response.status); // in ra m?? tr???ng th??i HTTP c???a l???i
              console.log(error.response.data); //*  *// in ra th??ng b??o l???i t??? server
              console.log("-------------------------");
            });
        })
        .catch((error) => {
          console.log(error);
          console.log("-------------------------");
          console.log(error.response.status); // in ra m?? tr???ng th??i HTTP c???a l???i
          console.log(error.response.data); // in ra th??ng b??o l???i t??? server
          console.log("-------------------------");
        });

      if (!this.isCheckPaid) {
        axios
          .post(`https://634918dfa59874146b171fc0.mockapi.io/api/cart`, {
            items: [
              {
                name: this.food.name,
                price: this.food.price,
                quantity: this.quantity,
              },
            ],
            total: Number(this.food.price) * this.quantity,
          })
          .then((response) => {
            alert("B???n ???? th??m m??n ??n v??o gi??? h??ng th??nh c??ng");
            console.log(response.data);
            this.quantity = 1;
            // window.location.href = "/cart";
            router.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
</script>
<style>
.product-detail {
  margin-top: 20px;
}

.product-detail .columns {
  margin-top: 10px;
}

.product-detail .column.is-5 {
  margin-right: 20px;
}

.product-detail .image img {
  max-width: 100%;
}
</style>
