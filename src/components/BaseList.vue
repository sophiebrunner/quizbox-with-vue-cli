<template>
  <slot />
  <p>{{ numberOfItems }}</p>
  <ul>
    <li v-for="item in listItems" :key="item.category">
      <slot :item="item" name="list-item" :description="description">{{
        item.data
      }}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    numberOfItems: {
      type: Number,
    },
    listItems: {
      type: Array,
    },
    description: {
      type: String,
      required: false,
    },
  },
};
</script>
