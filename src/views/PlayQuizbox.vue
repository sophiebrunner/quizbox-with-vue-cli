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
      this.selectedNr = value;
    },
    onStartQuizbox() {
      if (this.selectedCategories.length > 0) {
        this.$store.commit("setSelectedCategories", this.selectedCategories);
        this.$store.commit("changeSelectedNr", this.selectedNr);
        this.$router.push({ name: "session" });
      } else {
        alert("Please select at least one question area");
      }
    },
  },
};
</script>
