<template>
  <header class="page-header">
    <div class="page-header__menu--primary">
      <nav class="hamburger-menu" @click="ontoggleMenu">
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
        <span class="hamburger-menu__icon" :class="{ clicked: showNav }"></span>
      </nav>
      <h1 :class="{ headingVisible: desktopView }">Quizbox</h1>
    </div>
    <nav
      class="page-header__menu--secondary"
      :class="{ visible: showNav, hidden: !showNav }"
    >
      <div class="nav">
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
          <li class="nav__item" v-if="sessionActive">
            <router-link :to="{ name: 'session' }" class="text--light-colored"
              >Resume Session</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main @click="oncollapseMenu">
    <router-view />
  </main>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
      windowSize: window.innerWidth,
      desktopView: false,
    };
  },
  computed: {
    sessionActive() {
      return this.$store.state.sessionActive;
    },
  },
  methods: {
    ontoggleMenu() {
      this.showNav = !this.showNav;
      if (this.windowSize >= 992) {
        this.desktopView = !this.desktopView;
      }
    },
    oncollapseMenu() {
      this.showNav = false;
    },
    onResize() {
      this.windowSize = window.innerWidth;
    },
  },
  created() {
    this.$store.dispatch("fetchDataFromApi");
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
};
</script>
