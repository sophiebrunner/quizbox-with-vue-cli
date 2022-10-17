<template>
  <slot />
  <label for="select-option" :class="classesForLabel">{{ description }}</label>
  <div class="select-wrapper">
    <select id="select-option" @change="$emit('change', $event.target.value)">
      <option
        v-for="option in selectOptions"
        :key="option.id"
        :value="option.value"
      >
        <slot :option="option" name="select-option">{{ option.label }}</slot>
      </option>
    </select>
    <div class="icon-wrapper">
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.234438 0.484499C0.269272 0.449576 0.310654 0.421869 0.356213 0.402964C0.401772 0.384059 0.450612 0.374329 0.499938 0.374329C0.549263 0.374329 0.598104 0.384059 0.643663 0.402964C0.689222 0.421869 0.730604 0.449576 0.765438 0.484499L4.99994 4.71975L9.23444 0.484499C9.2693 0.449633 9.3107 0.421976 9.35625 0.403106C9.4018 0.384237 9.45063 0.374525 9.49994 0.374525C9.54925 0.374525 9.59807 0.384237 9.64363 0.403106C9.68918 0.421976 9.73057 0.449633 9.76544 0.484499C9.8003 0.519365 9.82796 0.560757 9.84683 0.606311C9.8657 0.651866 9.87541 0.700691 9.87541 0.749999C9.87541 0.799307 9.8657 0.848132 9.84683 0.893687C9.82796 0.939241 9.8003 0.980633 9.76544 1.0155L5.26544 5.5155C5.2306 5.55042 5.18922 5.57813 5.14366 5.59703C5.0981 5.61594 5.04926 5.62567 4.99994 5.62567C4.95061 5.62567 4.90177 5.61594 4.85621 5.59703C4.81065 5.57813 4.76927 5.55042 4.73444 5.5155L0.234438 1.0155C0.199516 0.980665 0.171808 0.939283 0.152904 0.893724C0.133999 0.848165 0.124268 0.799324 0.124268 0.749999C0.124268 0.700673 0.133999 0.651832 0.152904 0.606274C0.171808 0.560715 0.199516 0.519333 0.234438 0.484499Z"
          fill="#FBFBFB"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      classesForLabel: ["text--montserrat", "text--semibold", "text--small"],
    };
  },
  props: {
    selectOption: {
      type: String,
    },
    description: {
      type: String,
    },
    selectOptions: {
      type: Array,
    },
  },
  emits: ["change"],
};
</script>
