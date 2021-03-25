<template>
  <div class="flex relative items-center">
    <div class="p-1 flex-1 flex">
      <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" v-model="costName" @input="$emit('updateName', {id: cost.id, name: costName})">
    </div>

    <div class="p-1 flex-1 flex">
      <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" v-model="costValue" @input="$emit('updateValue', {id: cost.id, value: costValue})">
    </div>

    <button class="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 absolute left-full transform translate-x-3" 
      @click="$emit('deleteCost', cost.id)" 
    >
      刪除
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PlayerRowData',
  props: {
    cost: Object
  },
  emits: ['deleteCost', 'updateValue', 'updateName'],
  setup(props) {
    const costName = ref(props.cost.name);
    const costValue = ref(props.cost.value);

    return {
      costName,
      costValue
    }
  }
}
</script>