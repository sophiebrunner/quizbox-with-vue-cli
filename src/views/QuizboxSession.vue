<template>
  <BaseHeader :headline="textForPageHeader.headline"
    ><template v-slot:description
      ><div v-if="sessionUnfinished" class="flex-container">
        <p>{{ textForPageHeader.description }}</p>
        <p>{{ displayCurrentQuestionCount }}</p>
      </div>
      <p v-else>{{ "Session finished" }}</p></template
    ></BaseHeader
  >
  <p :class="classesForQuestions">{{ currentQuestion }}</p>
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
      classesForQuestions: [
        "text--centered",
        "text--large",
        "text--sourcesanspro",
      ],
    };
  },

  computed: {
    questionsFromSelectedCategories() {
      return this.$store.state.questionsForSessions;
    },
    currentQuestionIndex() {
      return this.$store.state.currentQuestionIndex;
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
        ? this.$store.state.currentQuestion
        : "Congratulations! You finished the Quizbox session.";
    },
    btnTxt() {
      return this.sessionUnfinished ? "Next" : "Finish";
    },
  },

  methods: {
    navigateThroughSession() {
      this.sessionUnfinished
        ? this.$store.commit("updateQuizboxSession")
        : this.$store.commit("finishQuizboxSession");
    },
  },
};
</script>
