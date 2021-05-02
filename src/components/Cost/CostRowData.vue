<template>
  <div class="flex relative items-center">
    <div class="p-1 flex-1 flex">
      <span class="p-2 flex-1 outline-none " @input="updateItem($event, cost.item)">{{cost.item}}</span>
    </div>

    <div class="p-1 flex-1 flex">
      <input class="p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-200" type="text" :value="cost.value" @input="updateValue($event, cost.item)">
    </div>

    <button class="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 absolute left-full transform translate-x-3 whitespace-nowrap" 
      @click="deleteCost(cost.item)" 
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

    const updateItem = (event, item) => {
      const newCostItem = event.target.value;
      updateCostItem(item, newCostItem);
    };

    const updateValue = (event, item) => {
      const newCostValue = event.target.value;
      updateCostValue(item, newCostValue);
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