<template>
  <header class="page-header">
    <div class="hamburger-menu-wrapper">
      <nav class="hamburger-menu" @click="toggleMenu">
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
      </nav>
      <h1 class="heading heading--light-colored">Quizbox</h1>
      <div class="menu__triangle menu__triangle--primary"></div>
    </div>
    <nav class="nav" :class="{ active: showNav, hidden: !showNav }">
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
      <div class="menu__triangle menu__triangle--secondary"></div>
    </nav>
  </header>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showNav = !this.showNav;
    },
  },
  created() {
    this.$store.dispatch("initQuizbox");
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

/* General styling */
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0 auto;
  max-width: 100vw;
}
main {
}
@media screen and (min-width: 992px) {
  #app {
    display: flex;
  }
  .page-header {
    width: 20vw;
  }
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

/* Headings */
h1 {
  padding: 1em;
  margin: 0;
  background-color: var(--clr-primary);
  text-align: center;
}

/* Header area */
.page-header {
  position: relative;
}

/* Hamburger menu */
.hamburger-menu-wrapper {
  position: relative;
  z-index: 1;
}
.hamburger-menu {
  position: absolute;
  top: 2rem;
}
.hamburger-menu__icon {
  display: block;
  width: 2.5em;
  height: 0.25em;
  background: var(--clr-surface);
  border-radius: 3px;
  transform-origin: 0 0.5em 0;
  transition: transform 0.5s cubic-bezier(0.77, 0.2 0.05, 1),
    background 0.5 cubic-bezier(0.77, 0.2 0.05, 1), opacity 0.55s ease;
}
.hamburger-menu__icon + .hamburger-menu__icon {
  margin-top: 0.5em;
}
.clicked:first-child {
  transform: rotate(45deg) translate(-2px, -1px);
  transform-origin: 0 0;
}
.clicked:nth-last-child(2) {
  opacity: 0;
}
.clicked:last-child {
  transform: rotate(-45deg) translate(-2px, -1px);
  transform-origin: 0 100%;
}

/* Navigation menu */
.nav {
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  color: var(--clr-surface);
  cursor: pointer;
  transition: transform 1s ease-in-out;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
}
.nav__list {
  background: var(--clr-secondary);
  margin: 0;
  padding-left: 0;
  padding-top: 4em;
  padding-bottom: 4em;
  list-style-type: none;
}
.nav__item {
}
.nav__item + .nav__item {
  margin-top: 2em;
}
.hidden {
  position: relative;
  transform: translateY(-200px);
  z-index: 0;
}
.active {
  transform: translateY(-40px);
}
.menu__triangle {
  width: 0;
  height: 0;
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
}
.menu__triangle--primary {
  border-top: 2em solid var(--clr-primary);
}
.menu__triangle--secondary {
  border-top: 2em solid var(--clr-secondary);
}
nav a {
  border-bottom: 3px solid var(--clr-surface);
  text-decoration: none;
  padding: 1em;
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
