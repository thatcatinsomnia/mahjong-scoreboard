<template>
  <div class="p-40">
    <h1 class="text-6xl text-green-600 text-center">Hello, User</h1>
    <ActionList />
  </div>
</template>

<script>
import ActionList from '/@/components/Action/ActionList.vue';

export default {
  components: {
    ActionList
  }  
}
</script>