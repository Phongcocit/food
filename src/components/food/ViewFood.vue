<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css"
  />
  <div class="header">
    <header>
      <nav>
        <div class="search-box is-flex">
          <div class="field has-addons is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="" />
            </p>
            <p class="control">
              <button class="button" type="submit">Search</button>
            </p>
          </div>
        </div>
        <ul>

          <li><a href="#">All </a></li>
          <li><a href="#">Animation</a></li>
          <li><a href="#">Interactions</a></li>
          <li><a href="#">CMS</a></li>
          <li><a href="#">Ecommerce</a></li>
          <li><a href="#">Portfolio</a></li>
        </ul>
      </nav>
    </header>
  </div>
  <div class="container" v-if="!isLoading">
    <div class="columns is-multiline">
      <div class="column is-4" v-for="demo in demosToDisplay" :key="demo.id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="
                  'http://localhost:1337' +
                  demo.attributes.Img.data.attributes.url
                "
                :alt="demo.attributes.Img.data.attributes.url"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              {{ demo.attributes.Name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="demosToDisplay.length < demos.length">
      <button @click="loadMore">Load more</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      demos: [],
      isLoading: true,
      demosToDisplay: [],
      itemsPerPage: 9,
      isAnimation: false,
      isInteractions: false,
      isCMS: false,
      isEcommerce: false,
      isPortfolio: false,
      all: true,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/demos?populate=*"
      );
      this.demos = response.data.data;
      console.log(
        "http://localhost:1337" +
          this.demos[0].attributes.Img.data.attributes.formats.thumbnail.url
      );
      this.isLoading = false;
      this.demosToDisplay = this.demos.slice(0, this.itemsPerPage);
    } catch (error) {
      this.error = error;
    }
  },
  provide() {
    return {
      demos: this.demos,
    };
  },
  created() {},
  methods: {
    loadMore() {
      const startIndex = this.demosToDisplay.length;
      const endIndex = startIndex + this.itemsPerPage;
      const newItems = this.demos.slice(startIndex, endIndex);
      this.demosToDisplay = [...this.demosToDisplay, ...newItems];
    },
    Animation() {
      this.isAnimation = true;
      this.isInteractions = false;
      this.isCMS = false;
      this.isEcommerce = false;
      this.isPortfolio = false;
      this.all = false;
    },

    Interactions() {
      this.isAnimation = false;
      this.isInteractions = true;
      this.isCMS = false;
      this.isEcommerce = false;
      this.isPortfolio = false;
      this.all = false;
    },
    CMS() {
      this.isAnimation = false;
      this.isInteractions = false;
      this.isCMS = true;
      this.isEcommerce = false;
      this.isPortfolio = false;
      this.all = false;
    },
    Ecommerce() {
      this.isAnimation = false;
      this.isInteractions = false;
      this.isCMS = false;
      this.isEcommerce = true;
      this.isPortfolio = false;
      this.all = false;
    },
    Portfolio() {
      this.isAnimation = true;
      this.isInteractions = false;
      this.isCMS = false;
      this.isEcommerce = false;
      this.isPortfolio = true;
      this.all = false;
    },
    All() {
      this.all = true;
    }
  },
  computed: {
  demosComputed() {
    if (this.isAnimation) {
      return this.demos.filter((demo) => demo.attributes.Type === 'Animation');
    } else if (this.isInteractions) {
      return this.demos.filter((demo) => demo.attributes.Type === 'Interactions');
    } else if( this.isCMS){
      return this.demos.filter((demo) => demo.attributes.Type === 'CMS');
    } else if(this.isEcommerce){
      return this.demos.filter((demo) => demo.attributes.Type === 'Ecommerce');
    }else if(this.isPortfolio){
      return this.demos.filter((demo) => demo.attributes.Type === 'Portfolio');
    }else return  this.demos;
  },
  
}
};
</script>
<style>
ul {
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  float: left;
}

li a {
  background-color: #e7e5e5;
  display: block;
  color: rgb(0, 0, 0);
  text-align: center;
  padding: 7px;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 3px;
}

li a:hover {
  background-color: #d4d2d2;
}

header {
  margin-bottom: 5%;
}
.search-box {
  margin-top: 5%;
  margin-bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-box input[type="text"] {
  width: 400px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ddd;
}

@media screen and (max-width: 768px) {
  .search-box {
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .search-box input[type="text"] {
    width: 100%;
    margin-bottom: 10px;
  }

  .search-box button[type="submit"] {
    width: 100%;
  }

  .navbar-end {
    margin-right: 0;
  }
}
</style>
