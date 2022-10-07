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
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Source Sans Pro SemiBold 600 */
@font-face {
  font-family: "Source Sans Pro";
  src: local("Source Sans Pro"),
    url(./styles/fonts/Source_Sans_Pro/SourceSansPro-SemiBold.ttf)
      format("truetype");
}

/* Montserrat SemiBold 600 */
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url(./styles/fonts/Montserrat/static/Montserrat-SemiBold.ttf)
      format("truetype");
}

body {
  margin: 0 auto;
  max-width: 390px;
  height: 100vh;
}

#app {
  font-family: "Source Sans Pro", sans-serif;
  --clr-primary: #6a1cc3;
  --clr-primary-inactive: #6a1cc326;
  --clr-secondary: #8849cf;
  --clr-surface: #fbfbfb;
  --clr-text: #00000057;
  text-align: center;
}

h1,
h2,
h3 {
  text-align: center;
}

nav {
  padding: 30px;
  color: var(--clr-surface);
  background-color: var(--clr-primary);
}

nav a {
  font-weight: bold;
  color: var(--clr-surface);
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
