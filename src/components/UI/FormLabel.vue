<template>
  <label for="account" class="mb-2">{{ text }}</label>
</template>

<script>
export default {
  name: 'FormLabel',
  props: {
    text: String
  },
  setup(props) {
    return {
      text: props.text
    }
  }
}
</script>