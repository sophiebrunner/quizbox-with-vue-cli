<template>
  <h2>{{ header }}</h2>
  <label for="select-option">{{ description }}</label>
  <select id="select-option">
    <option value="test">Options</option>
  </select>
</template>

<script>
export default {
  name: "SelectOption",
  props: {
    header: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>
