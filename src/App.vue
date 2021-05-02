<template>
  <router-view class="min-h-screen" />
</template>

<script>
import { useCostProvider } from '/@/composables/cost';
import { usePlayerProvider } from '/@/composables/player';

export default {
  name: 'App',
  setup() {
    useCostProvider();
    usePlayerProvider();
  }
}
</script>
