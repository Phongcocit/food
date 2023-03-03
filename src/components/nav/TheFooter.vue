<template>
    <footer class="footer" style="margin-top:30px ;">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h4 class="title is-4">Tentang Kami</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Hubungi Kami</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div class="column">
            <h4 class="title is-4">Layanan Pelanggan</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Syarat dan Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div class="column">
            <h4 class="title is-4">Ikuti Kami</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
          <!-- <h3 class="widget-title">Carts</h3>
            <ul>
              <li v-for="cart in carts" :key="cart.id">
                {{ cart.id }} - {{ cart.total }}
              </li>
            </ul> -->
        </div>
      </div>
    </footer>
  </template>
  <script>
// import { mapState } from 'vuex'
// export default{
//   name: 'TheFooter',
//   computed: {
//     ...mapState(['carts'])
//   }
// }
</script>
  <style scoped>
  .footer {
    background-color: #00d1b2;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .footer h4.title {
    margin-bottom: 10px;
  }
  .footer ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .footer ul li {
    margin-bottom: 5px;
  }
  .footer a {
    color: rgb(255, 255, 255);
    text-decoration: none;
  }
  .footer img {
    height: 40px;
    margin-right: 10px;
  }
  </style>
  