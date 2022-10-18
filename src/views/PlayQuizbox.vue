<template>
  <BaseHeader :headline="textForPageHeader.headline" />
  <BaseSelect
    :description="textForPageHeader.description"
    :select-options="nrOfQuestions"
    @change="onNrOfQuestionsSelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option.value + " Questions"
    }}</template>
  </BaseSelect>
  <BaseHeader :headline="textForMainContent.headline"
    ><template v-slot:headline
      ><div class="flex-container--headline">
        <h3>{{ textForMainContent.headline }}</h3>
        <p>{{ nrOfQuizData }}</p>
      </div></template
    ></BaseHeader
  >
  <BaseList :list-items="quizData" class="list-item"
    ><template #list-item="scopedData">
      <div class="checklists list-item list-item--checklist">
        <input
          type="checkbox"
          :id="scopedData.item.category"
          :value="scopedData.item.category"
          v-model="selectedCategories"
          class="checkbox"
        />
        <label :for="scopedData.item.category">
          <p :class="classesForCategoryLabel">
            {{ scopedData.item.categoryLabel }}
          </p>
          <p :class="classesForNrOfQuestions">
            {{ scopedData.item.questions.length + " Questions" }}
          </p>
        </label>
      </div>
    </template>
  </BaseList>
  <BaseButton :btnTxt="btnTxt" @click="onStartQuizbox"></BaseButton>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { BaseHeader, BaseSelect, BaseList, BaseButton },

  data() {
    return {
      textForPageHeader: {
        headline: "Play Quizbox",
        description: "Quiz time - test what you know",
      },
      textForMainContent: {
        headline: "Question Areas",
      },
      nrOfQuestions: [
        { value: 10 },
        { value: 20 },
        {
          value: 30,
        },
      ],
      selectedNr: 10,
      selectedCategories: [],
      btnTxt: "Start Quizbox",
      classesForCategoryLabel: [
        "text--sourcesanspro",
        "text--regular",
        "text--semibold",
      ],
      classesForNrOfQuestions: [
        "text--extraslim",
        "text--extrasmall",
        "text--sourcesanspro",
      ],
    };
  },

  computed: {
    quizData() {
      return this.$store.state.quizData;
    },
    currentQuestionIndex() {
      return this.$state.currentQuestionIndex;
    },
    nrOfQuizData() {
      return "0" + this.quizData.length;
    },
  },

  methods: {
    onNrOfQuestionsSelect(value) {
      this.selectedNr = value;
    },
    onStartQuizbox() {
      if (this.selectedCategories.length > 0) {
        const sessionParams = {
          selectedCategories: this.selectedCategories,
          selectedNr: this.selectedNr,
        };
        this.$store.commit("startQuizboxSession", sessionParams);
      } else {
        alert("Please select at least one question area");
      }
    },
  },
};
</script>
