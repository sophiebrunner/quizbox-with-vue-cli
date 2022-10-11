import { createStore } from "vuex";
import { shuffleArray } from "./helpers";
import { getNrOfRandomizedQuestionsFromSelCategories } from "./helpers";
import router from "@/router";

const store = createStore({
  state() {
    return {
      quizData: [],
      selectedNr: 10,
      selectedCategories: [],
      questionsForSessions: [],
      currentQuestionIndex: 0,
      currentQuestion: "",
    };
  },
  /* User input, change of data in components */
  mutations: {
    setQuizData(state, quizDataFromApi) {
      state.quizData = quizDataFromApi;
    },
    startQuizboxSession(state, sessionParams) {
      /* Set state */
      state.selectedNr = sessionParams.selectedNr;
      state.selectedCategories = sessionParams.selectedCategories;
      state.questionsForSessions = getQuestionsForQuizboxSession(state);
      state.currentQuestionIndex = 0;
      state.currentQuestion =
        state.questionsForSessions[state.currentQuestionIndex];
      /* Set localStorage */
      localStorage.setItem(
        "questionsForSessions",
        JSON.stringify(state.questionsForSessions)
      );
      localStorage.setItem(
        "currentQuestionIndex",
        JSON.stringify(state.currentQuestionIndex)
      );
      localStorage.setItem("currentQuestion", state.currentQuestion);
      router.push({ name: "session" });
    },
    finishQuizboxSession(state) {
      // Reset data for next session
      state.selectedNr = 10;
      state.selectedNr = [];
      state.questionsForSessions = [];
      state.currentQuestionIndex = 0;
      state.currentQuestion = "";
      localStorage.clear();
      router.push({ name: "quizbox" });
    },
    restoreQuizboxSession(state) {
      state.currentQuestion = localStorage.getItem("currentQuestion");
      state.questionsForSessions = JSON.parse(
        localStorage.getItem("questionsForSessions")
      );
      state.currentQuestionIndex = JSON.parse(
        localStorage.getItem("currentQuestionIndex")
      );
    },
    updateQuizboxSession(state) {
      state.currentQuestionIndex++;
      state.currentQuestion =
        state.questionsForSessions[state.currentQuestionIndex];
      localStorage.setItem("currentQuestionIndex", state.currentQuestionIndex);
      localStorage.setItem("currentQuestion", state.currentQuestion);
    },
  },
  /* Initial data loading */
  actions: {
    initQuizbox(context) {
      // Load data from API
      context.dispatch("fetchDataFromApi");
      // Check in localStorage: Is session still active? If yes, restore session and route there
      if (localStorage.getItem("currentQuestion")) {
        context.commit("restoreQuizboxSession");
        router.push({ name: "session" });
      }
    },
    async fetchDataFromApi(context) {
      const categoryLabels = new Map([
        ["basics-html-css", "Web Dev Foundation"],
        ["advanced-html-css", "Advanced HTML"],
        ["basics-js", "Coding Foundation"],
        ["first-js-web-app", "Web Apps Foundation"],
        ["terminal-and-shell", "Terminal and Shell"],
      ]);
      const categories = [...categoryLabels.keys()];

      const handleFetch = async (category) => {
        return fetch(getCategoryUrl(category))
          .then((response) => response.json())
          .then((jsonData) => {
            return {
              category,
              categoryLabel: categoryLabels?.get(category),
              questions: jsonData.questions,
            };
          });
      };

      const apiFetches = categories.map((category) => {
        return handleFetch(category);
      });

      function getCategoryUrl(category) {
        return (
          "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
          category +
          ".json"
        );
      }

      Promise.all(apiFetches).then((result) => {
        context.commit("setQuizData", result);
      });
    },
  },
});
export default store;

function getQuestionsForQuizboxSession(state) {
  const questionsFromSelectedCategories = state.quizData
    .filter((item) => state.selectedCategories.includes(item.category))
    .map((el) => {
      return el.questions;
    });
  /* Condition: checks, if relation between selected number (10, 20, 30) and the number of selected categories (1 - 5) is an integer
  Integer = whole number (1, 2, 3 etc.) vs. fractional number (1.25, 3.75 etc.) 
  If the condition is true it means an equal amount of questions can be selected from all selected categories
  If the condition is false it means the division produced a remainder so the remainder has to be inequally distributed between the categories */
  if (Number.isInteger(state.selectedNr / state.selectedCategories.length)) {
    return shuffleArray(
      getNrOfRandomizedQuestionsFromSelCategories(
        questionsFromSelectedCategories,
        state.selectedNr
      )
    );
  } else {
    let i = state.selectedNr;
    while (!Number.isInteger(i / state.selectedCategories.length)) {
      i++;
    }
    return shuffleArray(
      getNrOfRandomizedQuestionsFromSelCategories(
        questionsFromSelectedCategories,
        i
      ).slice(0, state.selectedNr)
    );
  }
}
