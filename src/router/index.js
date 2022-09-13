import { createRouter, createWebHistory } from "vue-router";
import PlayQuizbox from "@/views/PlayQuizbox.vue";

const routes = [
  {
    path: "/",
    name: "quizbox",
    component: PlayQuizbox,
  },
  {
    path: "/browse-questions",
    name: "questions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/BrowseQuestions.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
