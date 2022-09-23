<template>
  <h1>Quizbox</h1>
  <nav>
    <router-link :to="{ name: 'quizbox' }">Play Quizbox</router-link> |
    <router-link :to="{ name: 'questions' }">Browse Questions</router-link> |
    <router-link :to="{ name: 'session' }">Start Quizbox</router-link>
  </nav>
  <router-view />
</template>

//
<script>
export default {
  created() {
    this.$store.dispatch("fetchDataFromApi");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
