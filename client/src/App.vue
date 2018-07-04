<template>
<div class="contenedor" >
<div id="app">
<header>
			<div class="logo">
				<router-link to='/' exact> Home</router-link>
			</div>
			<nav>
        <router-link to='/' exact> Start</router-link>
				<router-link to='/series' exact> series</router-link>
        <router-link to='/user' exact> user</router-link>
			</nav>
</header>
<router-view></router-view>
 </div>
</div>
</template>

<script>
import User from "./components/User";
import Serie from "./components/Series";
import InfoSerie from "./components/InfoSerie";
import Ver from "./components/Ver";

export default {
  name: "App",
  components: {
    User,
    Serie,
    InfoSerie,
    Ver
  }
};
</script>

<style>

</style>
