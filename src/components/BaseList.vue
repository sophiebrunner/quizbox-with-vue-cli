<template>
  <ul>
    <li v-for="item in listItems" :key="item.id">
      <slot :item="item" name="list-item">{{ item.data }}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
  props: {
    listItems: {
      type: Array,
    },
  },
};
</script>
