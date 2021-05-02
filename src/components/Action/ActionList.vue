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
        path: '/game-records/new'
      },
      {
        name: '歷史紀錄查詢',
        path: '/game-records'
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
