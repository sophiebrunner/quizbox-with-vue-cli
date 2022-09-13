<template>
  <SelectOption
    headline="Browse Questions"
    description="Choose a category with questions"
    :select-options="categories"
  ></SelectOption>
  <BaseList
    headline="Questions from the chapter"
    description="numberofQuestions"
  ></BaseList>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";

export default {
  name: "BrowseQuestions",
  components: { SelectOption, BaseList },
  data() {
    return {
      categories: [
        "Web Dev Foundation",
        "Coding Foundation",
        "Web Apps Foundation",
        "Restful Backends",
        "Web Apps with Vue.JS",
      ],
    };
  },
};
</script>
