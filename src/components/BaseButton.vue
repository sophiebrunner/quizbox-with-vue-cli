<template>
  <button @click="$emit('click')">{{ btnTxt }}</button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    btnTxt: {
      type: String,
      required: true,
    },
  },
  emits: ["click"],
};
</script>

<style>
button {
  padding: 20px 8px;
  margin: 0 auto;
  font-family: "Souce Sans Pro", sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--clr-primary);
  background-color: var(--clr-surface);
  border: 1.75px solid var(--clr-primary);
  box-shadow: 3.5px 3.5px var(--clr-primary);
  cursor: pointer;
  align-self: center;
}

button:hover {
  color: var(--clr-surface);
  background-color: var(--clr-primary);
  box-shadow: none;
}
</style>
