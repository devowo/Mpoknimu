<template>
  <div class="user">
    <input type="text" name="name" v-model="name">
    <input type="text" name="lasname" v-model="lastname">
    <span v-text="fullname"></span>
  </div>
</template>

<script>
export default {
  name: 'user',
  data(){
    return {
      name: '',
      lastname: '',
      title: '<h1>user view</h1>'
    }

  },
  methods: {
   
    },
    computed: {
      fullname : function(){
        return this.name+ ' ' +this.lastname;
      }
    }
  }
</script>

<style scoped>

</style>

