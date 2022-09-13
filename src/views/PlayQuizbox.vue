<template>
  <SelectOption></SelectOption>
  <BaseList></BaseList>
  <BaseButton></BaseButton>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "PlayQuizbox",
  components: { SelectOption, BaseButton, BaseList },
};
</script>
