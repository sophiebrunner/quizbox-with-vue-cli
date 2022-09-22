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
      selectedCategories: store.selectedCategories,
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
      /*👩🏻‍💻 Feature: Hier arrayWithQuestions generieren, 
      der in QuizboxSession reingereicht wird - aber wie❔
      Requirement: Anzahl Fragen UND 1 oder mehrere Kategorien;
      wenn mehrere Kategorien ausgewählt => gleiche Zahl an Fragen aus 
      ausgewählten Kategorien zusammenstellen  

      Step 1: Array mit Fragen aus einer Kategorie
      Step 2: Array mit Fragen aus mehreren Kategorien
              condition mehr als eine Kategorie ausgewählt: if(selectedCategories.length > 1) { }
              condition gerade/ungerade Zahl an Kategorien: if((chosenNr % selectedCategories.length) % 2 == 0) { }
              Wenn gerade: übergebe Array jeweils chosenNr % selectedCategories.length-questions aus jeder ausgewählten Kategorie
              Wenn ungerade: 20 Fragen 3 Kategorien = 6, 7, 7 // 10 Fragen, 3 Kategorien = 3, 3, 4 => Wie abbilden?
      */
    },
  },
  mounted() {
    store.fetchDataFromApi();
    this.quizData = store.quizData;
    this.selectedCategories = store.selectedCategories;
  },
};
</script>
