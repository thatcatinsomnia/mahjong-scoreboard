import { toRefs, reactive, provide, inject } from 'vue';

const COST_CONTEXT = Symbol();

export function useCostProvider() {
  const state = reactive({
    costs: []
  });

  const addNewCost = cost => {
    state.costs.push(cost)
  };

  const updateCostItem = (item, newItem) => {
    const cost = state.costs.find(cost => cost.item === item);
    cost.item = newItem;
  };

  const updateCostValue = (item, newValue) => {
    const cost = state.costs.find(cost => cost.item === item);
    cost.value = parseInt(newValue);
  };

  const deleteCost = id => {
    const index = state.costs.findIndex(cost => cost.id === id);
    state.costs.splice(index, 1);
  };

  const clearCosts = () => {
    state.costs = [];
  };

  provide(COST_CONTEXT, {
    ...toRefs(state),
    addNewCost,
    updateCostItem,
    updateCostValue,
    deleteCost,
    clearCosts
  });
}

export function useCostContext() {
  const context = inject(COST_CONTEXT);

  if (!context) {
    throw new Error('useCostContext must be used with useCostProvider');
  }

  return context;
}