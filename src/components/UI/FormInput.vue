<template>
  <input :type="type" class="px-4 py-2 border border-gray-300 rounded placeholder-gray-300" 
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>


<script>
export default {
  name: 'FormInput',
  props: {
    type: String,
    modelValue: String,
    placeholder: String
  },
  emits: ['update:modelValue']
}
</script>