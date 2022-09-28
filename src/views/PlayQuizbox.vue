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
        :value="scopedData.item.category"
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
  <pre>{{ randomlyGeneratedQuestions }}</pre>
  <BaseButton :btnTxt="btnTxt" @click="onStartQuizboxSession"></BaseButton>
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
      chosenNr: 10,
      selectedCategories: [],
      btnTxt: "Start Quizbox",
      filteredQuizData: [],
      questionsFromFilteredquizData: [],
      randomlyGeneratedQuestions: [],
    };
  },

  computed: {
    quizData() {
      return this.$store.state.quizData;
    },
    selectOption() {
      return this.name;
    },
  },

  methods: {
    onNrOfQuestionsSelect(value) {
      this.chosenNr = value;
    },
    onStartQuizboxSession() {
      this.filteredQuizData = this.quizData.filter((item) =>
        this.selectedCategories.includes(item.category)
      );

      this.questionsFromFilteredquizData = this.filteredQuizData.map((el) => {
        return el.questions;
      });

      function getRandomQuestions(arr, num) {
        const shuffledArray = [...arr].sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, num);
      }

      if ((this.chosenNr % this.selectedCategories.length) % 2 == 0) {
        this.randomlyGeneratedQuestions =
          this.questionsFromFilteredquizData.map((arrEl) => {
            return getRandomQuestions(
              arrEl,
              this.chosenNr / this.questionsFromFilteredquizData.length
            );
          });

        this.randomlyGeneratedQuestions =
          this.randomlyGeneratedQuestions.flatMap((el) => el);

        this.randomlyGeneratedQuestions = [
          ...this.randomlyGeneratedQuestions,
        ].sort(() => 0.5 - Math.random());
      } else {
        console.log("odd");
      }
      /*👩🏻‍💻 Feature:
      Requirement: Anzahl Fragen UND 1 oder mehrere Kategorien;
      wenn mehrere Kategorien ausgewählt => gleiche Zahl an Fragen aus
      ausgewählten Kategorien zusammenstellen

      Step 1: Array mit Fragen aus einer Kategorie ✅
      Step 2: Array mit Fragen aus mehreren Kategorien
              Wenn gerade: übergebe Array jeweils chosenNr % selectedCategories.length-questions aus jeder ausgewählten Kategorie ✅
              Wenn ungerade: 20 Fragen 3 Kategorien = 6, 7, 7 // 10 Fragen, 3 Kategorien = 3, 3, 4 => Wie abbilden?
      */
    },
  },
};
</script>
