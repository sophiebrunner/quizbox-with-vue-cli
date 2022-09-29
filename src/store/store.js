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

      function getRandomQuestions(arr, num) {
        const shuffledArray = [...arr].sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, num);
      }

      // if ((state.selectedNr % state.selectedCategories.length) % 2 == 0) {
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

      randomlyGeneratedQuestions = [...randomlyGeneratedQuestions].sort(
        () => 0.5 - Math.random()
      );
      return randomlyGeneratedQuestions;
    },
  },
});
export default store;
/*👩🏻‍💻 Feature:
      Requirement: Anzahl Fragen UND 1 oder mehrere Kategorien;
      wenn mehrere Kategorien ausgewählt => gleiche Zahl an Fragen aus
      ausgewählten Kategorien zusammenstellen

      Step 1: Array mit Fragen aus einer Kategorie ✅
      Step 2: Array mit Fragen aus mehreren Kategorien
              Wenn gerade: übergebe Array jeweils selectedNr % selectedCategories.length-questions aus jeder ausgewählten Kategorie ✅
              Wenn ungerade: 20 Fragen 3 Kategorien = 6, 7, 7 // 10 Fragen, 3 Kategorien = 3, 3, 4 => Wie abbilden?
              Aufrunden, so viel wie aufgerundet wurde am Ende wieder wegschneiden
      */
