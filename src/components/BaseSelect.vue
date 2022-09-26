<template>
  <slot />
  <label for="select-option">{{ description }}</label>
  <!-- Refactor: gleiche Datenstruktur key, label -->
  <select
    id="select-option"
    @change="$emit('change', $event.target.value)"
    ref="select"
  >
    <option v-for="option in selectOptions" :key="option.id" :value="option">
      <slot :option="option" name="select-option">{{ option }}</slot>
    </option>
  </select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    selectOption: {
      type: String,
    },
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
