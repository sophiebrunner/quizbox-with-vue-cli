<template>
  <slot />
  <label for="select-option">{{ description }}</label>
  <select
    id="select-option"
    @change="$emit('change', $event.target.value)"
    ref="select"
  >
    <option v-for="option in selectOptions" :key="option.category">
      <slot :option="option" name="select-option">{{ option.category }}</slot>
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectOption",
  props: {
    description: {
      type: String,
    },
    selectOptions: {
      type: Array,
      default: () => [
        { data: "Here comes the questions", category: "Category" },
      ],
    },
  },
  emits: ["change"],
  mounted() {
    this.$emit("change", this.$refs.select.value);
    console.log("Hallo ", this.$refs.select.value);
  },
};
</script>
