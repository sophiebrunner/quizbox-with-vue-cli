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
      ><div class="flex-container--headline">
        <h3>{{ textForMainContent.headline }}</h3>
        <p>
          {{ numberOfQuestionsFromSelectedCategory }}
        </p>
      </div></template
    ></BaseHeader
  >
  <BaseList
    :list-items="questionsFromSelectedCategory"
    class="list-item list-item--question"
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
