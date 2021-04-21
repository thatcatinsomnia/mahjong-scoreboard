<template>
    <div class="col-span-4 border-b border-gray-200 flex">
      <label class="w-full p-3">
        <slot name="label"></slot>
      </label>

      <span class="w-full p-3">
        <slot name="value"></slot>
      </span>
    </div>
</template>

<script>
export default {
  name: 'PrefColumn'
}
</script>