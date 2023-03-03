<template>
  <div class="cart">
    <h4 class="title is-4">
      {{ isCheckPaid ? "Lịch sử mua hàng" : "Giỏ hàng của bạn" }}
    </h4>
    <table>
      <thead>
        <tr>
          <th style="width: 25%">Ngày đặt hàng</th>
          <th style="width: 25%">Tên mặt hàng</th>
          <th style="width: 25%">Giá</th>
          <th style="width: 15%">Số lượng</th>
          <th style="width: 15%">Tổng tiền </th>


          <th style="width: 25%">
            {{
              isCheckPaid ? "Đơn hàng đã thanh toán" : "Tiến hành thanh toán"
            }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts" :key="cart.id">
          <template v-if="isCheckPaid === cart.paid">
            <td>{{ formatDate(cart.createdAt) }}</td>
            <td>
              <ul>
                <li v-for="item in cart.items" :key="item.id">
                  {{ item.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="item in cart.items" :key="item.id">
                  {{ item.price }} đ
                </li>
              </ul>
            </td>

            <td>
              <ul>
                <!-- <li v-for="item in cart.items" :key="item.id">
                  {{ item.quantity }} 
                </li> -->
                <li v-for="item in cart.items" :key="item.id">
                  {{ item.quantity }}
                </li>
              </ul>
            </td>
            <td >{{ cart.total }} đ</td>
            <td v-if="cart.paid">OK</td>
            <td v-else>
              <button class="thanh-toan" @click="updateCart(cart.id)">
                Thanh Toán
              </button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <button class="check-btn" @click="check()">
      {{ isCheckPaid ? "Đơn hàng chưa thanh toán" : "Lịch sử mua hàng" }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import axios from "axios";
import router from "@/router";
export default {
  computed: {
    ...mapState(['carts'])
  },
  data() {
    return {
      // carts: [],
      items: [],
      isCheckPaid: false,
      totalQuantity: 0,
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
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        const formattedDate = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const formattedDateString = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return `${formattedDate} ${formattedDateString}`;
      } else {
        return "";
      }
    },
    check() {
      this.isCheckPaid = !this.isCheckPaid;
    },
    updateCart(id) {
      axios
        .put(`https://634918dfa59874146b171fc0.mockapi.io/api/cart/${id}`, {
          paid: true,
        })
        .then((response) => {
          console.log(response.data);
          alert("Bạn đã thanh toán thành công");
          // window.location.reload();
          router.go(0)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTotalQuality(quantity) {
      this.totalQuantity = this.totalQuantity + quantity;
    },
  },
};
</script>
<style>
table {
  margin: 0 auto;
  margin-top: 30px;
  border-collapse: collapse;
  width: 80%;
}

th,
td {
  border: 1px solid rgb(128, 117, 117);
  padding: 10px;
  height: 60px;
  text-align: center;
}

th {
  background-color: rgb(231, 40, 40);
  color: white;
}

td:first-child {
  text-align: left;
}

td:nth-child(2),
td:nth-child(3) {
  width: 20%;
}

td ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

td li {
  margin: 5px 0;
  font-size: 14px;
}
h4.title {
  margin-bottom: 10px;
  margin-top: 10px;
}
td.hide-if-empty:empty {
  visibility: hidden;
}
.check-btn {
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  float: right;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 130px;
}
.thanh-toan {
  margin-top: 15px;
}
</style>
