<template>
  <BaseHeader :headline="text.action"
    ><template v-slot:headline
      ><h3>{{ text.action }}</h3></template
    ></BaseHeader
  >
  <SelectOption
    :action="text.action"
    :description="text.description"
    :select-options="quizData"
  >
    <template #select-option="scopedData">{{
      scopedData.option.category
    }}</template>
  </SelectOption>
  <BaseList
    :headline="text.headline"
    :numberOfItems="numberOfQuestions"
    :list-items="quizData[0]"
  >
    <template #list-item="scopedData">{{ scopedData.item.category }}</template>
  </BaseList>
  {{ quizData }}
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
            data: jsonData.questions,
          };
        });
    }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
};
</script>
