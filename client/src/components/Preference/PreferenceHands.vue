<template>
  <div class="col-span-8 flex flex-col">
    <h2 class="p-3 bg-gray-100 text-center cursor-pointer relative hover:bg-gray-200" @click="isOpen = !isOpen">
      牌型台數
      <span class="absolute text-gray-600 right-4 transform transition" :class="{ '-rotate-90': isOpen  }">◀︎</span>
    </h2>

    <div class="py-2" v-show="isOpen">
      <div class="px-3 py-1 flex" v-for="hand in hands" :key="hand.id">
        <h3 class="text-green-600">{{ hand.name }}：</h3>
        <h3>{{ hand.value }} 台</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PreferenceHands',
  props: {
    hands: Array
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  }
  
}
</script>