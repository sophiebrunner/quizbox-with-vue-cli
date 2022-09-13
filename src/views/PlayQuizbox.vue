<template>
  <SelectOption
    header="Play Quizbox"
    description="Quiz time - test what you know"
  ></SelectOption>
  <BaseList header="Questions areas" description="05"></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { SelectOption, BaseButton, BaseList },
};
</script>
