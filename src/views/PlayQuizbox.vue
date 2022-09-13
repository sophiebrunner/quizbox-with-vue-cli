<template>
  <SelectOption
    :action="action"
    :description="questionAreas.description"
    :select-options="numberOfQuestions"
  ></SelectOption>
  <BaseList
    :headline="questionAreas.headline"
    :numberOfItems="numberOfQuestions.length"
  ></BaseList>
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
      action: "Play Quizbox",
      numberOfQuestions: [10, 20, 30],
      questionAreas: {
        headline: "Question Areas",
        description: "Quiz time - test what you know",
      },
    };
  },
};
</script>
