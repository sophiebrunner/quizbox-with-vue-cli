<template>
  <h2>Quizbox Session</h2>
  <p>Questions left</p>
  <p>I'm a question</p>
  <BaseButton></BaseButton>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "BaseQuestion",
  components: { BaseButton },
};
</script>
