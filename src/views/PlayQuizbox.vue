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
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5113 0.386317C13.0055 -0.107939 13.8069 -0.107939 14.3011 0.386317C14.7893 0.874513 14.7953 1.66231 14.3191 2.15786L7.58224 10.5789C7.57251 10.5911 7.56213 10.6027 7.55112 10.6137C7.05686 11.1079 6.25551 11.1079 5.76126 10.6137L1.29538 6.1478C0.801118 5.65355 0.801118 4.8522 1.29538 4.35794C1.78963 3.86368 2.59098 3.86368 3.08524 4.35794L6.61805 7.89075L12.4777 0.424177C12.4881 0.410897 12.4993 0.398254 12.5113 0.386317Z"
            fill="#8849CF"
          />
        </svg>

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
