<template>
  <div>
      <h1>Success</h1>
      <button @click='logOut'>Logout</button>
     <!--  <img :src="photo" alt="photo"> -->
      <p>{{name}}</p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      photo: "",
      user: {}
    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.photo = this.user.photoURL;
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>

</style>
