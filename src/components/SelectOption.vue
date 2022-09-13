<template>
  <h2>{{ headline }}</h2>
  <label for="select-option">{{ description }}</label>
  <select id="select-option">
    <option v-for="option in selectOptions" :key="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectOption",
  props: {
    headline: {
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
