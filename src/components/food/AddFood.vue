<template>
    <div class="container">
      <form class="add-product-form">
        <h2>Add New Product</h2>
        <label>Name:</label>
        <input type="text" v-model="name" required class="input-field">
        <label>Image:</label>
        <input type="text" v-model="image" required class="input-field">
        <label>Price:</label>
        <input type="number" v-model="price" required class="input-field">
        <label>Description:</label>
        <input type="text" v-model="description" required class="input-field">
        <button @click.prevent="addProduct" class="submit-btn">Add Product</button>
      </form>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      image: '',
      price: '',
      description: ''
    };
  },
  methods: {
    addProduct() {
      const newProduct = {
        name: this.name,
        image: this.image,
        price: this.price,
        description: this.description
      };

      axios.post('https://634918dfa59874146b171fc0.mockapi.io/api/food', newProduct)
        .then(response => {
          console.log(response);
          alert('Thêm sản phẩm thành công!');
        })
        .catch(error => {
          console.log(error);
          alert('Thêm sản phẩm thất bại!');
        });
    }
  }
}
</script>

 <style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: none;
  background-color: #4CAF50;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #3e8e41;
}

</style>
  