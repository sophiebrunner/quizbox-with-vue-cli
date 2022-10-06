<template>
  <BaseHeader :headline="textForPageHeader.headline"
    ><template v-slot:description
      ><p
        v-if="
          this.currentQuestionIndex + 1 <
          this.questionsFromSelectedCategories.length
        "
      >
        <span>{{ textForPageHeader.description }}</span>
        <span>{{ currentQuestionCount }}</span>
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
      return this.$store.getters.questionsFromSelectedCategories;
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
    currentQuestion() {
      return this.currentQuestionIndex + 1 <
        this.questionsFromSelectedCategories.length
        ? this.questionsFromSelectedCategories[this.currentQuestionIndex]
        : "Congratulations! You finished the Quizbox session.";
    },
    btnTxt() {
      return this.currentQuestionIndex + 1 <
        this.questionsFromSelectedCategories.length
        ? "Next"
        : "Finish";
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
