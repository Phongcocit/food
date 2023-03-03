<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <!--  -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
      <a class="navbar-item" >
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>
    </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item"> Trang chủ </router-link>
      </div>
    </div>

    <div class="navbar-end">
      <a class="navbar-item" href="#" style="margin-right: 10px">
        <span class="icon">
          <i class="fas fa-shopping-cart"></i>
        </span>
        <router-link to="/cart" class="cart-icon">
          <i class="fa fa-shopping-cart fa-2x" style="color: red"></i>
          <span class="badge">{{ totalQuantity }}</span>
        </router-link>
        <!-- <router-link to="/cart"
          ><i class="fa fa-shopping-cart" style="font-size: 48px; color: red">
            <p>{{ totalQuantity }}</p>
          </i>
        </router-link> -->

        <!--  -->

        <!--  -->
      </a>
    </div>
  </nav>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Đồ ăn ngon cho mọi người</h1>
        <h2 class="subtitle">
          Đặt ngay hôm nay để thưởng thức những món ăn ngon nhất
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
// import axios from "axios";
import { mapState } from 'vuex'


export default {
  
  
  data() {
    return {
      // carts: [],
      items: [],
    };
  },
  // mounted() {
  //   axios
  //     .get("https://634918dfa59874146b171fc0.mockapi.io/api/cart")
  //     .then((response) => {
  //       console.log(response);
  //       this.carts = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
  computed: {
    ...mapState(['carts']),

    totalQuantity() {
      let sum = 0;
      this.carts.forEach((cart) => {
        if (!cart.paid) {
          console.log(cart.id);

          cart.items.forEach((item) => {
            sum += item.quantity;
            console.log("--------------", item.quantity);
          });
        }
      });
      return sum;
    },
  },
};
</script>
<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.cart-icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
}
</style>
