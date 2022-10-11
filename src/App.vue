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
