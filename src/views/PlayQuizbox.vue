<template>
  <BaseHeader :headline="textForPageHeader.headline" />
  <BaseSelect
    :description="textForPageHeader.description"
    :select-options="nrOfQuestions"
    @change="onNrOfQuestionsSelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option + " Questions"
    }}</template>
  </BaseSelect>
  <BaseHeader
    :headline="textForMainContent.headline"
    :description="'0' + this.quizData.length"
    ><template v-slot:headline
      ><h3>{{ textForMainContent.headline }}</h3></template
    ></BaseHeader
  >
  <BaseList :list-items="quizData"
    ><template #list-item="scopedData"
      ><input type="checkbox" id="scopedData.item.category" />
      <label for="scopedData.item.category"
        ><span>{{ scopedData.item.categoryLabel }}</span> -
        <span>{{
          scopedData.item.questions.length + " Questions"
        }}</span></label
      >
    </template>
  </BaseList>
  <BaseButton :btnTxt="btnTxt"></BaseButton>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { BaseHeader, BaseSelect, BaseList, BaseButton },
  data() {
    return {
      textForPageHeader: {
        headline: "Play Quizbox",
        description: "Quiz time - test what you know",
      },
      textForMainContent: {
        headline: "Question Areas",
      },
      nrOfQuestions: [10, 20, 30],
      chosenNr: 10,
      quizData: [],
      btnTxt: "Start Quizbox",
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
    onNrOfQuestionsSelect(value) {
      this.chosenNr = value;
      console.log(this.chosenNr);
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
    const categories = categoryLabels.keys();
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
};
</script>
