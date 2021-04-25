<template>
  <div class="mb-16">
    <h2 class="py-5 text-center text-2xl text-gray-500">成本</h2>
    <div class="mx-auto max-w-2xl rounded">
      <div class="mb-6 flex">
        <input type="text" class="px-2 py-2 h-full text-xl rounded border border-gray-300 block flex-1 outline-none focus:ring-2 focus:ring-green-500" placeholder="新增項目..." v-model="newCostName" @keydown.enter="addCost">
        <button class="ml-2 px-4 py-2 bg-green-500 text-white rounded" @click="addCost">Create</button>
      </div>

      <div class="divide-y rounded shadow">
        <div class="text-lg flex bg-green-300 text-green-700 rounded-tl rounded-tr">
          <span class="p-3 flex-1">項目</span>
          <span class="p-3 flex-1">成本</span>
        </div>

        <CostRowData v-for="cost in costs" 
          :key="cost.id"
          :cost="cost"
        />
      </div>
      
      <div class="mt-4 flex">
        <span class="p-3 flex-1 text-lg">總計：</span>
        <span class="p-3 flex-1 text-lg" :class="{'text-red-500': totalCost > 0}">{{ totalCost }}</span>
      </div>
     
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import CostRowData from '/@/components/Cost/CostRowData.vue'
import { useCostContext } from '/@/composables/cost';

export default {
  name: 'CostList',
  components: {
    CostRowData
  },
  setup() {
    const { costs, addNewCost } = useCostContext();
    const newCostName = ref('');
    
    const addCost = () => {
      if (!newCostName.value) return;

      addNewCost({
        id: Math.random().toString(36).substring(2),
        item: newCostName.value,
        value: 0
      });

      newCostName.value = '';
    };

    const totalCost = computed(() => {
      let total = 0;

      // costs.value.forEach(cost => {
      //   total += parseInt(cost.value);
      // });

      return total;
    });

    return {
      newCostName,
      costs,
      addCost,
      totalCost,
    }
  }
}
</script>