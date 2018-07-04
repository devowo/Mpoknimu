// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import firebase from "firebase";
import firebaseui from "firebaseui";
import { config } from "./helpers/firebaseConfig";
import "./assets/css/app.css";
import AsyncMethods from "vue-async-methods";

Vue.use(AsyncMethods);
Vue.config.productionTip = true;
let app;

Vue.filter("suspensivos", function(texto) {
  return texto.substring(0, 18) + "...";
});
Vue.filter("normalize", function(texto) {
  return texto.toUpperCase();
});

Vue.use(require("vue-script2"));
/* eslint-disable no-new */
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: "#app",
      template: "<App/>",
      components: { App },
      router
    });
  }
});

/* new Vue({
  el: "#app",
  router,
   created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/success')
      }else {
        this.$router.push('/auth')
      }
    });
  }, 
  components: { App },
  template: "<App/>"
});
 */
/* 
new Vue({
  router,
  template: `
  <div id='app'>
    <ul> 
       <li> <router-link to='/' > App</router-link> </li>
       <li> <router-link to='/home' > home</router-link> </li>
      <li> <router-link to='/user' > user</router-link> </li>
    </ul>
  <router-view></router-view>
  </div>
  `
}).$mount('#app')
 */
