<template>
  <SelectOption></SelectOption>
  <BaseList></BaseList>
</template>

<script>
import SelectOption from "@/components/SelectOption.vue";
import BaseList from "@/components/BaseList.vue";

export default {
  name: "BrowseQuestions",
  components: { SelectOption, BaseList },
};
</script>
