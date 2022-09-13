<template>
  <SelectOption
    headline="Play Quizbox"
    description="Quiz time - test what you know"
    :select-options="numberOfQuestions"
  ></SelectOption>
  <BaseList headline="Questions areas" description="05"></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { SelectOption, BaseButton, BaseList },
  data() {
    return {
      numberOfQuestions: [10, 20, 30],
    };
  },
};
</script>
