<template>
  <h3>{{ header }}</h3>
  <p>{{ description }}</p>
  <ul>
    <li><slot></slot>Item 1<slot></slot></li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
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
