<template>
  <BaseHeader :headline="text.action" />
  <BaseSelect
    :description="text.description"
    :select-options="quizData"
    @change="onCategorySelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option.categoryLabel
    }}</template>
  </BaseSelect>
  <BaseHeader
    :headline="text.headline"
    :description="numberOfQuestionsFromSelectedCategory"
    ><template v-slot:headline
      ><h3>{{ text.headline }}</h3></template
    ></BaseHeader
  >
  <!-- Wie Liste conditional rendern? v-if? Welche Logik? Event in SelectOption abfangen? -->
  <BaseList :list-items="questionsFromSelectedCategory"
    ><template #list-item="scopedData">{{ scopedData.item }} </template>
  </BaseList>
</template>

<script>
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "BrowseQuestions",
  components: { BaseSelect, BaseList, BaseHeader },
  data() {
    return {
      text: {
        action: "Browse Questions",
        description: "Choose a category with questions",
        headline: "Questions from the chapter",
      },
      quizData: [],
      selectedCategory: "",
    };
  },
  computed: {
    allQuestions() {
      return this.quizData.flatMap((data) => data.questions);
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
  created() {
    const categoryLabels = new Map([
      ["basics-html-css", "Web Dev Foundation"],
      ["advanced-html-css", "Advanced HTML"],
      ["basics-js", "Coding Foundation"],
      ["first-js-web-app", "Web Apps Foundation"],
      ["terminal-and-shell", "Terminal and Shell"],
    ]);
    // const categories = categoryLabels.keys();

    const handleFetch = async (category) => {
      return fetch(getCategoryUrl(category))
        .then((response) => response.json())
        .then((jsonData) => {
          return {
            category,
            categoryLabel: categoryLabels?.get(category),
            questions: jsonData.questions,
          };
        });
    };

    const apiFetches = [
      handleFetch("basics-html-css"),
      handleFetch("advanced-html-css"),
      handleFetch("basics-js"),
      handleFetch("first-js-web-app"),
      handleFetch("terminal-and-shell"),
    ];

    function getCategoryUrl(category) {
      return (
        "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/" +
        category +
        ".json"
      );
    }

    // function getCategoryByUrl(url) {
    //   return url
    //     .replace(
    //       "https://raw.githubusercontent.com/coding-bootcamps-eu/quizbox/main/questions/",
    //       ""
    //     )
    //     .replace(".json", "")
    //     .split("-")
    //     .join(" ");
    // }

    Promise.all(apiFetches).then((result) => {
      this.quizData = result;
    });
  },
};
</script>
