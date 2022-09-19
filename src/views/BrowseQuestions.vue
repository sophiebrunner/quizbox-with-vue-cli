<template>
  <BaseHeader :headline="text.action" />
  <SelectOption
    :description="text.description"
    :select-options="quizData"
    @change="onCategorySelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option.category
    }}</template>
  </SelectOption>
  <BaseHeader
    :headline="text.headline"
    :description="numberOfQuestionsFromSelectedCategory"
    ><template v-slot:headline
      ><h3>{{ text.headline }}</h3></template
    ></BaseHeader
  >
  <!-- Wie Liste conditional rendern? v-if? Welche Logik? Event in SelectOption abfangen? -->
  <BaseList :list-items="questionsFromSelectedCategory"
    ><template #list-item="scopedData">{{ scopedData.item }} </template>
  </BaseList>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "BrowseQuestions",
  components: { SelectOption, BaseList, BaseHeader },
  data() {
    return {
      text: {
        action: "Browse Questions",
        description: "Choose a category with questions",
        headline: "Questions from the chapter",
      },
      quizData: [],
      selectedCategory: "",
    };
  },
  computed: {
    allQuestions() {
      return this.quizData.flatMap((data) => data.questions);
    },
    questionsFromSelectedCategory() {
      return this.quizData.find(
        (categoryItem) => categoryItem.category === this.selectedCategory
      )?.questions;
    },
    numberOfQuestionsFromSelectedCategory() {
      return this.questionsFromSelectedCategory?.length.toString();
    },
  },
  methods: {
    onCategorySelect(value) {
      this.selectedCategory = value;
    },
  },
  created() {
    const apiFetches = [
      handleFetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/basics-html-css.json"
      ),
      handleFetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/advanced-html-css.json"
      ),
      handleFetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/basics-js.json"
      ),
      handleFetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/first-js-web-app.json"
      ),
      handleFetch(
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/terminal-and-shell.json"
      ),
    ];

    function getCategoryByUrl(url) {
      const categoryByUrl = url
        .replace(
          "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/",
          ""
        )
        .replace(".json", "")
        .split("-")
        .join(" ");
      const categoryWithUpperCases = categoryByUrl
        .split(" ")
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
      return categoryWithUpperCases;
    }

    function handleFetch(url) {
      return fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
          //Hier Daten aufbereiten
          return {
            category: getCategoryByUrl(url),
            questions: jsonData.questions,
          };
        });
    }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
};
</script>
