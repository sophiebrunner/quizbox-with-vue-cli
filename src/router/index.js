import { createRouter, createWebHistory } from "vue-router";
import PlayQuizbox from "@/views/PlayQuizbox.vue";
import BrowseQuestions from "@/views/BrowseQuestions.vue";

const routes = [
  {
    path: "/",
    name: "quizbox",
    component: PlayQuizbox,
  },
  {
    path: "/browse-questions",
    name: "questions",
    component: BrowseQuestions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
