<template>
  <BaseHeader :headline="textForPageHeader.headline" />
  <BaseSelect
    :description="textForPageHeader.description"
    :select-options="quizData"
    @change="onCategorySelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option.categoryLabel
    }}</template>
  </BaseSelect>
  <BaseHeader
    :headline="textForMainContent.headline"
    :description="numberOfQuestionsFromSelectedCategory"
    ><template v-slot:headline
      ><h3>{{ textForMainContent.headline }}</h3></template
    ></BaseHeader
  >
  <BaseList :list-items="questionsFromSelectedCategory"
    ><template #list-item="scopedData">{{ scopedData.item }} </template>
  </BaseList>
</template>

<script>
// import { store } from "@/main";

import BaseHeader from "@/components/BaseHeader.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";

export default {
  name: "BrowseQuestions",
  components: { BaseHeader, BaseSelect, BaseList },
  data() {
    return {
      textForPageHeader: {
        headline: "Browse Questions",
        description: "Choose a category with questions",
      },
      textForMainContent: {
        headline: "Questions from the chapter",
      },
      // quizData: store.quizData,
      selectedCategory: "",
    };
  },
  computed: {
    quizData() {
      return this.$store.state.quizData;
    },
    // Neue computed property mit selectOption und in BaseSelect ändern
    questionsFromSelectedCategory() {
      return this.quizData.find(
        (categoryItem) => categoryItem.category === this.selectedCategory
      )?.questions;
    },
    numberOfQuestionsFromSelectedCategory() {
      return this.questionsFromSelectedCategory?.length.toString();
    },
  },
  methods: {
    onCategorySelect(value) {
      this.selectedCategory = value;
    },
  },
};
</script>
