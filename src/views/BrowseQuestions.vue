<template>
  <BaseHeader :headline="textForPageHeader.headline" />
  <BaseSelect
    :description="textForPageHeader.description"
    :select-options="quizCategories"
    @change="onCategorySelect"
  >
  </BaseSelect>
  <BaseHeader :headline="textForMainContent.headline"
    ><template v-slot:headline
      ><div class="flex-container">
        <h3 :class="classesForHeadline">{{ textForMainContent.headline }}</h3>
        <p :class="classesForHeadline">
          {{ numberOfQuestionsFromSelectedCategory }}
        </p>
      </div></template
    ></BaseHeader
  >
  <BaseList :list-items="questionsFromSelectedCategory"
    ><template #list-item="scopedData">{{ scopedData.item }}</template>
  </BaseList>
</template>

<script>
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
      selectedCategory: "basics-html-css",
      classesForHeadline: ["text--montserrat", "text--regular"],
    };
  },

  computed: {
    quizData() {
      return this.$store.state.quizData;
    },
    quizCategories() {
      return this.quizData.map((entry) => {
        return {
          value: entry.category,
          label: entry.categoryLabel,
        };
      });
    },
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

<style scoped>
li {
  font-family: var(--text-sourcesanspro);
  font-weight: 600;
}
</style>
