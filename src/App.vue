<template>
  <header class="page-header">
    <nav class="hamburger-menu">
      <input type="checkbox" class="hamburger-menu__hidden-checkbox" />
      <span class="hamburger-menu__icon"></span>
      <span class="hamburger-menu__icon"></span>
      <span class="hamburger-menu__icon"></span>
    </nav>
    <h1 class="heading heading--light-colored">Quizbox</h1>
    <div class="menu__triangle--primary"></div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link :to="{ name: 'quizbox' }" class="text--light-colored"
            >Play Quizbox</router-link
          >
        </li>
        <li class="nav__item">
          <router-link :to="{ name: 'questions' }" class="text--light-colored"
            >Browse Questions</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="menu__triangle--secondary"></div>
  </header>
  <router-view />
</template>

//
<script>
export default {
  created() {
    this.$store.dispatch("fetchDataFromApi");
    this.$store.dispatch("getCurrentQuestionIndexFromLocalStorage");
    this.$store.dispatch("getSelectedCategoriesFromLocalStorage");
    this.$store.dispatch("getSelectedNumberFromLocalStorage");
  },
};
</script>

<style>
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

*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0 auto;
  max-width: 320px;
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

h1 {
  padding: 1em;
  margin: 0;
  background-color: var(--clr-primary);
  text-align: center;
}

.page-header {
  _position: relative;
}

.menu__triangle--primary {
  width: 0;
  height: 0;
  border-left: 160px solid transparent;
  border-right: 160px solid transparent;
  border-top: 20px solid var(--clr-primary);
}
.menu__triangle--secondary {
  _position: relative;
  width: 0;
  height: 0;
  border-left: 160px solid transparent;
  border-right: 160px solid transparent;
  border-top: 20px solid var(--clr-secondary);
}
.hamburger-menu__hidden-checkbox {
  border: 2px solid black;
  display: block;
  width: 3em;
  height: 2em;
  _position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}
.hamburger-menu__icon {
  display: block;
  width: 2em;
  height: 0.25em;
  background: var(--clr-text);
  border-radius: 3px;
  z-index: 1;
  transform-origin: 0 0.5em 0;
  transition: transform 0.3s cubic-bezier(0.77, 0.2 0.05, 1),
    background 0.5 cubic-bezier(0.77, 0.2 0.05, 1), opacity 0.55s ease;
}
.hamburger-menu__icon + .hamburger-menu__icon {
  margin-top: 0.5em;
}
.hamburger-menu__icon:first-child {
  transform-origin: 0% 0%;
}
.hamburger-menu__icon:last-child(2) {
  transform-origin: 0% 100%;
}
.hamburger-menu__hidden-checkbox:checked ~ .hamburger-menu__icon {
  opacity: 1;
  transform: rotate(45deg) translate(0, 0);
  background: var(--clr-surface);
}
.hamburger-menu__hidden-checkbox:checked
  ~ .hamburger-menu__icon:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg);
}
.hamburger-menu__hidden-checkbox:checked
  ~ .hamburger-menu__icon:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, 0);
}
.nav {
  _position: relative;
  top: 0.3em;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: var(--clr-surface);
  text-transform: uppercase;
  text-align: center;
}
.nav__list {
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  _position: absolute;
  _top: 5em;
  left: 0;
  background: var(--clr-secondary);
  transform-origin: 0% 100%;
  _transform: translate(0, -400%);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  width: 320px;
  display: inline-block;
  text-align: left;
}
.nav__item {
}
.nav__item + .nav__item {
  margin-top: 2em;
}
.hamburger-menu__hidden-checkbox:checked ~ .nav__list {
  transform: none;
}
nav a.router-link-exact-active {
  background-color: var(--clr-primary);
}

/* Style classes */
.heading {
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
}
.heading--light-colored {
  color: var(--clr-surface);
}
.text--light-colored {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: var(--clr-surface);
}
</style>
