<template>
  <slot />
  <label for="select-option" :class="classesForLabel">{{ description }}</label>
  <div class="custom-select">
    <select id="select-option" @change="$emit('change', $event.target.value)">
      <option
        v-for="option in selectOptions"
        :key="option.id"
        :value="option.value"
      >
        <slot :option="option" name="select-option">{{ option.label }}</slot>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      classesForLabel: ["text--montserrat", "text--semibold", "text--small"],
    };
  },
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
};
</script>
