import { createApp } from "vue";
import { reactive } from "vue";

import App from "./App.vue";
import router from "./router";

export const store = reactive({
  quizData: [],
  selectedCategories: [],

  async fetchDataFromApi() {
    const categoryLabels = new Map([
      ["basics-html-css", "Web Dev Foundation"],
      ["advanced-html-css", "Advanced HTML"],
      ["basics-js", "Coding Foundation"],
      ["first-js-web-app", "Web Apps Foundation"],
      ["terminal-and-shell", "Terminal and Shell"],
    ]);

    const categories = [...categoryLabels.keys()];
    console.log(categories);

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

    /* 🔄 Refactoring: 
    const apiFetches = categories.forEach((category) => {
      handleFetch(category);
    });
    🐞 Debug: apiFetches gibt undefined zurück
*/

    const apiFetches = [
      handleFetch("basics-html-css"),
      handleFetch("advanced-html-css"),
      handleFetch("basics-js"),
      handleFetch("first-js-web-app"),
      handleFetch("terminal-and-shell"),
    ];

    function getCategoryUrl(category) {
      return (
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
        category +
        ".json"
      );
    }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
});

createApp(App).use(router).mount("#app");
