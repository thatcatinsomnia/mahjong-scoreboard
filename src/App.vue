<template>
    <router-view class="min-h-screen" />
</template>

<script>
import { useCostProvider } from '/@/composables/cost';

export default {
  name: 'App',
  setup() {
    useCostProvider();
  }
}
</script>
