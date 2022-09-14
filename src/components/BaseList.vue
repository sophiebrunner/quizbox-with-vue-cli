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

//optionale property description (abfangen und ggf. ausgeben) //numberOfItems
später als computed property (.length)
<script>
export default {
  name: "BaseList",
  props: {
    headline: {
      type: String,
    },
    numberOfItems: {
      type: Number,
    },
    listItems: {
      type: Array,
    },
  },
};
</script>
