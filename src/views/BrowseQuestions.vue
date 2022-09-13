<template>
  <SelectOption
    header="Browse Questions"
    description="Choose a category with questions"
  ></SelectOption>
  <BaseList
    header="Questions from the chapter"
    description="numberofQuestions"
  ></BaseList>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";

export default {
  name: "BrowseQuestions",
  components: { SelectOption, BaseList },
};
</script>
