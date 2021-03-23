<template>
  <div class="mx-auto mt-20 flex flex-col space-y-6 max-w-2xl">
    <ActionButton v-for="action in actions" :key="action.name" :name="action.name" :to="action.path" />
  </div>
</template>

<script>
import ActionButton from '/@/components/Action/ActionButton.vue';

export default {
  name: 'ActionList',
  components: {
    ActionButton
  },
  setup() {
    const actions = [
      {
        name: '新增遊戲紀錄',
        path: '/game/new'
      },
      {
        name: '報表查詢',
        path: '/report'
      },
      {
        name: '遊戲設定檔',
        path: '/preferences'
      }
    ];

    return {
      actions
    }
  }
}
</script>
