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

        <div class="flex relative items-center" v-for="cost in state.costs" :key="cost.name">
          <CostRowData :cost="cost"
            @deleteCost="deleteCost"
            @updateName="updateName"
            @updateValue="updateValue"
          />
        </div>
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

export default {
  name: 'CostList',
  components: {
    CostRowData
  },
  setup() {
    const newCostName = ref('');
    const state = reactive({
      costs: [
        {
          id: Math.random().toString(36).substring(2),
          name: '飲料',
          value: 500
        },
        {
          id: Math.random().toString(36).substring(2),
          name: '清潔費',
          value: 599
        },
        {
          id: Math.random().toString(36).substring(2),
          name: '晚餐',
          value: 800
        }
      ]
    });
   
    const addCost = () => {
      if (!newCostName.value) return;

      state.costs.push({
        id: Math.random().toString(36).substring(2),
        name: newCostName.value,
        value: 0
      });

      newCostName.value = '';
    };

    const deleteCost = id => {
      const index = state.costs.findIndex(cost => cost.id === id);
      state.costs.splice(index, 1);
    };

    const updateName = ({id, name}) => {
      const cost = state.costs.find(cost => cost.id === id);
      cost.name = name;
    };

    const updateValue = ({id, value}) => {
      const cost = state.costs.find(cost => cost.id === id);
      cost.value = value;
    };

    const totalCost = computed(() => {
      let total = 0;

      state.costs.forEach(cost => {
        total += parseInt(cost.value);
      });

      return total;
    });

    return {
      newCostName,
      state,
      addCost,
      deleteCost,
      updateName,
      updateValue,
      totalCost,
    }
  }
}
</script>