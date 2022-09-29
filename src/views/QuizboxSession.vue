<template>
  <BaseHeader
    :headline="textForPageHeader.headline"
    :description="
      textForPageHeader.description +
      ' ' +
      currentQuestionIndex +
      1 +
      questionsFromSelectedCategories.length
    "
  ></BaseHeader>
  <!-- <pre>{{ questionsFromSelectedCategories }}</pre> -->
  <p>{{ currentQuestion }}</p>
  <BaseButton :btnTxt="btnTxt" @click="navigateThroughSession" />
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "QuizboxSession",
  components: {
    BaseHeader,
    BaseButton,
  },
  data() {
    return {
      textForPageHeader: {
        headline: "Quizbox Session",
        /* 👩🏻‍💻 Feature: description wird zu computed property, das aktuellen index im array anzeigt;
        wenn array durch ist, Text anzeigen "Session finished" */
        description: "Question count",
      },
      currentQuestionIndex: 0,
    };
  },
  computed: {
    questionsFromSelectedCategories() {
      return this.$store.getters.questionsFromSelectedCategories;
    },
    currentQuestion() {
      return this.questionsFromSelectedCategories[this.currentQuestionIndex];
      /* 👩🏻‍💻 Feature:
      currentQuestion wird zu "Congratulations! You finished..." wenn array durchgelaufen ist */
    },
    btnTxt() {
      return "Next";
      /* 👩🏻‍💻 Feature:
      btnTxt ändert sich je nach Stelle im array; wenn fertig "Finish" anzeigen
      Condirional operator? */
    },
  },
  methods: {
    navigateThroughSession() {
      this.currentQuestionIndex++;
    },
  },
};
</script>
