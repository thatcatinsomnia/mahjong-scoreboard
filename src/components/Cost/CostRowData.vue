<template>
  <div class="flex relative items-center">
    <div class="p-1 flex-1 flex">
      <span class="p-2 flex-1 outline-none " @input="updateItem($event, cost.id)">{{cost.item}}</span>
    </div>

    <div class="p-1 flex-1 flex">
      <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" :value="cost.value" @input="updateValue($event, cost.id)">
    </div>

    <button class="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 absolute left-full transform translate-x-3 whitespace-nowrap" 
      @click="deleteCost(cost.id)" 
    >
      刪除
    </button>
  </div>
</template>

<script>
import { useCostContext } from '/@/composables/cost';

export default {
  name: 'PlayerRowData',
  props: {
    cost: Object
  },
  setup() {
    const { 
      updateCostItem,
      updateCostValue,
      deleteCost,
    } = useCostContext();

    const updateItem = (event, id) => {
      const newCostItem = event.target.value;
      updateCostItem(id, newCostItem);
    };

    const updateValue = (event, id) => {
      const newCostValue = event.target.value;
      updateCostValue(id, newCostValue);
    };

    return {
      updateCostItem,
      updateItem,
      updateValue,
      deleteCost
    }
  }
}
</script>