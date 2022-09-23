<template>
  <slot />
  <label for="select-option">{{ description }}</label>
  <!-- Refactor: gleiche Datenstruktur key, label -->
  <select
    id="select-option"
    @change="$emit('change', $event.target.value)"
    ref="select"
  >
    <option
      v-for="option in selectOptions"
      :key="option.category"
      :value="option.category"
    >
      <slot :option="option" name="select-option">{{
        option.categoryLabel
      }}</slot>
    </option>
  </select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    description: {
      type: String,
    },
    selectOptions: {
      type: Array,
    },
  },
  emits: ["change"],
  mounted() {
    this.$emit("change", this.$refs.select.value);
  },
};
</script>
