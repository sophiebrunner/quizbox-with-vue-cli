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
  getters: {
    questionsFromSelectedCategories(state) {
      const filteredQuizData = state.quizData.filter((item) =>
        state.selectedCategories.includes(item.category)
      );

      const questionsFromFilteredquizData = filteredQuizData.map((el) => {
        return el.questions;
      });

      function shuffleArray(arr) {
        return [...arr].sort(() => 0.5 - Math.random());
      }
      function getRandomQuestions(arr, num) {
        const shuffledArray = shuffleArray(arr);
        return shuffledArray.slice(0, num);
      }

      if (
        Number.isInteger(state.selectedNr / state.selectedCategories.length)
      ) {
        let randomlyGeneratedQuestions = questionsFromFilteredquizData.map(
          (arrEl) => {
            return getRandomQuestions(
              arrEl,
              state.selectedNr / questionsFromFilteredquizData.length
            );
          }
        );

        randomlyGeneratedQuestions = randomlyGeneratedQuestions.flatMap(
          (el) => el
        );

        randomlyGeneratedQuestions = shuffleArray(randomlyGeneratedQuestions);
        return randomlyGeneratedQuestions;
      } else {
        let i = state.selectedNr;

        while (
          Number.isInteger(i / state.selectedCategories.length) === false
        ) {
          i++;
        }

        let randomlyGeneratedQuestions = questionsFromFilteredquizData.map(
          (arrEl) => {
            return getRandomQuestions(
              arrEl,
              i / questionsFromFilteredquizData.length
            );
          }
        );

        randomlyGeneratedQuestions = randomlyGeneratedQuestions.flatMap(
          (el) => el
        );
        randomlyGeneratedQuestions = shuffleArray(randomlyGeneratedQuestions);
        randomlyGeneratedQuestions = randomlyGeneratedQuestions.slice(
          0,
          state.selectedNr
        );
        return randomlyGeneratedQuestions;
      }
    },
  },
});
export default store;
