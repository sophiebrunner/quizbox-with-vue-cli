<template>
  <BaseHeader
    :headline="textForPageHeader.headline"
    :description="currentQuestionCount"
    ><template v-slot:description
      ><span>{{ textForPageHeader.description }}</span
      ><span>{{ currentQuestionCount }}</span></template
    ></BaseHeader
  >
  <pre>{{ questionsFromSelectedCategories }}</pre>
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
        description: "Question count",
      },
      currentQuestionIndex: 0,
      btnTxt: "Next",
    };
  },
  computed: {
    questionsFromSelectedCategories() {
      return this.$store.getters.questionsFromSelectedCategories;
    },
    currentQuestion() {
      return this.questionsFromSelectedCategories[this.currentQuestionIndex];
    },
    currentQuestionCount() {
      return this.currentQuestionIndex + 1 < 10
        ? "0" +
            (this.currentQuestionIndex + 1) +
            "/" +
            this.questionsFromSelectedCategories.length
        : this.currentQuestionIndex +
            1 +
            "/" +
            this.questionsFromSelectedCategories.length;
    },
  },
  watch: {
    currentQuestionIndex(currentIndex) {
      if (currentIndex + 1 > this.questionsFromSelectedCategories.length) {
        this.endQuizSession();
      }
    },
  },
  methods: {
    navigateThroughSession() {
      return this.currentQuestionIndex <
        this.questionsFromSelectedCategories.length
        ? this.currentQuestionIndex++
        : this.$router.push({ name: "quizbox" });
    },
    endQuizSession() {
      this.btnTxt = "Finish";
      this.currentQuestion =
        "Congratulations! You finished the Quizbox session.";
      this.textForPageHeader.description = "Session finished";
      this.currentQuestionCount = "";
    },
  },
};
</script>
