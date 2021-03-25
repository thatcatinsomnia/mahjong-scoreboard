<template>
   <router-link class="py-4 text-green-900 text-3xl text-center bg-green-500 rounded shadow-md hover:bg-green-600" :to="path">
     {{ name }}
   </router-link>
</template>

<script>
export default {
  naem: 'ActionButton',
  props: {
    name: String,
    path: String
  }
}
</script>