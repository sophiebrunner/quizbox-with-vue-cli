<template>
  <slot :headline="headline" name="headline"
    ><h2>{{ headline }}</h2></slot
  >
  <slot :description="description" name="description">
    <p>{{ description }}</p></slot
  >
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
      required: false,
    },
  },
};
</script>
