<template>
  <button @click="$emit('click')">{{ btnTxt }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    btnTxt: {
      type: String,
      required: true,
    },
  },
  emits: ["click"],
};
</script>
