<template>
  <h2>{{ action }}</h2>
  <label for="select-option">{{ description }}</label>
  <select id="select-option">
    <option v-for="option in selectOptions" :key="option.category">
      <slot :option="option" name="option-select">{{ option.category }}</slot>
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectOption",
  props: {
    action: {
      type: String,
    },
    description: {
      type: String,
    },
    selectOptions: {
      type: Array,
    },
  },
};
</script>
