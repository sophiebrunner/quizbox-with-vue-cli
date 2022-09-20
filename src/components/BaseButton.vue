<template>
  <button>{{ buttonTxt }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    buttonTxt: {
      type: String,
      required: true,
    },
  },
};
</script>
