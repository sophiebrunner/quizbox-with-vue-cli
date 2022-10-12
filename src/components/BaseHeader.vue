<template>
  <slot :headline="headline" name="headline"
    ><h2 :class="classesForHeadline">
      {{ headline }}
    </h2></slot
  >
  <slot :description="description" name="description">
    <p class="description">{{ description }}</p></slot
  >
</template>

<script>
export default {
  name: "BaseHeader",
  data() {
    return {
      classesForHeadline: [
        "text--big",
        "text--primary-colored",
        "text--montserrat",
        "text--uppercase",
      ],
    };
  },
  props: {
    headline: {
      type: String,
      required: false,
    },
    description: {
      required: false,
    },
  },
};
</script>
