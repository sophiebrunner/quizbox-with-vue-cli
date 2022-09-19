<template>
  <BaseHeader :headline="action" />
  <SelectOption
    :description="questionAreas.description"
    :select-options="numberOfQuestions"
    @change="onNumberOfQuestionsSelect"
  >
    <template #select-option="scopedData">{{ scopedData.option }}</template>
  </SelectOption>
  <BaseList :numberOfItems="numberOfQuestions.length"></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "PlayQuizbox",
  components: { SelectOption, BaseButton, BaseList, BaseHeader },
  data() {
    return {
      action: "Play Quizbox",
      numberOfQuestions: [10, 20, 30],
      chosenNumber: 10,
      questionAreas: {
        headline: "Question Areas",
        description: "Quiz time - test what you know",
      },
      quizData: [],
    };
  },
  methods: {
    onNumberOfQuestionsSelect(value) {
      this.chosenNumber = value;
      console.log(this.chosenNumber);
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
