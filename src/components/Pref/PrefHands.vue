<template>
  <div class="col-span-8 flex flex-col">
    <h2 class="p-3 bg-gray-100 text-center cursor-pointer relative hover:bg-gray-200" @click="isOpen = !isOpen">
      牌型台數
      <span class="absolute text-gray-600 right-4 transform transition" :class="{ '-rotate-90': isOpen  }">◀︎</span>
    </h2>
    <template v-if="handPoints.length">
      <div class="py-2" v-show="isOpen">
        <template v-for="handPoint in handPoints" :key="handPoint.id" >
          <div class="px-3 py-1 flex" v-if="handPoint.points !== 0">
            <h3 class="text-green-600">{{ handPoint.hand.name }}：</h3>
            <h3>{{ handPointDesc(handPoint.points) }}</h3>
          </div>
        </template>
      </div>
    </template>

    <template v-else>
      <p class="py-3 text-center text-green-500" v-show="isOpen">尚未設定台數</p>
    </template>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PrefHands',
  props: {
    handPoints: Array
  },
  setup() {
    const isOpen = ref(false);

    const handPointDesc = computed(() => {
      return points => points > 0 ? points + ' 台' : '未設定';
    }); 

    return { 
      isOpen,
      handPointDesc
    };
  }
  
}
</script>