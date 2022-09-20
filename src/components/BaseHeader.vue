<template>
  <slot :headline="headline" name="headline"
    ><h2>{{ headline }}</h2></slot
  >
  <p>{{ description }}</p>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
};
</script>
