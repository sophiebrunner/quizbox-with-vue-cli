import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      quizData: [],
      selectedNr: null,
      selectedCategories: [],
    };
  },
  /* User input: zB bestimmte Kategorien auswählen und Fragen daraus laden */
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
  },
  /* Initiales Laden von Daten */
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
  },
  /* Gefilterte Daten, die aus component abgerufen werden können */
  getters: {
    randomQuestionsFromSelectedCategories(state) {
      const questionsFromSelectedCategories = state.quizData
        .filter((item) => state.selectedCategories.includes(item.category))
        .map((el) => {
          return el.questions;
        });

      function shuffleArray(arr) {
        return [...arr].sort(() => 0.5 - Math.random());
      }
      function randomizeQuestions(arr, num) {
        const shuffledArray = shuffleArray(arr);
        return shuffledArray.slice(0, num);
      }
      function getRandomQuestionsFromSelectedCategories(num) {
        return questionsFromSelectedCategories
          .map((el) => {
            return randomizeQuestions(
              el,
              num / questionsFromSelectedCategories.length
            );
          })
          .flatMap((el) => el);
      }

      if (
        Number.isInteger(state.selectedNr / state.selectedCategories.length)
      ) {
        return shuffleArray(
          getRandomQuestionsFromSelectedCategories(state.selectedNr)
        );
      } else {
        let i = state.selectedNr;
        while (
          Number.isInteger(i / state.selectedCategories.length) === false
        ) {
          i++;
        }
        return shuffleArray(
          getRandomQuestionsFromSelectedCategories(i).slice(0, state.selectedNr)
        );
      }
    },
  },
});
export default store;
