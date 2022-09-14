// Projekt-Setup: Kann ich über Slots in BaseList Checkbox und Fragenanzahl in
PlayQuizbox einspeisen? // // Wie Daten organisieren? Fetch funktioniert nicht?
Daten in beiden Views notwendig? Wie mit Ids etc. umgehen? //// Konzentration
auf BrowseQuestions // // Quizbox-Session: wo aufrufen/anzeigen? Wie auf click
neue Frage einspeisen? Quizbox-Session bekommt Fragenkatalog übergeben (Array an
Fragen für Session) // // Debug scoped-slot in SelectOption in BrowseQuestions
// //Weitere view für Quizbox-Session //Vorgehen: erstmal weniger Komponenten,
wenn Duplikate, dann in Komponenten auslagern
<template>
  <SelectOption
    :action="action"
    :description="questionAreas.description"
    :select-options="numberOfQuestions"
  ></SelectOption>
  <BaseList
    :headline="questionAreas.headline"
    :numberOfItems="numberOfQuestions.length"
  ></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { SelectOption, BaseButton, BaseList },
  data() {
    return {
      action: "Play Quizbox",
      numberOfQuestions: [10, 20, 30],
      questionAreas: {
        headline: "Question Areas",
        description: "Quiz time - test what you know",
      },
      data: [],
    };
  },
};
</script>
