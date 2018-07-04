<template>
  <div class="anime">
  <h3>Info Anime</h3>
  <div><p><strong>Anime Name: </strong>{{  episodes.title }}</p></div> 
  <h1>Episode</h1>
  <ul>
    <li  v-for="episode in episodes.episodes" :key="episode.episodes">
      {{ episode.slug }}
    </li>
  </ul>
    <h1>Genre</h1>
  <ul>
    <li  v-for="episode in episodes.tags" :key="episode.tags">
      {{ episode }}
    </li>
  </ul>
  <ul v-if="errors && errors.length">
    <li v-for="error of errors" :key="error.errors">
      {{error.message}}
    </li>
  </ul>
  <button @click="volver">return</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "anime",
  data() {
    return {
      episodes: [],
      errors: []
    };
  },
  methods:{
    volver(){
      this.$router.push({name: 'Series'});
    }
  },
/* usarlo junto a child-route  
 watch: {
    async $route() {
      let slug = this.$route.params.slug;
      try {
        const response = await axios
          .get("http://localhost:9000/series/1/" + slug)
          .then(response => {
            console.log(response.data);
            this.episodes = response.data;
          });
      } catch (e) {
        this.errors.push(e);
      }
    }
  }, */
  async created() {
    let slug = this.$route.params.slug;
    try {
      const response = await axios
        .get("http://localhost:9000/series/1/" + slug)
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

<style scoped>

</style>
