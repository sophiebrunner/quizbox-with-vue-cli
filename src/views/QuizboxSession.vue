<template>
  <BaseHeader
    :headline="textForPageHeader.headline"
    :description="textForPageHeader.description"
  ></BaseHeader>
  <p>{{ question }}</p>
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
      question: "Initial question",
    };
  },
  computed: {
    // currentQuestion() {
    //   //   return this.arrayWithQuestions.forEach(
    //   //     (question) => (this.question = question)
    //   //   );
    // },
    btnTxt() {
      return "Next";
    },
  },
  methods: {
    navigateThroughSession() {
      for (const question of this.arrayWithQuestions) {
        return (this.question = question);
      }
      // navigateThroughSession() {
      //   this.question = this.arrayWithQuestions[0];
      //   for (let i = 0; i < this.arrayWithQuestions.length; i++) {
      //     this.question = this.arrayWithQuestions[i];
      //     i++;
      //   }
      //   console.log(this.question);
      //   return this.question;
    },
  },
};
</script>
