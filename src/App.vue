<template>
  <header class="page-header">
    <div class="hamburger-menu-wrapper">
      <nav class="hamburger-menu" @click="toggleMenu">
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
      </nav>
      <h1 :class="classesForHeadline">Quizbox</h1>
      <div class="menu__triangle menu__triangle--primary"></div>
    </div>
    <nav class="nav" :class="{ active: showNav, hidden: !showNav }">
      <div class="list-wrapper">
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
      </div>
      <div class="menu__triangle menu__triangle--secondary"></div>
    </nav>
  </header>
  <main @click="collapseMenu">
    <router-view />
  </main>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
      classesForHeadline: [
        "text--light-colored",
        "text--montserrat",
        "text--regular",
        "text--uppercase",
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.showNav = !this.showNav;
    },
    collapseMenu() {
      this.showNav = false;
    },
  },
  created() {
    this.$store.dispatch("initQuizbox");
  },
};
function collapseMenuAutomatically(showNav) {
  if (showNav === true) {
    setTimeout(this.collapseMenu, 5000);
  }
}
collapseMenuAutomatically();
</script>
