<template>
  <div class="p-40">
    <h1 class="text-6xl text-green-600 text-center">Welcome, {{ user.name }}</h1>
    <ActionList />
  </div>
</template>

<script>
import decode from 'jwt-decode';
import ActionList from '/@/components/Action/ActionList.vue';

export default {
  components: {
    ActionList
  },
  setup() {
    const jwtToken = localStorage.jwt;
    const user = decode(jwtToken);

    return {
      user
    }
  }
}
</script>