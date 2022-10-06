<template>
  <BaseHeader :headline="textForPageHeader.headline"
    ><template v-slot:description
      ><p v-if="sessionUnfinished">
        <span>{{ textForPageHeader.description }}</span>
        <span>{{ displayCurrentQuestionCount }}</span>
      </p>
      <p v-else>{{ "Session finished" }}</p></template
    ></BaseHeader
  >
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
    };
  },

  computed: {
    questionsFromSelectedCategories() {
      return this.$store.getters.randomQuestionsFromSelectedCategories;
    },
    sessionUnfinished() {
      return (
        this.currentQuestionIndex < this.questionsFromSelectedCategories.length
      );
    },
    currentQuestionCount() {
      return (
        this.currentQuestionIndex +
        1 +
        "/" +
        this.questionsFromSelectedCategories.length
      );
    },
    displayCurrentQuestionCount() {
      return this.currentQuestionIndex + 1 < 10
        ? "0" + this.currentQuestionCount
        : this.currentQuestionCount;
    },
    currentQuestion() {
      return this.sessionUnfinished
        ? this.questionsFromSelectedCategories[this.currentQuestionIndex]
        : "Congratulations! You finished the Quizbox session.";
    },
    btnTxt() {
      return this.sessionUnfinished ? "Next" : "Finish";
    },
  },

  methods: {
    navigateThroughSession() {
      return this.currentQuestionIndex <
        this.questionsFromSelectedCategories.length
        ? this.currentQuestionIndex++
        : this.$router.push({ name: "quizbox" });
    },
  },
};
</script>
