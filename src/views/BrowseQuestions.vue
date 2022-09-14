<template>
  <SelectOption
    :action="text.action"
    :description="text.description"
    :select-options="quizData"
  >
    <template #select-option="{ scopedData }">{{
      scopedData.option.category
    }}</template>
  </SelectOption>
  <BaseList
    :headline="text.headline"
    :numberOfItems="numberOfQuestions"
    :list-items="quizData"
  >
    <template #list-item="{ scopedData }">{{
      scopedData.item.questions
    }}</template>
  </BaseList>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";

export default {
  name: "BrowseQuestions",
  components: { SelectOption, BaseList },
  data() {
    return {
      numberOfQuestions: 5,
      text: {
        action: "Browse Questions",
        description: "Choose a category with questions",
        headline: "Questions from the chapter",
      },
      quizData: [],
    };
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
      return url
        .replace(
          "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/",
          ""
        )
        .replace(".json", "")
        .split("-")
        .join(" ");
    }

    function handleFetch(url) {
      return fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
          //Hier Daten aufbereiten
          return {
            category: getCategoryByUrl(url),
            data: jsonData,
          };
        });
    }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
};
</script>
