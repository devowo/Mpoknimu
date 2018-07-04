<template>
  <div class="show">
  <div class="elementoVideo">
	<div class="container" style="">
		<div class="row">
			<h1>
				{{ show.title }} {{ show.chapter }}
			</h1>
    <div class="media80">
    <div id="myElement"></div>
  <!-- https://www.w3schools.com/html/mov_bbb.mp4 -->
  <script2 src="https://content.jwplatform.com/libraries/bfIbW5Pe.js"></script2>
  <script2>
    var playerInstance = jwplayer("myElement");
    playerInstance.setup({
      file:"../../static/citrus5.mp4",
      width: "100%",
      image: "../../static/image.jpg",
      aspectratio: "16:9",
      playbackRateControls: [0.25, 1, 1.25, 2],
      preload: "metadata"
    });
  </script2> 
  </div>
		</div>
	</div>
  </div>
  <ul v-if="errors && errors.length">
    <li v-for="error of errors" :key="error">
      {{error.message}}
    </li>
  </ul>
 </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    show: [],
    errors: []
  }),
  async created() {
    let slug = this.$route.params.slug;
    try {
      const response = await axios
        .get("http://localhost:9000/" + slug)
        .then(response => {
          console.log(response.data);
          this.show = response.data;
        });
    } catch (e) {
      this.errors.push(e);
    }
  }
};
</script>

<style scoped>

</style>
