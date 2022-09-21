<template>
  <BaseHeader
    :headline="textForPageHeader.headline"
    :description="textForPageHeader.description"
  ></BaseHeader>
  <p>{{ currentQuestion }}</p>
  {{ selectedCategories }}
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
        description: "Question count 01/30",
      },
      arrayWithQuestions: [
        "What is the purpose of the flex-direction property?",
        "What is a flexbox?",
        "What is the p?",
        "What is the flex-shrink property?",
        "What is the flex-basis property?",
      ],
      currentQuestionIndex: 0,
    };
  },
  computed: {
    currentQuestion() {
      return this.arrayWithQuestions[this.currentQuestionIndex];
    },
    btnTxt() {
      return "Next";
    },
    selectedCategories() {
      return this.$root.selectedQuizCategories;
    },
  },
  methods: {
    navigateThroughSession() {
      this.currentQuestionIndex++;
    },
  },
};
</script>
