<template>
  <BaseHeader :headline="textForPageHeader.headline" />
  <BaseSelect
    :description="textForPageHeader.description"
    :select-options="nrOfQuestions"
    @change="onNrOfQuestionsSelect"
  >
    <template #select-option="scopedData">{{
      scopedData.option + " Questions"
    }}</template>
  </BaseSelect>
  <BaseHeader
    :headline="textForMainContent.headline"
    :description="'0' + this.quizData.length"
    ><template v-slot:headline
      ><h3>{{ textForMainContent.headline }}</h3></template
    ></BaseHeader
  >
  <BaseList :list-items="quizData"
    ><template #list-item="scopedData"
      ><input
        type="checkbox"
        :id="scopedData.item.category"
        :value="scopedData.item.categoryLabel"
        v-model="selectedCategories"
      />
      <label :for="scopedData.item.category"
        ><span>{{ scopedData.item.categoryLabel }}</span> -
        <span>{{
          scopedData.item.questions.length + " Questions"
        }}</span></label
      >
    </template>
  </BaseList>
  <BaseButton :btnTxt="btnTxt" @click="onStartQuizboxSession"></BaseButton>
</template>

<script>
import { store } from "@/main";

import BaseHeader from "@/components/BaseHeader.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { BaseHeader, BaseSelect, BaseList, BaseButton },
  data() {
    return {
      store,
      textForPageHeader: {
        headline: "Play Quizbox",
        description: "Quiz time - test what you know",
      },
      textForMainContent: {
        headline: "Question Areas",
      },
      nrOfQuestions: [10, 20, 30],
      chosenNr: null,
      selectedCategories: [],
      quizData: store.quizData,
      btnTxt: "Start Quizbox",
    };
  },
  methods: {
    onNrOfQuestionsSelect(value) {
      this.chosenNr = value;
    },
    onStartQuizboxSession() {
      console.log(this.selectedCategories);
      console.log(this.chosenNr);
    },
  },
  mounted() {
    this.$root.selectedQuizCategories = this.selectedCategories;
  },
  created() {
    store.fetchDataFromApi();
    this.quizData = store.quizData;
  },
};
</script>
