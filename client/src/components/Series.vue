<template >
<div class="contenedor">
<template v-if="isloaded===false">
      <p>Loading Data</p>
</template>
<div class="elemento">
<router-link tag="div" class="sada1" v-bind:to="{name:'InfoSerie',params: {slug: serie.slug}}"
      v-for="serie in paginate"  :key="serie.title" >
      <a :href="(`${serie.slug}`)" class="card-link">  <img class="image" id="image-home" :src="(`${serie.cover}`)" alt="Card image cap"></a>
      <h4 class="card-title">
				{{ serie.title | normalize | suspensivos }}
			</h4>
    </router-link>
</div>
<div class="pagination">
    <li v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages || pageNumber == 1" :key="pageNumber">
    <a  ref="myBtn" id="myBtn" href="#" @click="setPage(pageNumber)" :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}">{{ pageNumber }}</a >
    </li>
</div>
  <ul v-if="errors && errors.length">
    <li v-for="error of errors" :key="error.errors">
      {{error.message}}
    </li>
  </ul>
 </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.getSeries();
  },

  data() {
    return {
      serieUrl: "http://localhost:9000/series/1",
      series: [],
      errors: [],
      currentPage: 1,
      itemsPerPage: 3,
      resultCount: 0,
      isloaded: false
    };
  },

  computed: {
    totalPages: function() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate: function() {
      if (this.isloaded === true) {
        //middleware funciona igual sin el
        if (!this.series || this.series.length != this.series.length) {
          return;
        }
        this.resultCount = this.series.length;
        if (this.currentPage >= this.totalPages) {
          this.currentPage = this.totalPages;
        }

        const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
        return this.series.slice(index, index + this.itemsPerPage);
      }
    }
  },

  watch: {
    paginate: function(val) {
      /* alert("yes, computed property changed"); */
      console.log("changed");
    }
  },

  methods: {
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
    },

    async getSeries() {
      let self = this;
      try {
        const response = await axios
          .get(this.serieUrl, { params: this.serieData })
          .then(response => {
            console.log(response.data);
            this.series = response.data;
            self.isloaded = true;
          });
      } catch (e) {
        this.errors.push(e);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current {
  color: red;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline;
  margin: 5px 5px;
}

a.first::after {
  content: "...";
}

a.last::before {
  content: "...";
}
</style>
