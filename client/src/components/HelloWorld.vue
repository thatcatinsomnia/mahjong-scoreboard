<template>
  <div class="p-72 flex flex-col items-center justify-center">
    <h1 class="mb-16 text-6xl text-green-500">{{ msg }}</h1>
    <button class="mb-4 px-4 py-2 rounded shadow bg-green-600 text-white" @click="count++">count is: {{ count }}</button>
    <p class="text-xl">Edit <code class="text-red-500">components/HelloWorld.vue</code> to test hot module replacement.</p>
  </div>
 
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
