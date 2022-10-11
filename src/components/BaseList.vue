<template>
  <slot />
  <p>{{ numberOfItems }}</p>
  <ul>
    <li v-for="item in listItems" :key="item.id">
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

<style>
ul {
  _text-align: left;
  list-style: none;
  _padding-left: 0;
}
</style>
