<template>
<div class="contenedor">
  <div class="elemento">
  
  <router-link tag="div" class="caps" v-bind:to="{name:'Ver',params: {slug: home.slug}}"
    v-for="home in episodes" :key="home.title" >
    <a :href="(`${home.imageCap}`)"><img class="episodeimage"  :src="(`${home.imageCap}`)"></a>
    <h4>
      {{ home.title | normalize | suspensivos }}
    </h4>
   </router-link> 
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      episodes: [],
      errors: []
    };
  },
  async created() {
    try {
      const response = await axios
        .get("http://localhost:9000/")
        .then(response => {
          console.log(response.data);
          this.episodes = response.data;
        });
    } catch (e) {
      this.errors.push(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
