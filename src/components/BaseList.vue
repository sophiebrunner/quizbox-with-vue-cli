<template>
  <h3>BaseList</h3>
  <p>Description</p>
  <ul>
    <li><slot></slot>Item 1<slot></slot></li>
  </ul>
</template>

<script>
export default {
  name: "BaseList",
};
</script>
