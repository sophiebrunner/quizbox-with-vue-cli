<template>
  <h3>{{ headline }}</h3>
  <p>{{ numberOfItems }}</p>
  <ul>
    <li v-for="item in listItems" :key="item.id">
      <slot :item="item" name="list-item">{{ item.text }}</slot
      ><slot></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    headline: {
      type: String,
    },
    numberOfItems: {
      type: String,
    },
    listItems: {
      type: Array,
    },
  },
};
</script>
