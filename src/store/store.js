import { createStore } from "vuex";
import { shuffleArray } from "./helpers";
import { getRandomQuestionsFromSelectedCategories } from "./helpers";

const store = createStore({
  state() {
    return {
      quizData: [],
      selectedNr: 10,
      selectedCategories: [],
      currentQuestionIndex: 0,
    };
  },
  /* User input, change of data in components */
  mutations: {
    setQuizData(state, quizDataFromApi) {
      state.quizData = quizDataFromApi;
    },
    changeSelectedNr(state, selectedNrFromComponent) {
      state.selectedNr = selectedNrFromComponent;
    },
    setSelectedCategories(state, selectedCategoriesFromComponent) {
      state.selectedCategories = selectedCategoriesFromComponent;
    },
    setInitialCurrentQuestionIndex(state, number) {
      state.currentQuestionIndex = number;
    },
    incrementCurrentQuestionIndex(state) {
      state.currentQuestionIndex++;
    },
  },
  /* Initial data loading */
  actions: {
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
    getCurrentQuestionIndexFromLocalStorage(context) {
      const result = localStorage.getItem("currentQuestionIndex");
      context.commit("setInitialCurrentQuestionIndex", result);
    },
    getSelectedCategoriesFromLocalStorage(context) {
      const result = localStorage.getItem("selectedCategories");
      context.commit("setSelectedCategories", result);
    },
    getSelectedNumberFromLocalStorage(context) {
      const result = localStorage.getItem("selectedNr");
      context.commit("changeSelectedNr", result);
    },
  },
  /* Filtered data that can be accessed in component */
  getters: {
    randomQuestionsFromSelectedCategories(state) {
      /* Early exit */
      if (state.selectedNr === null || state.selectedCategories.length === 0) {
        return [];
      }
      const questionsFromSelectedCategories = state.quizData
        .filter((item) => state.selectedCategories.includes(item.category))
        .map((el) => {
          return el.questions;
        });
      /* Condition: checks, if relation between selected number (10, 20, 30) and the number of selected categories (1 - 5) is an integer
      Integer = whole number (1, 2, 3 etc.) vs. fractional number (1.25, 3.75 etc.) 
      If the condition is true it means an equal amount of questions can be selected from all selected categories
      If the condition is false it means the division produced a remainder so the remainder has to be inequally distributed between the categories */
      if (
        Number.isInteger(state.selectedNr / state.selectedCategories.length)
      ) {
        return shuffleArray(
          getRandomQuestionsFromSelectedCategories(
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
          getRandomQuestionsFromSelectedCategories(
            questionsFromSelectedCategories,
            i
          ).slice(0, state.selectedNr)
        );
      }
    },
  },
});
export default store;
