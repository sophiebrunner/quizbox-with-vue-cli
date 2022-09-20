<template>
  <BaseHeader :headline="action" />
  <BaseSelect
    :description="questionAreas.description"
    :select-options="numberOfQuestions"
    @change="onNumberOfQuestionsSelect"
  >
    <template #select-option="scopedData">{{ scopedData.option }}</template>
  </BaseSelect>
  <BaseList :numberOfItems="numberOfQuestions.length"></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "PlayQuizbox",
  components: { BaseSelect, BaseButton, BaseList, BaseHeader },
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
    onNumberOfQuestionsSelect(value) {
      this.chosenNumber = value;
      console.log(this.chosenNumber);
    },
  },
  created() {
    const categoryLabels = new Map([
      ["basics-html-css", "Web Dev Foundation"],
      ["advanced-html-css", "Advanced HTML"],
      ["basics-js", "Coding Foundation"],
      ["first-js-web-app", "Web Apps Foundation"],
      ["terminal-and-shell", "Terminal and Shell"],
    ]);
    // const categories = categoryLabels.keys();

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

    // function getCategoryByUrl(url) {
    //   return url
    //     .replace(
    //       "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/",
    //       ""
    //     )
    //     .replace(".json", "")
    //     .split("-")
    //     .join(" ");
    // }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
};
</script>
