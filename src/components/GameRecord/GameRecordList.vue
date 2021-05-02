<template>
  <div class="flex flex-col divide-y">
    <GameRecordItem v-for="record in gameRecords" :key="record.id" :record="record"></GameRecordItem>
  </div>
</template>

<script>
import GameRecordItem from '/@/components/GameRecord/GameRecordItem.vue';

export default {
  name: 'GameRecordList',
  components: {
    GameRecordItem
  },
  props: {
    gameRecords: Array
  }
}
</script>